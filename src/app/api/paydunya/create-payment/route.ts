// app/api/create-payment/route.ts
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const PAYDUNYA_API_URL =
    process.env.PAYDUNYA_API_URL ||
    'https://app.paydunya.com/sandbox-api/v1/checkout-invoice/create'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const NOTIFY_URL_BASE = process.env.NOTIFY_URL_BASE || 'https://casually-saline-clump.ngrok-free.dev'

export async function POST() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // 1. Vérification de l'authentification de l'utilisateur
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    // 2. Récupération des informations de profil
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', user.id)
        .single()

    const [firstName, ...rest] = (profile?.full_name ?? 'Enseignant Fiches+').split(' ')
    const lastName = rest.join(' ') || firstName
    const cleanPhone = (profile?.phone ?? '').replace(/\s+/g, '')

    // Identifiant de transaction unique
    const merchantTransactionId = `abo-${user.id.slice(0, 8)}-${Date.now().toString(36)}`

    // 3. Création de l'enregistrement de l'abonnement en attente ('unpaid')
    const { error: insertError } = await supabase
        .from('subscriptions')
        .insert({
            teacher_id: user.id,
            status: 'unpaid',
            amount: 5000,
            payment_ref: merchantTransactionId,
        })

    if (insertError) {
        console.error('Erreur insertion subscription:', insertError)
        return NextResponse.json({ error: 'Impossible de préparer l\'abonnement' }, { status: 500 })
    }

    // 4. Appel direct à l'API PayDunya
    try {
            const payload = {
        invoice: {
            total_amount: 5000,
            description: 'Abonnement mensuel Fiches+',
            customer: {
                name: `${firstName} ${lastName}`,
                email: user.email,
                phone: cleanPhone,
            },
        },
        store: {
            name: 'Fiches+',
        },
        custom_data: {                    
            merchant_transaction_id: merchantTransactionId,
            teacher_id: user.id,
        },
        actions: {
            cancel_url: `${BASE_URL}/fiches?paiement=echec`,
            return_url: `${BASE_URL}/fiches?paiement=succes`,
            callback_url: `${NOTIFY_URL_BASE}/api/paydunya/webhook`,
        },
    }

        const response = await fetch(PAYDUNYA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'PAYDUNYA-MASTER-KEY': process.env.PAYDUNYA_MASTER_KEY!,
                'PAYDUNYA-PRIVATE-KEY': process.env.PAYDUNYA_PRIVATE_KEY!,
                'PAYDUNYA-TOKEN': process.env.PAYDUNYA_TOKEN!,
            },
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Vérification de la réponse PayDunya ("00" = succès)
        if (data.response_code === '00') {
            return NextResponse.json({
                paymentUrl: data.response_text,
                token: data.token,
            })
        } else {
            console.error('Réponse PayDunya invalide:', data)
            return NextResponse.json({ error: data['response_text'] || 'Erreur PayDunya inconnue' }, { status: 400 })
        }

    } catch (error) {
        console.error('Erreur PayDunya API:', error)
        return NextResponse.json({ error: 'Impossible de créer le paiement' }, { status: 500 })
    }
}