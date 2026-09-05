'use client'
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginFormPage() {
    const [mode, setMode] = useState<'login' | 'signup'>('login')

    // Champs communs
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Champs supplémentaires pour l'inscription
    const [confirmPassword, setConfirmPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [schoolName, setSchoolName] = useState("")
    const [zone, setZone] = useState("")

    const [feedbackMessage, setFeedbackMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const supabase = createClient()
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setFeedbackMessage("")

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setFeedbackMessage(`Erreur : ${error.message}`)
            setIsSubmitting(false)
            return
        }

        router.push('/fiches')
        router.refresh()
    }

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFeedbackMessage("")

        if (password !== confirmPassword) {
            setFeedbackMessage("Erreur : les mots de passe ne correspondent pas.")
            return
        }

        setIsSubmitting(true)

        // 1. Création de l'identité (email + mot de passe)
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password })

        if (signUpError) {
            setFeedbackMessage(`Erreur : ${signUpError.message}`)
            setIsSubmitting(false)
            return
        }

        const user = data.user
        if (!user) {
            setFeedbackMessage("Erreur : la création du compte a échoué. Réessayez.")
            setIsSubmitting(false)
            return
        }

        // 2. Création du profil, dans la foulée, avec le même formulaire
        const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                full_name: fullName,
                phone,
                school_name: schoolName,
                zone,
            })

        if (profileError) {
            setFeedbackMessage(`Erreur lors de la création du profil : ${profileError.message}`)
            setIsSubmitting(false)
            return
        }

        router.push('/fiches')
        router.refresh()
    }

    const isError = feedbackMessage.startsWith('Erreur')

    return (
        <div className="min-h-screen bg-soft/40 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-r from-brand to-brand2 flex items-center justify-center text-white font-display font-bold text-lg mx-auto mb-4">
                        F+
                    </div>
                    <h1 className="font-display font-extrabold text-2xl text-ink mb-2">
                        {mode === 'login' ? 'Connexion' : 'Créer votre compte Fiches+'}
                    </h1>
                    <p className="text-sm text-muted">
                        {mode === 'login'
                            ? 'Connectez-vous avec votre email et votre mot de passe.'
                            : 'Remplissez vos informations et choisissez un mot de passe. Vous les utiliserez à chaque connexion.'}
                    </p>
                </div>

                <form
                    onSubmit={mode === 'login' ? handleLogin : handleSignup}
                    className="bg-white border border-line rounded-2xl p-6 md:p-8 flex flex-col gap-5"
                >
                    {mode === 'signup' && (
                        <>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="fullName" className="text-sm font-medium text-ink">
                                    Nom complet
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    placeholder="Aminata Ouédraogo"
                                    className="border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="phone" className="text-sm font-medium text-ink">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    placeholder="+226 XX XX XX XX"
                                    className="border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="schoolName" className="text-sm font-medium text-ink">
                                    Nom de votre école
                                </label>
                                <input
                                    type="text"
                                    id="schoolName"
                                    value={schoolName}
                                    onChange={(e) => setSchoolName(e.target.value)}
                                    required
                                    placeholder="École primaire de..."
                                    className="border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="zone" className="text-sm font-medium text-ink">
                                    Zone
                                </label>
                                <input
                                    type="text"
                                    id="zone"
                                    value={zone}
                                    onChange={(e) => setZone(e.target.value)}
                                    required
                                    placeholder="Kaya, Centre-Nord..."
                                    className="border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                                />
                            </div>

                            <div className="h-px bg-line my-1" />
                        </>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-ink">
                            Adresse email
                        </label>
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

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="text-sm font-medium text-ink">
                            {mode === 'signup' ? 'Choisissez un mot de passe' : 'Mot de passe'}
                        </label>
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

                    {mode === 'signup' && (
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-ink">
                                Confirmez le mot de passe
                            </label>
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
                    )}

                    <input
                        type="submit"
                        value={
                            isSubmitting
                                ? "Chargement..."
                                : mode === 'login' ? "Se connecter" : "Créer mon compte"
                        }
                        disabled={isSubmitting}
                        className="bg-linear-to-r from-brand to-brand2 text-white font-semibold py-3.5 rounded-lg mt-2 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    />

                    {mode === 'signup' && (
                        <p className="text-xs text-muted text-center -mt-2">
                            Notez bien votre email et votre mot de passe : ils vous serviront à chaque connexion.
                        </p>
                    )}

                    {feedbackMessage && (
                        <p className={`text-sm rounded-lg px-4 py-3 text-center border ${
                            isError
                                ? 'text-rose-600 bg-rose-50 border-rose-100'
                                : 'text-emerald-700 bg-emerald-50 border-emerald-100'
                        }`}>
                            {feedbackMessage}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={() => {
                            setMode(mode === 'login' ? 'signup' : 'login')
                            setFeedbackMessage("")
                        }}
                        className="text-sm text-brand hover:underline text-center"
                    >
                        {mode === 'login'
                            ? "Pas encore de compte ? Créer un compte"
                            : "Déjà un compte ? Se connecter"}
                    </button>
                </form>
            </div>
        </div>
    )
}