import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SubscribeButton from './Abonnement'

export default async function AbonnementPage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('teacher_id', user.id)
        .eq('status', 'paid')
        .order('end_date', { ascending: false })
        .limit(1)
        .single()

    const today = new Date().toISOString().slice(0, 10)
    const isActive = subscription && subscription.end_date >= today

    return (
        <div className="max-w-md mx-auto px-6 py-10">
            <div className="text-center mb-8">
                <h1 className="font-display font-extrabold text-2xl text-ink mb-2">
                    Abonnement
                </h1>
                <p className="text-sm text-muted">
                    Accès illimité aux fiches pédagogiques Fiches+.
                </p>
            </div>

            {isActive ? (
                <div className="bg-white border border-line rounded-2xl overflow-hidden">
                    <div className="bg-linear-to-r from-brand to-brand2 px-6 py-6">
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-white/80 text-xs font-semibold uppercase tracking-wide">
                                Plan mensuel
                            </p>
                            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                Actif
                            </span>
                        </div>
                        <p className="text-white font-display font-extrabold text-3xl">
                            {subscription.amount.toLocaleString('fr-FR')}
                            <span className="text-base font-medium"> FCFA</span>
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-center border-b border-line pb-3 mb-3">
                            <span className="text-sm text-muted">Actif depuis</span>
                            <span className="text-sm font-medium text-ink">
                                {new Date(subscription.start_date).toLocaleDateString('fr-FR')}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted">Renouvellement</span>
                            <span className="text-sm font-medium text-ink">
                                {new Date(subscription.end_date).toLocaleDateString('fr-FR')}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white border border-line rounded-2xl overflow-hidden">
                    <div className="px-6 py-6 border-b border-line">
                        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                            Plan mensuel
                        </p>
                        <p className="font-display font-extrabold text-4xl text-ink mb-1">
                            5 000 <span className="text-lg font-medium text-muted">FCFA</span>
                        </p>
                        <p className="text-sm text-muted">par mois, sans engagement</p>
                    </div>

                    <ul className="px-6 py-6 flex flex-col gap-3">
                        {[
                            'Fiches illimitées par mois',
                            'Toutes matières du CP1 au CM2',
                            'Export PDF prêt à imprimer',
                            'Paiement Orange Money / Moov Money',
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-2.5 text-sm text-ink/80">
                                <span className="text-brand">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="px-6 pb-6">
                        <SubscribeButton />
                        {subscription && (
                            <p className="text-xs text-muted text-center mt-3">
                                Votre abonnement précédent a expiré le{' '}
                                {new Date(subscription.end_date).toLocaleDateString('fr-FR')}.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}