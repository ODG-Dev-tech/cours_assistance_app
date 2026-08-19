'use client'
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from 'next/navigation'

export default function CompletCount() {
    const [phone, setPhone] = useState("")
    const [full_name, setFullName] = useState("")
    const [schoolName, setSchoolName] = useState("")
    const [zone, setZone] = useState("")
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const supabase = createClient()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true)
        const { data: { user } } = await supabase.auth.getUser()
        const { error } = await supabase
            .from('profiles')
            .update({
                phone,
                full_name,
                school_name: schoolName,
                zone
            })
            .eq('id', user?.id)

        if (error) {
            setMessage(`Erreur: ${error.message}`)
            setIsSubmitting(false)
        } else {
            router.push('/fiches');
        }
    }

    return (
        <div className="min-h-screen bg-soft/40 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-r from-brand to-brand2 flex items-center justify-center text-white font-display font-bold text-lg mx-auto mb-4">
                        F+
                    </div>
                    <h1 className="font-display font-extrabold text-2xl text-ink mb-2">
                        Complétez votre profil
                    </h1>
                    <p className="text-sm text-muted">
                        Ces informations nous aident à personnaliser vos fiches.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border border-line rounded-2xl p-6 md:p-8 flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="fullName" className="text-sm font-medium text-ink">
                            Nom complet
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={full_name}
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
                            name="phone"
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
                            name="schoolName"
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
                            name="zone"
                            value={zone}
                            onChange={(e) => setZone(e.target.value)}
                            required
                            placeholder="Kaya, Centre-Nord..."
                            className="border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                        />
                    </div>

                    <input
                        type="submit"
                        value={isSubmitting ? "Création..." : "Créer mon profil"}
                        disabled={isSubmitting}
                        className="bg-linear-to-r from-brand to-brand2 text-white font-semibold py-3.5 rounded-lg mt-2 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    />

                    {message && (
                        <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-4 py-3 text-center">
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}