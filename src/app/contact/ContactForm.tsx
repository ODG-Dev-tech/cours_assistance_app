'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'

function BgDecorations() {
    return (
        <>
        <div className="fixed -top-20 -right-15 w-90 h-90 rounded-full bg-[radial-gradient(circle,rgba(59,95,235,0.09)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="fixed -bottom-15 -left-15 w-75 h-75 rounded-full bg-[radial-gradient(circle,rgba(108,76,224,0.08)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="fixed inset-0 bg-[linear-gradient(rgba(59,95,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,95,235,0.03)_1px,transparent_1px)] bg-size-[48px_48px] pointer-events-none z-0" />
        </>
    )
}

const CONTACT_INFOS = [
    {
        icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        ),
        label: 'Email',
        value: 'ouedraogohyacinte5178@gmail.com',
        sub: 'Réponse sous 24 h',
        text: 'text-blue-600',
        bg: 'bg-blue-600/[0.07]',
    },
    {
        icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.06 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
        ),
        label: 'Téléphone',
        value: '+226 51 78 83 59',
        sub: 'Disponible à tout moment',
        text: 'text-violet-600',
        bg: 'bg-violet-600/[0.07]',
    },
    {
        icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" />
        </svg>
        ),
        label: 'Adresse',
        value: 'Secteur 6',
        sub: 'Kaya, Burkina Faso',
        text: 'text-emerald-600',
        bg: 'bg-emerald-600/[0.07]',
    },
]

