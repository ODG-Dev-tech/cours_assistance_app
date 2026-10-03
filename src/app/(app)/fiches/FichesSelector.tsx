'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type FicheItem = {
    id: string
    title: string
    discipline: string
    theme: string | null
    level: string
    created_at: string
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

type SortOrder = 'recent' | 'ancien'

export default function FichesSelector({ fiches }: { fiches: FicheItem[] }) {
    const router = useRouter()
    const [selected, setSelected] = useState<string[]>([])

    const [search, setSearch] = useState('')
    const [discipline, setDiscipline] = useState('')
    const [level, setLevel] = useState('')
    const [sort, setSort] = useState<SortOrder>('recent')

    // Options dynamiques, déduites des fiches réellement présentes
    const disciplines = useMemo(
        () => Array.from(new Set(fiches.map((f) => f.discipline))).sort(),
        [fiches]
    )
    const levels = useMemo(
        () => Array.from(new Set(fiches.map((f) => f.level))).sort(),
        [fiches]
    )

    const filteredFiches = useMemo(() => {
        const q = search.trim().toLowerCase()

        const result = fiches.filter((f) => {
            const matchesSearch =
                !q ||
                f.title.toLowerCase().includes(q) ||
                (f.theme ?? '').toLowerCase().includes(q)
            const matchesDiscipline = !discipline || f.discipline === discipline
            const matchesLevel = !level || f.level === level
            return matchesSearch && matchesDiscipline && matchesLevel
        })

        result.sort((a, b) => {
            const diff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            return sort === 'recent' ? -diff : diff
        })

        return result
    }, [fiches, search, discipline, level, sort])

    const toggle = (id: string) => {
        setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
    }

    const handleMerge = () => {
        router.push(`/fiches/export?ids=${selected.join(',')}`)
    }

    const hasActiveFilters = search || discipline || level

    return (
        <>
            {/* Barre de filtres */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher par titre ou thème..."
                    className="flex-1 border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                />
                <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand transition bg-white"
                >
                    <option value="">Toutes les disciplines</option>
                    {disciplines.map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
                <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand transition bg-white"
                >
                    <option value="">Tous les niveaux</option>
                    {levels.map((l) => (
                        <option key={l} value={l}>{l}</option>
                    ))}
                </select>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOrder)}
                    className="border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand transition bg-white"
                >
                    <option value="recent">Plus récentes</option>
                    <option value="ancien">Plus anciennes</option>
                </select>
            </div>

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

            {filteredFiches.length === 0 ? (
                <div className="bg-white border border-line rounded-2xl p-8 text-center">
                    <p className="text-sm text-muted">
                        {hasActiveFilters
                            ? 'Aucune fiche ne correspond à ces filtres.'
                            : 'Aucune fiche à afficher.'}
                    </p>
                </div>
            ) : (
                <ul className="flex flex-col gap-3">
                    {filteredFiches.map((fiche) => (
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
                                        <span className="text-xs text-muted">{fiche.level}</span>
                                        <span className="text-xs text-muted">{fiche.theme}</span>
                                    </div>
                                </div>
                                <span className="text-brand text-lg shrink-0">→</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}