'use client'

import { useState } from 'react'
import Link from 'next/link'
import BuildPDF from './ExportToPDF'
import RevisionChat from './ReviseChat'
import FicheCard, { type Fiche, type FicheContent } from '@/components/FicheCard'
import CoverPage from '@/components/CoverPage'

const PALETTE = [
    { name: 'Bleu', accent: '#3B5FEB', soft: '#EEF1FE' },
    { name: 'Vert', accent: '#059669', soft: '#ECFDF5' },
    { name: 'Violet', accent: '#7C3AED', soft: '#F3E8FF' },
    { name: 'Ambre', accent: '#D97706', soft: '#FEF3C7' },
    { name: 'Rose', accent: '#E11D48', soft: '#FFE4E6' },
    { name: 'Sobre', accent: '#475569', soft: '#F1F5F9' },
]

export default function FicheDetailView({ fiche }: { fiche: Fiche }) {
    const [colorIndex, setColorIndex] = useState(0)
    const [content, setContent] = useState<FicheContent>(fiche.content || {})

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <Link href="/fiches" className="print:hidden inline-flex items-center gap-2 text-sm text-muted hover:text-brand transition mb-6">
                ← Mes fiches
            </Link>

            <div className="print:hidden flex items-center gap-2 mb-6">
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

                <CoverPage
                    title={fiche.title}
                    subtitle={`${fiche.discipline} · ${fiche.level}`}
                    discipline={fiche.discipline}
                    level={fiche.level}
                    theme={fiche.theme}
                    accent={PALETTE[colorIndex].accent}
                    soft={PALETTE[colorIndex].soft}
                />
                
            <FicheCard fiche={{ ...fiche, content }} color={PALETTE[colorIndex]} />

            <div className="print:hidden mt-6">
                <RevisionChat
                    ficheId={fiche.id}
                    initialHistory={fiche.chat_history ?? []}
                    onContentUpdate={(updated) => setContent(updated as FicheContent)}
                />
            </div>

            <div className="border-t pt-6 mt-6" style={{ borderColor: PALETTE[colorIndex].soft }}>
                <BuildPDF />
            </div>
        </div>
    )
}