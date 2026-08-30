import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { canCreateFiche, FREE_FICHES_LIMIT } from '@/utils/subscription'
import NewFicheForm from './NewFicheForm'

export default async function NewFichePage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    const access = await canCreateFiche(supabase, user.id)

    if (!access.allowed) {
        return (
            <div className="max-w-md mx-auto px-6 py-16 text-center">
                <div className="bg-white border border-line rounded-2xl p-8">
                    <p className="font-display font-extrabold text-xl text-ink mb-2">
                        Vous avez utilisé vos {FREE_FICHES_LIMIT} fiches gratuites
                    </p>
                    <p className="text-sm text-muted mb-6">
                        Continuez avec l&apos;abonnement à 5 000 FCFA/mois pour créer des fiches en illimité.
                    </p>
                    <Link
                        href="/subscription"
                        className="inline-block bg-linear-to-r from-brand to-brand2 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition"
                    >
                        Voir l&apos;abonnement
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="font-display font-extrabold text-2xl text-ink mb-2">
                Créer une nouvelle fiche
            </h1>
            <p className="text-sm text-muted mb-8">
                {access.isSubscribed
                    ? 'Décrivez votre leçon, la fiche est générée en quelques secondes.'
                    : `Il vous reste ${FREE_FICHES_LIMIT - (access.fichesUsed ?? 0)} fiche(s) gratuite(s) sur ${FREE_FICHES_LIMIT}.`}
            </p>

            <NewFicheForm />
        </div>
    )
}