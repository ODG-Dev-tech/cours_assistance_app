'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function ResetPasswordForm() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const supabase = createClient()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setMessage('')

        if (password !== confirmPassword) {
        setMessage('Erreur : les mots de passe ne correspondent pas.')
        return
        }

        setIsSubmitting(true)
        const { error } = await supabase.auth.updateUser({ password })

        if (error) {
        setMessage(`Erreur : ${error.message}`)
        setIsSubmitting(false)
        return
        }

        // Ferme les autres sessions ouvertes (ex. un appareil compromis)
        await supabase.auth.signOut({ scope: 'others' })

        router.push('/fiches')
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-soft/40 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
            <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-brand to-brand2 flex items-center justify-center text-white font-display font-bold text-lg mx-auto mb-4">
                F+
            </div>
            <h1 className="font-display font-extrabold text-2xl text-ink mb-2">Nouveau mot de passe</h1>
            <p className="text-sm text-muted">
                Choisissez un mot de passe et notez-le bien : il vous servira à chaque connexion.
            </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-line rounded-2xl p-6 md:p-8 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-ink">Nouveau mot de passe</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-ink">Confirmez le mot de passe</label>
                <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                />
            </div>

            <input
                type="submit"
                value={isSubmitting ? 'Enregistrement...' : 'Enregistrer le mot de passe'}
                disabled={isSubmitting}
                className="bg-linear-to-r from-brand to-brand2 text-white font-semibold py-3.5 rounded-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            />

            {message && (
                <p className="text-sm rounded-lg px-4 py-3 text-center border text-rose-600 bg-rose-50 border-rose-100">
                {message}
                </p>
            )}
            </form>
        </div>
        </div>
    )
}