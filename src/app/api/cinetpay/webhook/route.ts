import { createAdminClient } from '@/utils/supabase/admin'
import { NextResponse } from 'next/server'
import { CinetPayClient, parseNotification } from 'cinetpay-js'

const client = new CinetPayClient({
    credentials: {
        BF: {
            apiKey: process.env.CINETPAY_API_KEY_BF!,
            apiPassword: process.env.CINETPAY_API_PASSWORD_BF!,
        },
    },
    debug: true
})

export async function POST(request: Request) {
    const rawBody = await request.json()
    const notification = parseNotification(rawBody)

    const supabase = createAdminClient()


    const { data: existing } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('payment_ref', notification.merchantTransactionId)
        .single()

    if (existing?.status === 'paid') {
        return NextResponse.json({ received: true, already: true })
    }


    const status = await client.payment.getStatus(notification.transactionId, 'BF')

    if (status.status === 'SUCCESS') {
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
            .eq('payment_ref', notification.merchantTransactionId)

        if (error) {
            console.error('Erreur mise à jour subscription:', error)
            return NextResponse.json({ error }, { status: 500 })
        }
    } else if (status.status === 'FAILED') {
        await supabase
            .from('subscriptions')
            .update({ status: 'cancelled' })
            .eq('payment_ref', notification.merchantTransactionId)
    }

    return NextResponse.json({ received: true })
}