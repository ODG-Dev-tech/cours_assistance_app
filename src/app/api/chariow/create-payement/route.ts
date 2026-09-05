import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const CHARIOW_API_URL = 'https://api.chariow.com/v1/checkout'
const CHARIOW_PRODUCT_ID = process.env.CHARIOW_PRODUCT_ID!
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function POST() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // 1. Vérification de l'authentification
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    // 2. Récupération du profil pour pré-remplir le checkout
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', user.id)
        .single()

    const [firstName, ...rest] = (profile?.full_name ?? 'Enseignant Fiches+').split(' ')
    const lastName = rest.join(' ') || firstName
    const cleanPhone = (profile?.phone ?? '').replace(/\s+/g, '').replace(/^\+226/, '')

    // 3. Appel à l'API Chariow pour initier le checkout
    try {
        const response = await fetch(CHARIOW_API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.CHARIOW_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: CHARIOW_PRODUCT_ID,
                email: user.email,
                first_name: firstName,
                last_name: lastName,
                phone: {
                    number: cleanPhone || '00000000',
                    country_code: 'BF',
                },
                // Permet de relier le paiement Chariow au bon enseignant lors du webhook
                custom_metadata: {
                    teacher_id: user.id,
                },
                redirect_url: `${BASE_URL}/fiches?paiement=succes`,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            console.error('Erreur Chariow checkout:', data)
            return NextResponse.json(
                { error: data.message || 'Erreur lors de la création du paiement' },
                { status: response.status }
            )
        }

        // 4. Gestion des différents états possibles retournés par Chariow
        if (data.data.step === 'already_purchased') {
            return NextResponse.json(
                { error: 'Un paiement est déjà en cours de traitement pour ce produit.' },
                { status: 409 }
            )
        }

        if (data.data.step !== 'payment') {
            console.error('Statut checkout Chariow inattendu:', data.data.step)
            return NextResponse.json({ error: 'Statut de paiement inattendu' }, { status: 400 })
        }

        // 5. Enregistrement de l'abonnement en attente, lié au sale_id Chariow
        const { error: insertError } = await supabase
            .from('subscriptions')
            .insert({
                teacher_id: user.id,
                status: 'unpaid',
                amount: 5000,
                payment_ref: data.data.purchase.id, // ex. sal_xyz789
                payment_provider: 'chariow',
            })

        if (insertError) {
            console.error('Erreur insertion subscription:', insertError)
            return NextResponse.json({ error: 'Impossible de préparer l\'abonnement' }, { status: 500 })
        }

        return NextResponse.json({ paymentUrl: data.data.payment.checkout_url })

    } catch (error) {
        console.error('Erreur Chariow API:', error)
        return NextResponse.json({ error: 'Impossible de créer le paiement' }, { status: 500 })
    }
}