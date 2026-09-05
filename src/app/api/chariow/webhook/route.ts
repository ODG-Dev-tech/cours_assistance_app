import { createAdminClient } from '@/utils/supabase/admin'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
    try {
        // 1. Lecture du corps BRUT (obligatoire pour la vérification de signature)
        const rawBody = await request.text()
        const receivedSignature = request.headers.get('x-chariow-signature') ?? ''

        const expectedSignature =
            'sha256=' +
            crypto
                .createHmac('sha256', process.env.CHARIOW_PULSE_SECRET!)
                .update(rawBody)
                .digest('hex')

        const a = Buffer.from(receivedSignature)
        const b = Buffer.from(expectedSignature)

        if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
            console.error('Webhook Chariow : signature invalide')
            return NextResponse.json({ error: 'Signature invalide' }, { status: 401 })
        }

        // 2. Parsing du payload APRÈS vérification de la signature
        const payload = JSON.parse(rawBody)
        const event = payload.event

        // On n'agit que sur les ventes réussies ; on accuse réception pour le reste
        if (event !== 'successful.sale') {
            return NextResponse.json({ received: true })
        }

        const teacherId = payload.sale?.custom_metadata?.teacher_id
        const saleId = payload.sale?.id

        if (!teacherId || !saleId) {
            console.error('Webhook Chariow : métadonnées manquantes', payload)
            return NextResponse.json({ error: 'Métadonnées manquantes' }, { status: 400 })
        }

        const supabase = createAdminClient()

        // 3. Idempotence : éviter de retraiter un paiement déjà validé
        const { data: existing } = await supabase
            .from('subscriptions')
            .select('status')
            .eq('payment_ref', saleId)
            .single()

        if (existing?.status === 'paid') {
            return NextResponse.json({ received: true, already: true })
        }

        // 4. Activation de l'abonnement pour un cycle d'un mois
        const startDate = new Date()
        const endDate = new Date(startDate)
        endDate.setMonth(endDate.getMonth() + 1)

        const { error } = await supabase
            .from('subscriptions')
            .update({
                status: 'paid',
                start_date: startDate.toISOString().slice(0, 10),
                end_date: endDate.toISOString().slice(0, 10),
            })
            .eq('payment_ref', saleId)

        if (error) {
            console.error('Erreur mise à jour subscription Supabase:', error)
            return NextResponse.json({ error }, { status: 500 })
        }

        return NextResponse.json({ received: true })

    } catch (error) {
        console.error('Erreur générale Webhook Chariow:', error)
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
    }
}