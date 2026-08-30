'use client'

import { useState } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

export default function RevisionChat({
    ficheId,
    initialHistory,
    onContentUpdate,
}: {
    ficheId: string
    initialHistory: Message[]
    onContentUpdate: (content: Record<string, unknown>) => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [history, setHistory] = useState<Message[]>(initialHistory)
    const [input, setInput] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [error, setError] = useState('')

    const handleSend = async () => {
        if (!input.trim()) return
        const userMessage = input.trim()
        setInput('')
        setError('')
        setIsSending(true)
        setHistory((prev) => [...prev, { role: 'user', content: userMessage }])

        try {
            const res = await fetch(`/api/fiches/${ficheId}/revise`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            })
            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'La modification a échoué.')
                setIsSending(false)
                return
            }

            setHistory((prev) => [...prev, { role: 'assistant', content: data.summary }])
            onContentUpdate(data.content)
        } catch {
            setError('Erreur réseau. Réessayez.')
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div className="print:hidden border rounded-xl overflow-hidden" style={{ borderColor: 'var(--accent-soft)' }}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                style={{ backgroundColor: 'var(--accent-soft)' }}
            >
                <span className="font-display font-semibold text-sm" style={{ color: 'var(--accent)' }}>
                    Demander une modification
                </span>
                <span style={{ color: 'var(--accent)' }}>{isOpen ? '−' : '+'}</span>
            </button>

            {isOpen && (
                <div className="p-5">
                    {history.length > 0 && (
                        <div className="flex flex-col gap-3 mb-4 max-h-64 overflow-y-auto">
                            {history.map((h, i) => (
                                <div
                                    key={i}
                                    className={`text-sm rounded-lg px-3 py-2 max-w-[85%] ${
                                        h.role === 'user'
                                            ? 'bg-ink text-white self-end'
                                            : 'bg-soft text-ink self-start'
                                    }`}
                                >
                                    {h.content}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !isSending && handleSend()}
                            placeholder="Ex : raccourcis la phase d'évaluation à 3 minutes"
                            disabled={isSending}
                            className="flex-1 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-brand transition"
                        />
                        <button
                            type="button"
                            onClick={handleSend}
                            disabled={isSending || !input.trim()}
                            className="bg-linear-to-r from-brand to-brand2 text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50 transition"
                        >
                            {isSending ? '...' : 'Envoyer'}
                        </button>
                    </div>

                    {error && <p className="text-xs text-rose-600 mt-2">{error}</p>}
                </div>
            )}
        </div>
    )
}