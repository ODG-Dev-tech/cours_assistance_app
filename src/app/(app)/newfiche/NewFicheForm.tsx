'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const NIVEAUX = ['CP1', 'CP2', 'CE1', 'CE2', 'CM1', 'CM2']

const DISCIPLINES = [
    'Français',
    'Mathématiques',
    'Leçons',
    'Dessin',
    'Récitation',
    'Chant',
    'Langage',
    "Exercice d'observation",
    'Langage mathématique',
]

const MATIERES_PAR_DISCIPLINE: Record<string, string[]> = {
    Français: [
        'Grammaire',
        'Conjugaison',
        'Vocabulaire théorique',
        'Vocabulaire usuel',
        "Orthographe d'usage",
        "Orthographe grammaticale",
        'Lecture',
        'Ecriture',
        'Expression écrite',
        'Expression orale'
    ],
    Mathématiques: ['Arithmétique', 'Système métrique', 'Géométrie', 'Calcul mental'],
    Leçons: ['Histoire', 'Géographie', 'Sciences','Sciences de la Vie et de la Terre', 'Éducation civique et morale'],
}


const DUREES = ['10 mn','15 mn','20 mn', '25 mn','30 mn','35 mn', '40 mn', '45 mn', '50 mn', '55 mn', '1 h']
const METHODES = ['Travaux de groupes', 'Tutorat', 'Projets']
const CHAMPS_OBSERVATION = ['En classe','Hors classe']

function PillGroup({
    label,
    options,
    selected,
    onToggle,
    multi = false,
}: {
    label: string
    options: string[]
    selected: string[]
    onToggle: (value: string) => void
    multi?: boolean
}) {
    return (
        <div className="mb-6">
            <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                {label} {multi && <span className="normal-case font-normal">(plusieurs choix possibles)</span>}
            </p>
            <div className="flex flex-wrap gap-2">
                {options.map((opt) => {
                    const isActive = selected.includes(opt)
                    return (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => onToggle(opt)}
                            className={`text-sm font-medium px-4 py-2 rounded-full transition ${
                                isActive ? 'bg-brand text-white' : 'bg-soft text-brand hover:bg-brand/10'
                            }`}
                        >
                            {opt}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

function TextField({
    label,
    value,
    onChange,
    placeholder,
    multiline = false,
}: {
    label: string
    value: string
    onChange: (v: string) => void
    placeholder: string
    multiline?: boolean
}) {
    return (
        <div className="mb-6">
            <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-3 block">
                {label}
            </label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={3}
                    className="w-full border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition resize-none"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                />
            )}
        </div>
    )
}

export default function NewFicheForm() {
    const router = useRouter()
    const [discipline, setDiscipline] = useState('')
    const [matiere, setMatiere] = useState('')
    const [niveau, setNiveau] = useState('')
    const [theme, setTheme] = useState('')
    const [titre, setTitre] = useState('')
    const [objectifs, setObjectifs] = useState('')
    const [materiels, setMateriels] = useState('')
    const [duree, setDuree] = useState<string[]>([])
    const [methodes, setMethodes] = useState<string[]>([])
    const [champsObs, setChampsObs] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const sousMatieres = MATIERES_PAR_DISCIPLINE[discipline]

    const toggleSingle = (setter: (v: string) => void) => (value: string) => setter(value)

    const toggleMulti = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (value: string) => {
        setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
    }

    const isValid = discipline && niveau && theme.trim() && titre.trim()

    const handleSubmit = async () => {
        if (!isValid) {
            setError('Discipline, Niveau, Thème et Titre sont obligatoires.')
            return
        }
        setError('')
        setIsSubmitting(true)

        try {
            const res = await fetch('/api/fiches/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    discipline,
                    matiere: matiere || null,
                    niveau,
                    theme,
                    titre,
                    objectifs,
                    materiels,
                    duree,
                    methodes,
                    champsObservation: champsObs,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'La génération a échoué. Réessayez.')
                setIsSubmitting(false)
                return
            }

            router.push(`/fiches/${data.id}`)
        } catch {
            setError('Erreur réseau. Vérifiez votre connexion et réessayez.')
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white border border-line rounded-2xl p-6 md:p-8">
            <PillGroup
                label="Discipline"
                options={DISCIPLINES}
                selected={discipline ? [discipline] : []}
                onToggle={(v) => {
                    setDiscipline(v)
                    setMatiere('') // on réinitialise la matière si la discipline change
                }}
            />

            {sousMatieres && (
                <PillGroup
                    label="Matière"
                    options={sousMatieres}
                    selected={matiere ? [matiere] : []}
                    onToggle={toggleSingle(setMatiere)}
                />
            )}

            <PillGroup
                label="Niveau"
                options={NIVEAUX}
                selected={niveau ? [niveau] : []}
                onToggle={toggleSingle(setNiveau)}
            />

            <TextField label="Thème" value={theme} onChange={setTheme} placeholder="Ex : L'école, la famille" />
            <TextField label="Titre" value={titre} onChange={setTitre} placeholder="Ex : La phrase" />
            <TextField
                label="Objectifs d'apprentissage"
                value={objectifs}
                onChange={setObjectifs}
                placeholder="Ex : identifier une phrase, donner ses constituants..."
                multiline
            />
            <TextField
                label="Matériels / supports"
                value={materiels}
                onChange={setMateriels}
                placeholder="Ex : ardoises individuelles, texte de base..."
                multiline
            />

            <PillGroup label="Durée" options={DUREES} selected={duree} onToggle={toggleMulti(setDuree)} />
            <PillGroup
                label="Méthode / technique"
                options={METHODES}
                selected={methodes}
                onToggle={toggleMulti(setMethodes)}
                multi
            />
            <PillGroup
                label="Champ d'observation"
                options={CHAMPS_OBSERVATION}
                selected={champsObs}
                onToggle={toggleMulti(setChampsObs)}
                multi
            />

            <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-brand to-brand2 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
                {isSubmitting ? 'Génération en cours...' : 'Générer la fiche'}
            </button>

            {error && (
                <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-4 py-3 text-center mt-4">
                    {error}
                </p>
            )}
        </div>
    )
}