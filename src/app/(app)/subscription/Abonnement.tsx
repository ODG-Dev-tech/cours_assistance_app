'use client'

import { useState } from 'react'

export default function SubscribeButton() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubscribe = async () => {
        setIsLoading(true)
        setError('')

        try {
            const res = await fetch('/api/paydunya/create-payment', { method: 'POST' })
            const data = await res.json()

            if (!res.ok || !data.paymentUrl) {
                setError('Impossible de créer le paiement. Réessayez dans un instant.')
                setIsLoading(false)
                return
            }

            // Redirection vers le guichet de paiement CinetPay
            window.location.href = data.paymentUrl
        } catch {
            setError('Une erreur réseau est survenue. Vérifiez votre connexion.')
            setIsLoading(false)
        }
    }

    return (
        <>
            <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="w-full bg-linear-to-r from-brand to-brand2 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
                {isLoading ? 'Redirection...' : "S'abonner maintenant"}
            </button>
            {error && (
                <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-4 py-3 text-center mt-3">
                    {error}
                </p>
            )}
        </>
    )
}