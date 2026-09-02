"use client"
import { useState } from 'react'
import Nav from '@/components/Nav'

function BgDecorations() {
  return (
    <>
      <div className="fixed -top-20 -right-15 w-90 h-90 rounded-full bg-[radial-gradient(circle,rgba(59,95,235,0.09)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="fixed -bottom-15 -left-15 w-90 h-90 rounded-full bg-[radial-gradient(circle,rgba(108,76,224,0.08)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,95,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,95,235,0.03)_1px,transparent_1px)] bg-size-[:48px_48px] pointer-events-none z-0" />
    </>
  )
}

const FEATURES = [
  {
    color: {
      text: 'text-blue-600',
      badgeBg: 'bg-blue-600/10',
      border: 'border-blue-600',
    },
    title: 'Génération instantanné',
    tagline: 'Le plus dur de la préparation, fait pour vous',
    desc: "Renseignez la matière, le niveau, le thème et vos objectifs d'apprentissage — Fiches+ rédige automatiquement le déroulement pédagogique complet, propose le matériel nécessaire, des documents de référence et des activités de prolongement.",
    details: [
      'Déroulement structuré selon les phases de l\'Approche Pédagogique Intégrative',
      'Rédaction en quelques secondes',
      'Sources et documents de référence suggérés automatiquement',
      'Activités de prolongement générées pour chaque fiche',
    ],
  },
  {
    color: {
      text: 'text-violet-600',
      badgeBg: 'bg-violet-600/10',
      border: 'border-violet-600',
    },
    title: 'Conforme aux programmes MENAPLN',
    tagline: 'Ancré dans les fiches API officielles',
    desc: "Chaque génération s'appuie sur une recherche dans une base documentaire construite à partir des fiches pédagogiques officielles du Ministère, pour rester fidèle à l'Approche Pédagogique Intégrative.",
    details: [
      'Couverture du CP1 au CM2',
      'Recherche ciblée par discipline, niveau et matière à chaque génération',
      'Basé sur les fiches API officielles du MENAPLN',
    ],
  },
  {
    color: {
      text: 'text-emerald-600',
      badgeBg: 'bg-emerald-600/10',
      border: 'border-emerald-600',
    },
    title: 'Révision par chat',
    tagline: 'La fiche est à vous, ajustez-la en discutant',
    desc: "Une fois la fiche générée, échangez avec l'assistant pour l'ajuster : reformuler une étape, préciser une consigne, l'adapter au matériel disponible dans votre école, l'adapté à vos goûts.",
    details: [
      'Chat de révision intégré à chaque fiche',
      'Demandez des ajustements en langage naturel',
      'Les modifications sont conservées avec la fiche',
    ],
  },
  {
    color: {
      text: 'text-amber-600',
      badgeBg: 'bg-amber-600/10',
      border: 'border-amber-600',
    },
    title: 'Export PDF prêt à imprimer',
    tagline: "Directement de l'écran à la salle de classe",
    desc: "Téléchargez vos fiches en PDF mis en page proprement, avec une couverture. Imprimez en un clic.",
    details: [
      'Mise en page automatique avec couverture',
      'Fusion de plusieurs fiches en un seul document',
      'Impression directe depuis le navigateur',
    ],
  },
  {
    color: {
      text: 'text-pink-600',
      badgeBg: 'bg-pink-600/10',
      border: 'border-pink-600',
    },
    title: 'Toutes vos fiches au même endroit',
    tagline: 'Votre activité en un coup d\'œil',
    desc: "Retrouvez l'historique complet de vos fiches et un aperçu simple de votre activité, sans avoir à chercher dans vos dossiers.",
    details: [
      'Historique complet de toutes vos fiches',
    ],
  },
]

const COMPARISON = [
  { feature: 'Génération de fiches complètes', fichesPlus: true, manuel: false, autresOutils: false },
  { feature: 'Alignement programmes MENAPLN', fichesPlus: true, manuel: false, autresOutils: false },
  { feature: 'Export PDF mis en page', fichesPlus: true, manuel: false, autresOutils: true },
  { feature: 'Révision de vos fiches', fichesPlus: true, manuel: true, autresOutils: true },
  { feature: 'Historique des fiches', fichesPlus: true, manuel: false, autresOutils: true },
  { feature: 'Prix accessible (5 000 FCFA/mois)', fichesPlus: true, manuel: true, autresOutils: false },
]

