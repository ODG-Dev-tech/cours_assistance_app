import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const CONTACT_EMAIL = 'ouedraogohyacinte5178@gmail.com'

const CONTEXT_LABELS: Record<string, string> = {
    after_second_fiche: 'Après la 2e fiche gratuite créée',
    quota_reached: 'Au moment du blocage (quota atteint)',
}

export async function POST(request: Request) {
    try {
        const { name, email, context, message } = await request.json()

        if (!message) {
            return NextResponse.json({ error: 'Message requis.' }, { status: 400 })
        }

        const contextLabel = CONTEXT_LABELS[context] ?? context ?? '(non précisé)'

        const { error } = await resend.emails.send({
            from: 'Fiches+ <onboarding@resend.dev>',
            to: CONTACT_EMAIL,
            replyTo: email || undefined,
            subject: `[Fiches+ Avis] ${contextLabel}`,
            text: `Enseignant : ${name || '(non précisé)'}\nEmail : ${email || '(non précisé)'}\nContexte : ${contextLabel}\n\nAvis :\n${message}`,
        })

        if (error) {
            console.error('Erreur Resend (feedback) :', error)
            return NextResponse.json({ error: "Échec de l'envoi." }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Erreur route feedback :', err)
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
    }
}