// app/api/paydunya/webhook/route.ts
import { createAdminClient } from '@/utils/supabase/admin'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

const PAYDUNYA_STATUS_URL = process.env.PAYDUNYA_STATUS_URL || 'https://app.paydunya.com/sandbox-api/v1/checkout-invoice/confirm/'

export async function POST(request: Request) {
    try {
        // 1. Récupération des données envoyées par PayDunya (format FormData / x-www-form-urlencoded)
        const formData = await request.formData()


        const token = formData.get('data[invoice][token]')

        if (!token) {
            console.error('Webhook PayDunya : Token manquant dans la requête')
            return NextResponse.json({ error: 'Token manquant' }, { status: 400 })
        }

        // 2. Double vérification sécurisée auprès de l'API PayDunya
        const confirmationUrl = `${PAYDUNYA_STATUS_URL}${token}`
        const checkResponse = await fetch(confirmationUrl, {
            method: 'GET',
            headers: {
                'PAYDUNYA-MASTER-KEY': process.env.PAYDUNYA_MASTER_KEY!,
                'PAYDUNYA-PRIVATE-KEY': process.env.PAYDUNYA_PRIVATE_KEY!,
                'PAYDUNYA-TOKEN': process.env.PAYDUNYA_TOKEN!,
            },
        })

        if (!checkResponse.ok) {
            throw new Error(`Erreur API PayDunya Status: ${checkResponse.status}`)
        }

        const transactionData = await checkResponse.json()
        
        // 3. Extraction de votre identifiant unique configuré dans create-payment
        //    status et custom_data sont à la RACINE de la réponse (confirmé par le SDK officiel)
        const merchantTransactionId = transactionData.custom_data?.merchant_transaction_id

        if (!merchantTransactionId) {
            console.error('Webhook PayDunya : Référence interne (merchant_transaction_id) introuvable')
            return NextResponse.json({ error: 'Référence interne manquante' }, { status: 400 })
        }

        // 4. Initialisation de Supabase Admin
        const supabase = createAdminClient()

        // Vérification de l'état actuel en base de données
        const { data: existing } = await supabase
            .from('subscriptions')
            .select('status')
            .eq('payment_ref', merchantTransactionId)
            .single()

        if (existing?.status === 'paid') {
            return NextResponse.json({ received: true, already: true })
        }

        // 5. Traitement selon le statut renvoyé par l'API PayDunya
        if (transactionData.status === 'completed') {

            // Étape de sécurité optionnelle mais recommandée : Validation cryptographique du Hash
            const rawHash = transactionData.hash
            const expectedHash = crypto
                .createHash('sha512')
                .update(process.env.PAYDUNYA_MASTER_KEY!)
                .digest('hex')

            if (rawHash !== expectedHash) {
                console.error('Webhook PayDunya : Échec de la signature de sécurité (Hash invalide)')
                return NextResponse.json({ error: 'Signature invalide' }, { status: 403 })
            }

            // Calcul des dates d'abonnement
            const startDate = new Date()
            const endDate = new Date(startDate)
            endDate.setMonth(endDate.getMonth() + 1)

            // Validation finale de l'abonnement
            const { error } = await supabase
                .from('subscriptions')
                .update({
                    status: 'paid',
                    start_date: startDate.toISOString().slice(0, 10),
                    end_date: endDate.toISOString().slice(0, 10),
                })
                .eq('payment_ref', merchantTransactionId)

            if (error) {
                console.error('Erreur mise à jour subscription Supabase:', error)
                return NextResponse.json({ error }, { status: 500 })
            }

        } else if (transactionData.status === 'cancelled' || transactionData.status === 'fail') {
            // Annulation de l'abonnement en cas d'échec confirmé
            await supabase
                .from('subscriptions')
                .update({ status: 'cancelled' })
                .eq('payment_ref', merchantTransactionId)
        }

        // PayDunya attend simplement un code HTTP 200 pour confirmer la bonne réception
        return NextResponse.json({ received: true })

    } catch (error) {
        console.error('Erreur générale Webhook PayDunya:', error)
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
    }
}