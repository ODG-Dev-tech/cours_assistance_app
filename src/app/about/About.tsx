'use client'
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

    const VALEURS = [
    {
        title: 'Praticité',
        desc: "Faire gagner du temps réel aux enseignants sur la tâche la plus chronophage de leur métier : la préparation des fiches.",
        text: 'text-blue-600',
        bg: 'bg-blue-600/[0.07]',
        icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
        </svg>
        ),
    },
    {
        title: 'Conformité',
        desc: "Rester fidèle à l'Approche Pédagogique Intégrative du MENAPLN — pas une IA générique qui invente son propre format.",
        text: 'text-violet-600',
        bg: 'bg-violet-600/[0.07]',
        icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        ),
    },
    {
        title: 'Accessibilité',
        desc: "Un prix pensé pour le contexte burkinabè, pour que le coût ne soit jamais la raison de ne pas essayer.",
        text: 'text-emerald-600',
        bg: 'bg-emerald-600/[0.07]',
        icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
        ),
    },
    {
        title: 'Proximité terrain',
        desc: "Construit à partir de ce que disent réellement les enseignants du primaire, pas de suppositions depuis un bureau.",
        text: 'text-amber-600',
        bg: 'bg-amber-600/[0.07]',
        icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
        ),
    },
    ]

    export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col relative">
        <Nav />
        <BgDecorations />

        <main className="flex-1 relative z-10">

            {/* Hero */}
            <section className="max-w-275 mx-auto px-5 pt-12 pb-10 text-center">
            <div className="inline-flex items-center gap-2 bg-linear-to-br from-soft to-indigo-50 border border-blue-200 rounded-full px-3.5 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block shadow-[0_0_0_3px_rgba(59,95,235,0.2)]" />
                <span className="text-xs font-semibold text-brand">Notre histoire</span>
            </div>
            <h1 className="font-display text-[clamp(28px,6vw,48px)] font-extrabold text-ink tracking-[-0.03em] mb-4 leading-[1.1]">
                Pourquoi{' '}
                <span className="bg-linear-to-r from-brand to-brand2 bg-clip-text text-transparent">
                Fiches+
                </span>{' '}
                existe
            </h1>
            <p className="text-[clamp(14px,2.5vw,17px)] text-muted max-w-140 mx-auto leading-relaxed">
                Fiches+ est né d&apos;un constat simple, entendu directement sur le terrain : préparer une fiche pédagogique conforme à l&apos;API prend un temps que peu d&apos;enseignants ont à revendre.
            </p>
            </section>

            {/* Chiffres enquête terrain */}
            <section className="max-w-275 mx-auto px-5 pb-14">
            <div className="bg-white rounded-2xl border border-brand/8 shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-6 py-8 md:px-10 md:py-10 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 items-center">
                <div className="text-center">
                <p className="font-display text-5xl font-extrabold text-brand tracking-[-0.03em] mb-1">10</p>
                <p className="text-sm text-muted font-medium">enseignants interrogés lors de notre enquête terrain</p>
                </div>
                <div className="text-center border-t md:border-t-0 md:border-l border-line pt-6 md:pt-0 md:pl-8">
                <p className="font-display text-5xl font-extrabold text-brand tracking-[-0.03em] mb-1">100%</p>
                <p className="text-sm text-muted font-medium">ont cité la préparation des fiches comme la tâche la plus chronophage de leur métier</p>
                </div>
            </div>
            </section>

            {/* Fondateur */}
            <section className="max-w-275 mx-auto px-5 pb-14">
            <div className="bg-white rounded-2xl border border-brand/8 shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-6 py-8 md:px-10 md:py-10">
                <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-brand to-brand2 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                    <span className="font-display text-lg font-bold text-white">HO</span>
                </div>
                <div>
                    <p className="font-display text-lg font-bold text-ink mb-0.5">Hyacinte OUEDRAOGO</p>
                    <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-4">Fondateur &amp; développeur</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                    Le déclic est venu d&apos;une enquête menée directement auprès d&apos;enseignants du primaire : sur les dix interrogés, tous citaient la préparation des fiches pédagogiques comme leur plus grand défi au quotidien. Ce constat, aussi net qu&apos;unanime, a suffi à me convaincre qu&apos;il y avait là un vrai problème à résoudre — et Fiches+ est né de cette conviction.
                    </p>
                </div>
                </div>
            </div>
            </section>

            {/* Mission */}
            <section className="max-w-275 mx-auto px-5 pb-14 text-center">
            <span className="text-[11px] font-bold text-brand uppercase tracking-wider">Notre mission</span>
            <h2 className="font-display text-[clamp(22px,4vw,32px)] font-extrabold text-ink tracking-[-0.02em] mt-2 mb-4">
                Redonner du temps aux enseignants
            </h2>
            <p className="text-sm text-muted max-w-155 mx-auto leading-relaxed">
                Chaque heure passée à rédiger une fiche pédagogique conforme à l&apos;Approche Pédagogique Intégrative est une heure en moins pour préparer sa classe, corriger des copies, ou simplement se reposer. Fiches+ automatise la partie répétitive de cette préparation, pour que les enseignants du CP1 au CM2 gardent leur énergie pour ce qui compte vraiment : enseigner.
            </p>
            </section>

            {/* Valeurs */}
            <section className="bg-white border-t border-line py-14">
            <div className="max-w-275 mx-auto px-5">
                <div className="text-center mb-10">
                <span className="text-[11px] font-bold text-brand uppercase tracking-wider">Nos valeurs</span>
                <h2 className="font-display text-[clamp(22px,4vw,32px)] font-extrabold text-ink tracking-[-0.02em] mt-2.5">
                    Ce qui guide chaque décision
                </h2>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
                {VALEURS.map((v) => (
                    <div key={v.title} className="bg-slate-50 rounded-2xl border border-brand/6 px-5 py-6">
                    <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center mb-4 ${v.bg} ${v.text}`}>
                        {v.icon}
                    </div>
                    <p className="font-display text-sm font-bold text-ink mb-2">{v.title}</p>
                    <p className="text-[13px] text-slate-600 leading-relaxed">{v.desc}</p>
                    </div>
                ))}
                </div>
            </div>
            </section>

            {/* CTA final */}
            <section className="max-w-275 mx-auto px-5 py-16 text-center">
            <div className="bg-linear-to-br from-brand to-brand2 rounded-2xl px-6 py-12 md:py-14 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1.5px)] bg-size-[20px_20px] pointer-events-none" />
                <div className="relative">
                <h2 className="font-display text-[clamp(22px,4vw,32px)] font-extrabold text-white tracking-[-0.02em] mb-3">
                    Prêt à gagner du temps sur vos préparations ?
                </h2>
                <p className="text-sm text-white/75 max-w-120 mx-auto mb-7 leading-relaxed">
                    Deux fiches offertes pour essayer, sans engagement.
                </p>
                
                <a href="/login"
                    className="inline-block px-8 py-3.5 rounded-[10px] bg-white text-brand font-bold text-sm no-underline shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
                >
                    Commencer
                </a>
                </div>
            </div>
            </section>
        </main>
        </div>
    )
}