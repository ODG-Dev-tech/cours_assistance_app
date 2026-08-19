'use client'
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"

export default function LoginFormPage() {
    const [email, setEmail] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: "http://localhost:3000/auth/callback" } });

        if (error) {
            setFeedbackMessage(`Erreur : ${error.message}`)
        } else {
            setFeedbackMessage(`Un lien de connexion a été envoyé à ${email}. Ouvrez votre boîte mail et cliquez dessus pour accéder à votre compte.`);
        }
        setIsSubmitting(false);
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
                        Connexion
                    </h1>
                    <p className="text-sm text-muted">
                        Pas de mot de passe, on vous envoie un lien de connexion par email.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border border-line rounded-2xl p-6 md:p-8 flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-ink">
                            Adresse email
                        </label>
                        <input
                            type="email"
                            name="email"
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
                        value={isSubmitting ? "Envoi..." : "Recevoir le lien de connexion"}
                        disabled={isSubmitting}
                        className="bg-linear-to-r from-brand to-brand2 text-white font-semibold py-3.5 rounded-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    />

                    {feedbackMessage && (
                        <p className={`text-sm rounded-lg px-4 py-3 text-center border ${
                            isError
                                ? 'text-rose-600 bg-rose-50 border-rose-100'
                                : 'text-emerald-700 bg-emerald-50 border-emerald-100'
                        }`}>
                            {feedbackMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}