'use client'

import { useState } from 'react'
import Link from 'next/link'
import FicheCard, { type Fiche } from '@/components/FicheCard'
import CoverPage from '@/components/CoverPage'

const PALETTE = [
    { name: 'Bleu', accent: '#3B5FEB', soft: '#EEF1FE' },
    { name: 'Vert', accent: '#059669', soft: '#ECFDF5' },
    { name: 'Violet', accent: '#7C3AED', soft: '#F3E8FF' },
    { name: 'Ambre', accent: '#D97706', soft: '#FEF3C7' },
    { name: 'Rose', accent: '#E11D48', soft: '#FFE4E6' },
    { name: 'Sobre', accent: '#475569', soft: '#F1F5F9' },
]

export default function ExportView({ fiches }: { fiches: Fiche[] }) {
    const [colorIndex, setColorIndex] = useState(0)

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <Link href="/fiches" className="print:hidden inline-flex items-center gap-2 text-sm text-muted hover:text-brand transition mb-6">
                ← Mes fiches
            </Link>

            <div className="print:hidden flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted uppercase tracking-wide mr-1">Style :</span>
                    {PALETTE.map((p, i) => (
                        <button
                            key={p.name}
                            type="button"
                            onClick={() => setColorIndex(i)}
                            title={p.name}
                            aria-label={p.name}
                            className={`w-6 h-6 rounded-full border-2 transition ${i === colorIndex ? 'border-ink scale-110' : 'border-transparent'}`}
                            style={{ backgroundColor: p.accent }}
                        />
                    ))}
                </div>
                <button
                    onClick={() => window.print()}
                    className="bg-linear-to-r from-brand to-brand2 text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition cursor-pointer"
                >
                    Exporter en PDF ({fiches.length} fiches)
                </button>
            </div>

            <div className="flex flex-col gap-8">
                    <CoverPage
    title={fiches.length > 1 ? `Recueil de ${fiches.length} fiches` : fiches[0].title}
    subtitle={`${fiches[0].discipline} · ${fiches[0].level}`}
    discipline={fiches[0].discipline}
    level={fiches[0].level}
    theme={fiches.length === 1 ? fiches[0].theme : null}
    accent={PALETTE[colorIndex].accent}
    soft={PALETTE[colorIndex].soft}
/>
                {fiches.map((fiche, i) => (
                    <div
                        key={fiche.id}
                        // Saut de page entre chaque fiche UNIQUEMENT à l'impression —
                        // à l'écran elles restent juste espacées normalement.
                        className={i < fiches.length - 1 ? 'print:break-after-page' : ''}
                    >
                        <FicheCard fiche={fiche} color={PALETTE[colorIndex]} />
                    </div>
                ))}
            </div>
        </div>
    )
}