'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function ForgotPasswordForm({ invalidLink }: { invalidLink: boolean }) {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    setIsError(false)

    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error?.status === 429) {
        setIsError(true)
        setMessage('Veuillez patienter une minute avant de redemander un lien.')
        } else {
        if (error) console.error('Erreur reset password :', error)
        // Même message que l'adresse existe ou non
        setMessage("Si un compte existe avec cette adresse, un email vient d'être envoyé. Pensez à vérifier vos spams.")
    }
    setIsSubmitting(false)
    }

    return (
        <div className="min-h-screen bg-soft/40 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
            <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-brand to-brand2 flex items-center justify-center text-white font-display font-bold text-lg mx-auto mb-4">
            F+
            </div>
            <h1 className="font-display font-extrabold text-2xl text-ink mb-2">Mot de passe oublié</h1>
            <p className="text-sm text-muted">
                Saisissez votre adresse email, nous vous enverrons un lien pour en choisir un nouveau.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-line rounded-2xl p-6 md:p-8 flex flex-col gap-5">
            {invalidLink && (
                <p className="text-sm rounded-lg px-4 py-3 text-center border text-rose-600 bg-rose-50 border-rose-100">
                Ce lien n&apos;est plus valide ou a déjà été utilisé. Demandez-en un nouveau ci-dessous.
                </p>
            )}

            <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-ink">Adresse email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="vous@exemple.com"
                className="border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                />
            </div>

            <input
            type="submit"
            value={isSubmitting ? 'Envoi...' : 'Envoyer le lien'}
            disabled={isSubmitting}
            className="bg-linear-to-r from-brand to-brand2 text-white font-semibold py-3.5 rounded-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            />

            {message && (
                <p className={`text-sm rounded-lg px-4 py-3 text-center border ${
                isError ? 'text-rose-600 bg-rose-50 border-rose-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100'
                }`}>
                {message}
                </p>
            )}

            <Link href="/login" className="text-sm text-brand hover:underline text-center">
                ← Retour à la connexion
            </Link>
            </form>
        </div>
        </div>
    )
}