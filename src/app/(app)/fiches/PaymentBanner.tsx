'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function PaymentBanner() {
    const searchParams = useSearchParams()
    const paiement = searchParams.get('paiement')
    const [dismissed, setDismissed] = useState(false)

    if (!paiement || dismissed) return null

    const isSuccess = paiement === 'succes'

    return (
        <div
            className={`rounded-lg border px-4 py-3 mb-6 flex items-start justify-between gap-4 ${
                isSuccess
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                    : 'bg-rose-50 border-rose-100 text-rose-600'
            }`}
        >
            <p className="text-sm">
                {isSuccess
                    ? 'Paiement reçu ! Votre abonnement sera activé dans quelques instants — actualisez la page si besoin.'
                    : "Le paiement n'a pas abouti. Vous pouvez réessayer depuis la page Abonnement."}
            </p>
            <button
                onClick={() => setDismissed(true)}
                aria-label="Fermer"
                className="text-sm font-medium shrink-0 opacity-60 hover:opacity-100 transition"
            >
                ✕
            </button>
        </div>
    )
}