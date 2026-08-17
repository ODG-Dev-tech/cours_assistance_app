import { createAdminClient } from '@/utils/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const formData = await request.formData()
    const rawData = formData.get('data')
    const body = JSON.parse(rawData as string)
    const token = body.invoice.token

    const confirmResponse = await fetch(
        `https://app.paydunya.com/api/v1/checkout-invoice/confirm/${token}`,
        {
        headers: {
            'PAYDUNYA-MASTER-KEY': process.env.PAYDUNYA_MASTER_KEY!,
            'PAYDUNYA-PRIVATE-KEY': process.env.PAYDUNYA_PRIVATE_KEY!,
            'PAYDUNYA-TOKEN': process.env.PAYDUNYA_TOKEN!,
        },
        }
    )
    const confirmData = await confirmResponse.json()

    if (confirmData.status === 'completed') {
        const supabase = createAdminClient()
        const teacherId = confirmData.custom_data.teacher_id

        const { error } = await supabase.from('subscriptions').insert({
        teacher_id: teacherId,
        status: 'paye',
        start_date: new Date().toISOString(),
        paydunya_ref: token,
        amount: confirmData.total_amount,
        })
        if(error){
            return NextResponse.json({error }, {status: 500})
        }
    }

    return NextResponse.json({ received: true })
}