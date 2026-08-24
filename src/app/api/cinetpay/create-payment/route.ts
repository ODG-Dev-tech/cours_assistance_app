import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { CinetPayClient } from 'cinetpay-js'

const client = new CinetPayClient({
    credentials: {
        BF: {
            apiKey: process.env.CINETPAY_API_KEY_BF!,
            apiPassword: process.env.CINETPAY_API_PASSWORD_BF!,
        },
    },
    debug: true
})


const BASE_URL = 'http://localhost:3000'
const NOTIFY_URL_BASE= 'https://casually-saline-clump.ngrok-free.dev'

export async function POST() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', user.id)
        .single()

    const [firstName, ...rest] = (profile?.full_name ?? 'Enseignant Fiches+').split(' ')
    const lastName = rest.join(' ') || firstName
    const cleanPhone = (profile?.phone ?? '').replace(/\s+/g, '')

    const merchantTransactionId = `abo-${user.id.slice(0, 8)}-${Date.now().toString(36)}`

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


    async function initializeWithRetry(attempts = 3): Promise<Awaited<ReturnType<typeof client.payment.initialize>>> {
        for (let i = 1; i <= attempts; i++) {
            try {
                return await client.payment.initialize({
                    currency: 'XOF',
                    merchantTransactionId,
                    amount: 5000,
                    lang: 'fr',
                    designation: 'Abonnement mensuel Fiches+',
                    clientEmail: user.email!,
                    clientFirstName: firstName,
                    clientLastName: lastName,
                    clientPhoneNumber: cleanPhone,
                    successUrl: `${BASE_URL}/fiches?paiement=succes`,
                    failedUrl: `${BASE_URL}/fiches?paiement=echec`,
                    notifyUrl: `${NOTIFY_URL_BASE}/api/cinetpay/webhook`,
                    channel: 'PUSH',
                }, 'BF')
            } catch (err) {
                console.error(`Tentative ${i}/${attempts} échouée:`, err)
                if (i === attempts) throw err
                await new Promise((r) => setTimeout(r, 500 * i))
            }
        }
        throw new Error('Toutes les tentatives ont échoué')
    }

    try {
        const payment = await initializeWithRetry()
        return NextResponse.json({ paymentUrl: payment.paymentUrl })
    } catch (error) {
        console.error('Erreur CinetPay:', error)
        return NextResponse.json({ error: 'Impossible de créer le paiement' }, { status: 500 })
    }
}