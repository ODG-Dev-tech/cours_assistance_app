import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Non connecté' }, { status: 401 })
    }

    const response = await fetch('https://app.paydunya.com/api/v1/checkout-invoice/create', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'PAYDUNYA-MASTER-KEY': process.env.PAYDUNYA_MASTER_KEY!,
        'PAYDUNYA-PRIVATE-KEY': process.env.PAYDUNYA_PRIVATE_KEY!,
        'PAYDUNYA-TOKEN': process.env.PAYDUNYA_TOKEN!,
        },
        body: JSON.stringify({
        invoice: {
            total_amount: 5000,
            description: 'Abonnement mensuel - Assistant IA Enseignants',
        },
        store: { name: 'Assistant Enseignants' },
        actions: {
            cancel_url: 'http://localhost:3000/fiches',
            return_url: 'http://localhost:3000/fiches',
            callback_url: 'http://localhost:3000/api/paydunya/webhook',
        },
        custom_data: { teacher_id: user.id },
        }),
    })

    const data = await response.json()
    return NextResponse.json({ checkoutUrl: data.response_text })
}