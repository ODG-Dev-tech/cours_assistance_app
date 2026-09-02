import { Fragment } from 'react'

export type DeroulementStep = {
    phase: string
    etape: string
    duree: string
    roleEnseignant: string
    activitesApprenant: string
    observations?: string
}

export type Source = {
    titre: string
    extrait: string
    url?: string
}

export type FicheContent = {
    objectifs?: string[]
    materiels?: string
    duree?: string[]
    methodes?: string[]
    champsObservation?: string[]
    documents?: string | null
    sources?: Source[]
    deroulement?: DeroulementStep[]
    activitesProlongement?: string | null
}

export type Fiche = {
    id: string
    title: string
    discipline: string
    matiere?: string | null
    theme?: string | null
    level: string
    content: FicheContent
    chat_history?: { role: 'user' | 'assistant'; content: string }[]
}

export type Color = { name: string; accent: string; soft: string }

export default function FicheCard({ fiche, color }: { fiche: Fiche; color: Color }) {
    const content = fiche.content || {}

    const phases: { phase: string; steps: DeroulementStep[] }[] = []
    for (const step of content.deroulement ?? []) {
        const existing = phases.find((p) => p.phase === step.phase)
        if (existing) {
            existing.steps.push(step)
        } else {
            phases.push({ phase: step.phase, steps: [step] })
        }
    }

    return (
        <div
            className="bg-white border rounded-2xl p-6 md:p-8 print:border-none print:shadow-none print:p-0 print:rounded-none"
            style={{
                ['--accent' as string]: color.accent,
                ['--accent-soft' as string]: color.soft,
                borderColor: 'var(--accent-soft)',
                borderWidth: 2,
            }}
        >
            <div className="text-center mb-8">
                <span
                    className="inline-block px-5 py-2 rounded-full font-display font-bold text-sm md:text-base w-full"
                    style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                    {fiche.discipline}
                    {fiche.matiere ? ` · ${fiche.matiere}` : ''} — {fiche.level} : Fiche &quot;{fiche.title}&quot;
                </span>
            </div>

            <dl className="grid gap-x-8 gap-y-3 mb-8 text-sm">
                <div className="flex gap-2">
                    <dt className="font-semibold text-ink shrink-0">Discipline :</dt>
                    <dd className="text-ink/80">{fiche.discipline}</dd>
                </div>
                {fiche.matiere && (
                    <div className="flex gap-2">
                        <dt className="font-semibold text-ink shrink-0">Matière :</dt>
                        <dd className="text-ink/80">{fiche.matiere}</dd>
                    </div>
                )}
                {fiche.theme && (
                    <div className="flex gap-2">
                        <dt className="font-semibold text-ink shrink-0">Thème :</dt>
                        <dd className="text-ink/80">{fiche.theme}</dd>
                    </div>
                )}
                <div className="flex gap-2">
                    <dt className="font-semibold text-ink shrink-0">Titre :</dt>
                    <dd className="text-ink/80">{fiche.title}</dd>
                </div>
                {content.duree && content.duree.length > 0 && (
                    <div className="flex gap-2">
                        <dt className="font-semibold text-ink shrink-0">Durée :</dt>
                        <dd className="text-ink/80">{content.duree.join(', ')}</dd>
                    </div>
                )}
                {content.methodes && content.methodes.length > 0 && (
                    <div className="flex gap-2">
                        <dt className="font-semibold text-ink shrink-0">Méthode / technique :</dt>
                        <dd className="text-ink/80">{content.methodes.join(', ')}</dd>
                    </div>
                )}
                {content.champsObservation && content.champsObservation.length > 0 && (
                    <div className="flex gap-2">
                        <dt className="font-semibold text-ink shrink-0">Champ d&apos;observation :</dt>
                        <dd className="text-ink/80">{content.champsObservation.join(', ')}</dd>
                    </div>
                )}
                {content.documents && (
                    <div className="flex gap-2">
                        <dt className="font-semibold text-ink shrink-0">Documents :</dt>
                        <dd className="text-ink/80">{content.documents}</dd>
                    </div>
                )}
            </dl>

            {content.objectifs && content.objectifs.length > 0 && (
                <div className="mb-6">
                    <h2 className="font-display font-bold text-sm text-ink mb-2">Objectifs d&apos;apprentissage</h2>
                    <ul className="flex flex-col gap-1.5">
                        {content.objectifs.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-ink/80">
                                <span style={{ color: 'var(--accent)' }} className="mt-0.5 shrink-0">✓</span>
                                <span>{obj}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {content.materiels && (
                <div className="mb-8">
                    <h2 className="font-display font-bold text-sm text-ink mb-2">Matériels / supports</h2>
                    <p className="text-sm text-ink/80">{content.materiels}</p>
                </div>
            )}

            {phases.length > 0 && (
                <div className="mb-8">
                    <h2 className="font-display font-bold text-base text-ink mb-4">Déroulement</h2>
                    <div className="border rounded-lg overflow-x-auto" style={{ borderColor: 'var(--accent-soft)' }}>
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr style={{ backgroundColor: 'var(--accent-soft)' }}>
                                    <th className="text-left font-semibold text-ink p-3 w-1/5">Étapes</th>
                                    <th className="text-left font-semibold text-ink p-3">Rôle de l&apos;enseignant(e)</th>
                                    <th className="text-left font-semibold text-ink p-3">Activités apprenant(e)s</th>
                                    <th className="text-left font-semibold text-ink p-3 w-1/6">Observations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {phases.map((group) => (
                                    <Fragment key={group.phase}>
                                        <tr style={{ backgroundColor: 'var(--accent-soft)' }}>
                                            <td colSpan={4} className="p-2 text-center font-display font-bold text-xs uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                                                {group.phase}
                                            </td>
                                        </tr>
                                        {group.steps.map((step, i) => (
                                            <tr key={`${group.phase}-${i}`} className="border-t" style={{ borderColor: 'var(--accent-soft)' }}>
                                                <td className="p-3 align-top">
                                                    <p className="font-semibold text-ink">{step.etape}</p>
                                                    <p className="text-xs text-muted mt-1">({step.duree})</p>
                                                </td>
                                                <td className="p-3 align-top text-ink/80 whitespace-pre-line">{step.roleEnseignant}</td>
                                                <td className="p-3 align-top text-ink/80 whitespace-pre-line">{step.activitesApprenant}</td>
                                                <td className="p-3 align-top text-ink/60">{step.observations || '—'}</td>
                                            </tr>
                                        ))}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {content.activitesProlongement && (
                <div className="mb-8">
                    <h2 className="font-display font-bold text-sm text-ink mb-2">Activités de prolongement</h2>
                    <p className="text-sm text-ink/80">{content.activitesProlongement}</p>
                </div>
            )}

            {content.sources && content.sources.length > 0 && (
                <div className="border-t pt-6" style={{ borderColor: 'var(--accent-soft)' }}>
                    <h2 className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">Sources utilisées</h2>
                    <ul className="flex flex-col gap-2">
                        {content.sources.map((src, i) => (
                            <li key={i} className="text-xs text-muted">
                                {src.url ? (
                                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline" style={{ color: 'var(--accent)' }}>
                                        {src.titre}
                                    </a>
                                ) : (
                                    <span className="font-medium text-ink/70">{src.titre}</span>
                                )}
                                
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}