function CheckIcon({ yes, colorClass = 'text-brand' }: { yes: boolean; colorClass?: string }) {
  return yes ? (
    <div className="flex justify-center">
      <div className={`w-5.5 h-5.5 rounded-full ${colorClass} bg-current/10 flex items-center justify-center`}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={colorClass}>
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  ) : (
    <div className="flex justify-center">
      <div className="w-5.5 h-5.5 rounded-full bg-slate-100 flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 2l6 6M8 2L2 8" stroke="#cbd5e1" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

export default function Features() {
  const [active, setActive] = useState(0)
  const feat = FEATURES[active]

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col relative">
      <BgDecorations />
      <Nav />

      <main className="flex-1 relative z-10">

        {/* Hero */}
        <section className="max-w-275 mx-auto px-5 pt-12 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-linear-to-br from-soft to-indigo-50 border border-blue-200 rounded-full px-3.5 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block shadow-[0_0_0_3px_rgba(59,95,235,0.2)]" />
            <span className="text-xs font-semibold text-brand">Tout ce dont vous avez besoin</span>
          </div>
          <h1 className="font-display text-[clamp(28px,6vw,52px)] font-extrabold text-ink tracking-[-0.03em] leading-[1.1] mb-4">
            Des fonctionnalités pensées{' '}
            <span className="bg-linear-to-r from-brand to-brand2 bg-clip-text text-transparent">
              pour le terrain
            </span>
          </h1>
          <p className="text-[clamp(14px,2.5vw,17px)] text-muted max-w-125 mx-auto leading-relaxed">
            Chaque fonctionnalité de Fiches+ a été conçue avec des enseignants burkinabè. Rien de superflu, tout ce qui compte.
          </p>
        </section>

        {/* Interactive feature explorer */}
        <section className="max-w-275 mx-auto px-5 pb-14">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-5 items-start">

            {/* Tabs */}
            <div className="flex flex-col gap-2">
              {FEATURES.map((f, i) => (
                <button
                  key={f.title}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl border-0 cursor-pointer text-left transition-all font-sans border-l-[3px] ${
                    active === i
                      ? `bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${f.color.border}`
                      : 'bg-transparent border-l-transparent'
                  }`}
                >
                  <div>
                    <p className={`text-sm font-bold mb-0.5 ${active === i ? 'text-ink' : 'text-slate-600'}`}>{f.title}</p>
                    <p className={`text-xs font-medium ${active === i ? f.color.text : 'text-slate-400'}`}>{f.tagline}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div className="bg-white rounded-2xl border border-blue-100/50 shadow-[0_4px_24px_rgba(0,0,0,0.05)] p-7 sticky top-20">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${feat.color.text}`}>{feat.tagline}</span>
              <h2 className="font-display text-[22px] font-extrabold text-ink tracking-[-0.02em] mt-2 mb-3">{feat.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">{feat.desc}</p>
              <ul className="list-none p-0 flex flex-col gap-2.5">
                {feat.details.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[13px] text-slate-700 font-medium">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`mt-0.5 shrink-0 ${feat.color.text}`}>
                      <circle cx="8" cy="8" r="8" className={feat.color.badgeBg} fill="currentColor" opacity="0.15" />
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="bg-white border-t border-line py-14">
          <div className="max-w-225 mx-auto px-5">
            <div className="text-center mb-9">
              <span className="text-[11px] font-bold text-brand uppercase tracking-wider">Comparaison</span>
              <h2 className="font-display text-[clamp(22px,4vw,34px)] font-extrabold text-ink tracking-[-0.02em] mt-2.5">
                Pourquoi Fiches+ ?
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0 text-[13px]">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-slate-400 font-semibold text-xs uppercase tracking-wide w-[45%]">Fonctionnalité</th>
                    <th className="px-4 py-3 text-center bg-linear-to-br from-brand to-brand2 text-white font-bold rounded-t-[10px] text-[13px]">Fiches+</th>
                    <th className="px-4 py-3 text-center text-slate-400 font-semibold">Rédaction manuelle</th>
                    <th className="px-4 py-3 text-center text-slate-400 font-semibold">Autres outils</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="px-4 py-3 text-slate-700 font-medium border-b border-slate-100">{row.feature}</td>
                      <td className="px-4 py-3 border-b border-blue-100/40 bg-brand/3"><CheckIcon yes={row.fichesPlus} colorClass="text-brand" /></td>
                      <td className="px-4 py-3 border-b border-slate-100"><CheckIcon yes={row.manuel} colorClass="text-emerald-600" /></td>
                      <td className="px-4 py-3 border-b border-slate-100"><CheckIcon yes={row.autresOutils} colorClass="text-emerald-600" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="max-w-275 mx-auto px-5 py-14">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5 items-stretch">

            {/* Free */}
            <div className="bg-white rounded-2xl border border-blue-100/50 shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-6 py-7 flex flex-col">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Essai gratuit</p>
              <div className="flex items-baseline gap-1 mb-1.5">
                <span className="font-display text-4xl font-extrabold text-ink tracking-[-0.03em]">0</span>
                <span className="text-sm font-semibold text-slate-400">FCFA</span>
              </div>
              <p className="text-[13px] text-slate-400 mb-5">2 fiches offertes, sans abonnement</p>
              <ul className="list-none p-0 flex flex-col gap-2.5 mb-6 flex-1">
                {['2 fiches à générer', 'Toutes les matières', 'Export PDF', 'Aucun abonnement requis'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[13px] text-slate-600 font-medium">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#f1f5f9" /><path d="M5 8l2 2 4-4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/login" className="block text-center py-3.5 rounded-[10px] border-[1.5px] border-brand/20 text-brand font-semibold text-sm no-underline">
                Essayer gratuitement
              </a>
            </div>

            {/* Pro */}
            <div className="bg-linear-to-br from-brand to-brand2 rounded-2xl px-6 py-7 shadow-[0_8px_32px_rgba(59,95,235,0.28)] flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1.5px)] bg-size-[:20px_20px] pointer-events-none" />
              <div className="relative">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[11px] font-bold text-white/65 uppercase tracking-wider">Plan Pro</p>
                  <span className="bg-white/20 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">Recommandé</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-[40px] font-extrabold text-white tracking-[-0.03em]">5 000</span>
                  <span className="text-[15px] font-semibold text-white/70">FCFA</span>
                </div>
                <p className="text-[13px] text-white/60 mb-5">par mois · accès illimité</p>
                <ul className="list-none p-0 flex flex-col gap-2.5 mb-6 flex-1">
                  {[
                    'Fiches illimitées',
                    'Toutes les matières CP1 → CM2',
                    'Export PDF professionnel',
                    'Alignement programmes MENAPLN',
                    'Historique de vos fiches',
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-white/85 font-medium">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.15)" /><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/subscription" className="block text-center py-3.5 rounded-[10px] bg-white text-brand font-bold text-sm no-underline shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                  Commencer — 5 000 FCFA/mois
                </a>
                <p className="text-center text-[11px] text-white/50 mt-2.5">
                  Paiement via Orange Money · Moov Money · Carte bancaire (Visa/Mastercard)
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}