const FAQS = [
    {
        q: "Comment fonctionne l'abonnement à 5 000 FCFA/mois ?",
        a: "L'abonnement vous donne un accès illimité à toutes les fonctionnalités de Fiches+ pendant un mois. Il se renouvelle automatiquement chaque mois et peut être résilié à tout moment depuis votre espace personnel.",
    },
    {
        q: 'Les fiches sont-elles conformes aux programmes officiels du MENAPLN ?',
        a: "Oui, toutes les fiches générées par Fiches+ s'appuient sur les fiches pédagogiques officielles du Ministère de l'Enseignement de Base, de l'Alphabétisation et de la Promotion des Langues Nationales (MENAPLN), du CP1 au CM2.",
    },
    {
        q: "L'application fonctionne-t-elle hors connexion ?",
        a: "La génération de fiches nécessite une connexion Internet. En revanche, les fiches déjà téléchargées en PDF restent accessibles sans connexion depuis votre appareil.",
    },
    {
        q: 'Comment régler mon abonnement ?',
        a: 'Le paiement se fait via CinetPay, en toute sécurité : Orange Money, Moov Money, ou carte bancaire (Visa/Mastercard). Un reçu est généré après chaque transaction validée.',
    },
    ]

    function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="border-b border-slate-100">
        <button
            onClick={() => setOpen(!open)}
            className="w-full bg-none border-0 cursor-pointer flex items-center justify-between gap-3 py-4 text-left font-sans"
        >
            <span className="text-sm font-semibold text-ink leading-snug">{q}</span>
            <span
            className={`w-5.5 h-5.5 rounded-full flex items-center justify-center shrink-0 transition-all text-base font-light leading-none ${
                open ? 'bg-brand text-white' : 'bg-brand/8 text-brand'
            }`}
            >
            {open ? '−' : '+'}
            </span>
        </button>
        {open && (
            <p className="text-[13px] text-muted leading-relaxed pb-4 -mt-1">{a}</p>
        )}
        </div>
    )
    }

    export default function ContactPage() {
    const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })
    const [sent, setSent] = useState(false)
    const [sending, setSending] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.nom || !form.email || !form.message) return
        setSending(true)
        setError('')
        try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Échec envoi')
        setSent(true)
        } catch {
        setError("Le message n'a pas pu être envoyé. Réessayez ou écrivez-nous directement par email.")
        } finally {
        setSending(false)
        }
    }

    const inputClass =
        'w-full px-3.5 py-3 rounded-[10px] border-[1.5px] border-brand/15 text-sm text-ink outline-none font-sans box-border bg-white transition-colors focus:border-brand'

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col relative">
        <Nav />
        <BgDecorations />

        <main className="flex-1 relative z-10 max-w-275 w-full mx-auto px-5 pt-10 pb-16">

            {/* Header */}
            <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-linear-to-br from-soft to-indigo-50 border border-blue-200 rounded-full px-3.5 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block shadow-[0_0_0_3px_rgba(59,95,235,0.2)]" />
                <span className="text-xs font-semibold text-brand">Nous sommes là pour vous aider</span>
            </div>
            <h1 className="font-display text-[clamp(28px,6vw,48px)] font-extrabold text-ink tracking-[-0.03em] mb-3 leading-[1.1]">
                Contactez{' '}
                <span className="bg-linear-to-r from-brand to-brand2 bg-clip-text text-transparent">
                l&apos;équipe Fiches+
                </span>
            </h1>
            <p className="text-[clamp(14px,2.5vw,16px)] text-muted max-w-120 mx-auto leading-relaxed">
                Une question, une suggestion ou un problème ? Notre équipe vous répond dans les 24 heures.
            </p>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5 mb-10">
            {CONTACT_INFOS.map((info) => (
                <div
                key={info.label}
                className="bg-white rounded-[14px] border border-brand/8 shadow-[0_1px_6px_rgba(0,0,0,0.04)] px-4.5 py-5 flex items-start gap-3.5"
                >
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${info.bg} ${info.text}`}>
                    {info.icon}
                </div>
                <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">{info.label}</p>
                    <p className="text-[13px] font-semibold text-ink mb-0.5">{info.value}</p>
                    <p className="text-xs text-slate-400">{info.sub}</p>
                </div>
                </div>
            ))}
            </div>

            {/* Main grid: form + FAQ */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-6 items-start">

            {/* Form */}
            <div className="bg-white rounded-2xl border border-brand/8 shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-6 py-7">
                <h2 className="font-display text-base font-bold text-ink mb-6 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-linear-to-br from-brand to-brand2 inline-flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 2h12v8H1zM4 10l-2 3M10 10l2 3" />
                    </svg>
                </span>
                Envoyer un message
                </h2>

                {sent ? (
                <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-4 text-2xl">
                    ✓
                    </div>
                    <p className="font-display text-base font-bold text-green-700 mb-2">Message envoyé !</p>
                    <p className="text-[13px] text-muted">
                    Notre équipe vous répondra à <strong>{form.email}</strong> sous 24 h.
                    </p>
                    <button
                    onClick={() => { setSent(false); setForm({ nom: '', email: '', sujet: '', message: '' }) }}
                    className="mt-5 px-5 py-2.5 rounded-lg bg-brand/6 text-brand border-0 font-semibold text-[13px] cursor-pointer font-sans"
                    >
                    Nouveau message
                    </button>
                </div>
                ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">Nom complet *</label>
                        <input
                        type="text" required placeholder="Aminata Ouédraogo"
                        value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                        className={inputClass}
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">Email *</label>
                        <input
                        type="email" required placeholder="a.ouedraogo@ecole.bf"
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                        />
                    </div>
                    </div>

                    <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">Sujet</label>
                    <select
                        value={form.sujet} onChange={(e) => setForm({ ...form, sujet: e.target.value })}
                        className={`${inputClass} appearance-none cursor-pointer`}
                    >
                        <option value="">Choisir un sujet…</option>
                        <option>Question sur l&apos;abonnement</option>
                        <option>Problème technique</option>
                        <option>Suggestion d&apos;amélioration</option>
                        <option>Autre</option>
                    </select>
                    </div>

                    <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">Message *</label>
                    <textarea
                        required rows={5}
                        placeholder="Décrivez votre demande en détail…"
                        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputClass} resize-y min-h-30`}
                    />
                    </div>

                    {error && (
                    <p className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
                    )}

                    <button
                    type="submit"
                    disabled={sending}
                    className={`py-3.5 rounded-[10px] border-0 text-white font-bold text-[15px] flex items-center justify-center gap-2 font-sans transition-all ${
                        sending
                        ? 'bg-brand/40 cursor-not-allowed'
                        : 'bg-linear-to-br from-brand to-brand2 cursor-pointer shadow-[0_4px_16px_rgba(59,95,235,0.28)]'
                    }`}
                    >
                    {sending ? (
                        <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeDasharray="40" strokeDashoffset="10" />
                        </svg>
                        Envoi en cours…
                        </>
                    ) : (
                        <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                        </svg>
                        Envoyer le message
                        </>
                    )}
                    </button>
                </form>
                )}
            </div>

            {/* FAQ */}
            <div className="flex flex-col gap-5">
                <div className="bg-white rounded-2xl border border-brand/8 shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-6 py-7">
                <h2 className="font-display text-base font-bold text-ink mb-2">Questions fréquentes</h2>
                <p className="text-[13px] text-slate-400 mb-5">Les réponses aux questions les plus posées par les enseignants.</p>
                <div>
                    {FAQS.map((faq) => (
                    <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                    ))}
                </div>
                </div>
            </div>
            </div>
        </main>
        </div>
    )
}