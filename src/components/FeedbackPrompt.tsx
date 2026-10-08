'use client'

import { useState } from 'react'

type Props = {
    context: 'after_second_fiche' | 'quota_reached'
    teacherName?: string | null
    teacherEmail?: string | null
}

const PROMPTS: Record<Props['context'], { title: string; subtitle: string }> = {
    after_second_fiche: {
        title: 'Vous venez de créer votre 2e fiche',
        subtitle: 'Un avis rapide nous aiderait beaucoup à améliorer Fiches+.',
    },
    quota_reached: {
        title: 'Avant de continuer',
        subtitle: 'Vous avez utilisé vos fiches gratuites — dites-nous honnêtement ce que vous en pensez, même si ce n\'est pas pour vous.',
    },
}

export default function FeedbackPrompt({ context, teacherName, teacherEmail }: Props) {
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')
    const [dismissed, setDismissed] = useState(false)

    const { title, subtitle } = PROMPTS[context]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message.trim()) return

        setIsSubmitting(true)
        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: teacherName,
                    email: teacherEmail,
                    context,
                    message,
                }),
            })

            if (!res.ok) throw new Error()
            setStatus('sent')
        } catch {
            setStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (dismissed) return null

    return (
        <div className="print:hidden bg-soft border border-line rounded-xl p-5 mt-6">
            {status === 'sent' ? (
                <p className="text-sm text-emerald-700 text-center py-2">
                    Merci beaucoup pour votre retour.
                </p>
            ) : (
                <>
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                            <p className="font-display font-bold text-sm text-ink">{title}</p>
                            <p className="text-xs text-muted mt-0.5">{subtitle}</p>
                        </div>
                        <button
                            onClick={() => setDismissed(true)}
                            aria-label="Fermer"
                            className="shrink-0 text-muted hover:text-ink text-sm"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={3}
                            placeholder="Votre avis, même critique, nous aide..."
                            className="border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition resize-none"
                        />
                        <div className="flex items-center justify-between gap-3">
                            {status === 'error' && (
                                <p className="text-xs text-rose-600">Erreur, réessayez.</p>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="ml-auto bg-linear-to-r from-brand to-brand2 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60"
                            >
                                {isSubmitting ? 'Envoi...' : 'Envoyer mon avis'}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    )
}