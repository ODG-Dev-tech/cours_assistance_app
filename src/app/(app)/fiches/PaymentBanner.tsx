/* eslint-disable prefer-const */
'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client' 

export default function PaymentBanner() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const paiement = searchParams.get('paiement')
    const [dismissed, setDismissed] = useState(false)
    const [isFullyActivated, setIsFullyActivated] = useState(false)

    const isSuccess = paiement === 'succes'

    useEffect(() => {
        // On ne lance la vérification automatique que si le paiement est un succès visuel
        if (!isSuccess || dismissed || isFullyActivated) return

        const supabase = createClient()
        let intervalId: NodeJS.Timeout

        const checkSubscriptionStatus = async () => {
            // 1. Récupérer l'utilisateur connecté
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            // 2. Vérifier si un abonnement est actif ('paid') pour cet utilisateur
            const { data: sub } = await supabase
                .from('subscriptions')
                .select('status')
                .eq('teacher_id', user.id)
                .eq('status', 'paid')
                .maybeSingle()

            // 3. Si le webhook a fait son travail, on valide l'activation
            if (sub) {
                setIsFullyActivated(true)
                clearInterval(intervalId)
                // Rafraîchit les Server Components de la page (débloque les fiches)
                router.refresh() 
            }
        }


        checkSubscriptionStatus()


        intervalId = setInterval(checkSubscriptionStatus, 2000)


        return () => clearInterval(intervalId)
    }, [isSuccess, dismissed, isFullyActivated, router])

    if (!paiement || dismissed) return null

    return (
        <div
            className={`rounded-lg border px-4 py-3 mb-6 flex items-start justify-between gap-4 transition-all duration-300 ${
                isSuccess
                    ? isFullyActivated 
                        ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm' // Style "Activé !"
                        : 'bg-emerald-50 border-emerald-100 text-emerald-700'     // Style "En attente du webhook"
                    : 'bg-rose-50 border-rose-100 text-rose-600'
            }`}
        >
            <div className="flex items-center gap-2 text-sm">
                {isSuccess && !isFullyActivated && (
                    
                    <svg className="animate-spin h-4 w-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                )}
                <p>
                    {isSuccess
                        ? isFullyActivated
                            ? 'Votre abonnement est activé ! Toutes les fonctionnalités de Fiches+ sont disponibles.'
                            : 'Paiement reçu ! Validation de votre abonnement en cours, veuillez patienter quelques instants...'
                        : "Le paiement n'a pas abouti. Vous pouvez réessayer depuis la page Abonnement."}
                </p>
            </div>
            <button
                onClick={() => setDismissed(true)}
                aria-label="Fermer"
                className={`text-sm font-medium shrink-0 opacity-60 hover:opacity-100 transition ${isFullyActivated ? 'text-white' : ''}`}
            >
                ✕
            </button>
        </div>
    )
}
