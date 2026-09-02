import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import PaymentBanner from './PaymentBanner'
import FichesSelector from './FichesSelector'
export default async function FichesPage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)


    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    const { data: fiches } = await supabase
        .from('fiches')
        .select('*')

    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

    return (
        
        <div className="max-w-3xl mx-auto px-6 py-10">
            <PaymentBanner />
            <div className="flex items-center justify-between mb-10 gap-2">
                <div>
                    <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink">
                        {profile ? `Bonjour, ${profile?.full_name} ` : 'Mes fiches'}
                    </h1>
                    <p className="text-sm text-muted mt-1">
                        {fiches?.length ?? 0} fiche{(fiches?.length ?? 0) > 1 ? 's' : ''} créée{(fiches?.length ?? 0) > 1 ? 's' : ''}
                    </p>
                </div>
                <Link
                    href="/newfiche"
                    className="bg-linear-to-r from-brand to-brand2 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition whitespace-nowrap"
                >
                    + Nouvelle fiche
                </Link>
            </div>

            {fiches && fiches.length > 0 ? (

            <FichesSelector fiches={fiches} />

            ) : (
                <div className="bg-white border border-line rounded-2xl p-10 text-center">
                    <p className="font-display font-semibold text-ink mb-2">
                        Vous ne possédez pas encore de fiche
                    </p>
                    <p className="text-sm text-muted mb-6">
                        Créez votre première fiche pédagogique en quelques minutes.
                    </p>
                    <Link
                        href="/newfiche"
                        className="inline-block bg-linear-to-r from-brand to-brand2 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition"
                    >
                        + Créer ma première fiche
                    </Link>
                </div>
            )}
        </div>
    )
}