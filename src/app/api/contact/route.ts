import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const CONTACT_EMAIL = 'ouedraogohyacinte5178@gmail.com'

export async function POST(request: Request) {
    try {
    const { nom, email, sujet, message } = await request.json()

    if (!nom || !email || !message) {
        return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
        from: 'Fiches+ <onboarding@resend.dev>',
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: sujet ? `[Fiches+ Contact] ${sujet}` : '[Fiches+ Contact] Nouveau message',
        text: `Nom : ${nom}\nEmail : ${email}\nSujet : ${sujet || '(non précisé)'}\n\nMessage :\n${message}`,
        })

        if (error) {
        console.error('Erreur Resend :', error)
        return NextResponse.json({ error: "Échec de l'envoi." }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Erreur route contact :', err)
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
    }
}