'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type FicheItem = {
    id: string
    title: string
    discipline: string
    theme: string | null
}

const disciplineStyles: Record<string, string> = {
    'Mathématiques': 'bg-brand/10 text-brand',
    'Français': 'bg-purple-100 text-purple-700',
    'Sciences': 'bg-emerald-100 text-emerald-700',
    'Histoire-Géo': 'bg-amber-100 text-amber-700',
    'Géographie': 'bg-amber-100 text-amber-700',
    'Éd. civique': 'bg-rose-100 text-rose-700',
    'Anglais': 'bg-sky-100 text-sky-700',
}

function disciplineClass(discipline: string) {
    return disciplineStyles[discipline] ?? 'bg-soft text-brand'
}

export default function FichesSelector({ fiches }: { fiches: FicheItem[] }) {
    const router = useRouter()
    const [selected, setSelected] = useState<string[]>([])

    const toggle = (id: string) => {
        setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
    }

    const handleMerge = () => {
        router.push(`/fiches/export?ids=${selected.join(',')}`)
    }

    return (
        <>
            {selected.length > 0 && (
                <div className="sticky top-16 z-10 bg-brand text-white rounded-xl px-5 py-3 mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium">{selected.length} fiche(s) sélectionnée(s)</span>
                    <button
                        onClick={handleMerge}
                        className="bg-white text-brand text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition"
                    >
                        Fusionner en PDF
                    </button>
                </div>
            )}

            <ul className="flex flex-col gap-3">
                {fiches.map((fiche) => (
                    <li key={fiche.id} className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={selected.includes(fiche.id)}
                            onChange={() => toggle(fiche.id)}
                            className="w-4 h-4 accent-brand shrink-0"
                            aria-label={`Sélectionner ${fiche.title}`}
                        />
                        <Link
                            href={`/fiches/${fiche.id}`}
                            className="flex-1 flex items-center justify-between gap-4 bg-white border border-line rounded-xl px-5 py-4 hover:border-brand/40 hover:shadow-sm transition"
                        >
                            <div className="min-w-0">
                                <p className="font-display font-semibold text-ink truncate">{fiche.title}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${disciplineClass(fiche.discipline)}`}>
                                        {fiche.discipline}
                                    </span>
                                    <span className="text-xs text-muted">{fiche.theme}</span>
                                </div>
                            </div>
                            <span className="text-brand text-lg shrink-0">→</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}