'use client'

const OBJECTIFS = [
  'Constituer des regroupements d\'objets sur les nombres 900 à 1 000',
  'Écrire en chiffres et en lettres les nombres de 900 à 1 000',
  'Écrire les nombres de 900 à 1 000 dans le tableau de numération',
]

const DEROULEMENT = [
  {
    phase: 'Phase de présentation',
    rows: [
      { etape: 'Calcul mental', duree: '5 min', enseignant: "Pose trois petits problèmes de calcul (ex : Mama a 450 oranges, son voisin lui en donne 300…)", apprenant: 'Résolvent mentalement : 750 oranges, 500 cahiers, 1 000 élèves' },
      { etape: 'Rappel des prérequis', duree: '4 min', enseignant: 'Compter de 100 en 100 de 0 à 900 ; classer des nombres en ordre croissant', apprenant: 'Comptent et classent : 450, 550, 650, 750, 850' },
      { etape: 'Motivation', duree: '1 min', enseignant: 'Communique les objectifs de la leçon', apprenant: "Écoutent et reformulent ce qui est attendu d'eux" },
    ],
  },
  {
    phase: 'Phase de développement',
    rows: [
      { etape: "Situation d'apprentissage", duree: '4 min', enseignant: '750 plants de tomates + 250 plants de choux : calculer le total', apprenant: 'Proposent : "on va faire une addition"' },
      { etape: 'Consigne 1', duree: '5 min', enseignant: 'Disposer 750 puis ajouter 250 bâtonnets, compter le tout', apprenant: 'Trouvent 1 000 bâtonnets' },
      { etape: 'Consigne 2', duree: '5 min', enseignant: 'Dessiner et écrire le nombre obtenu en chiffres et en lettres', apprenant: 'Écrivent : 1 000 = mille' },
      { etape: 'Consigne 3', duree: '5 min', enseignant: 'Tracer le tableau de numération et y placer 900, 950, 975, 999, 1 000', apprenant: 'Placent les nombres dans le tableau' },
      { etape: 'Synthèse / Application', duree: '5 min', enseignant: 'Formalise le savoir : 900 = neuf cents … 1 000 = mille', apprenant: 'Participent à la formalisation du savoir' },
    ],
  },
  {
    phase: 'Évaluation',
    rows: [
      { etape: 'Évaluation orale', duree: '3 min', enseignant: 'Compter de 100 en 100 de 900 à 1 000 ; quel nombre vient après 999 ?', apprenant: 'Répondent : 1 000' },
      { etape: 'Évaluation écrite', duree: '5 min', enseignant: 'Écrire en lettres et classer en ordre décroissant', apprenant: 'Neuf cents, neuf cent vingt-cinq…' },
      { etape: 'Défi additionnel', duree: '2 min', enseignant: 'Écrire 999 en lettres, combien manque-t-il pour atteindre 1 000 ?', apprenant: 'Il manque 1' },
      { etape: 'Prolongement', duree: '2 min', enseignant: 'Écrire les nombres de 900 à 1 000, de 10 en 10', apprenant: "S'engagent à faire l'exercice à la maison" },
    ],
  },
]

export default function DemoModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-180 w-full max-h-[88vh] overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-line flex items-start justify-between gap-4 bg-linear-to-br from-soft to-indigo-50">
          <div>
            <span className="inline-block text-[11px] font-bold text-brand uppercase tracking-wider mb-2">
              Exemple réel généré par Fiches+
            </span>
            <h2 className="font-display text-lg font-extrabold text-ink leading-snug">
              Les nombres entiers de 900 à 1 000
            </h2>
            <p className="text-[13px] text-muted mt-1">Mathématiques · Arithmétique · CE2</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-ink border-0 cursor-pointer"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Body scrollable */}
        <div className="overflow-y-auto px-6 py-5">

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              ['Durée', '45 min'],
              ['Méthode', 'Travaux de groupes'],
              ['Champ', 'En classe'],
              ['Niveau', 'CE2'],
            ].map(([label, value]) => (
              <div key={label} className="bg-slate-50 rounded-lg px-3 py-2.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-[13px] font-semibold text-ink">{value}</p>
              </div>
            ))}
          </div>

          {/* Objectifs */}
          <div className="mb-6">
            <h3 className="font-display text-sm font-bold text-ink mb-3">Objectifs d&apos;apprentissage</h3>
            <ul className="flex flex-col gap-1.5">
              {OBJECTIFS.map((o) => (
                <li key={o} className="flex items-start gap-2 text-[13px] text-slate-600 leading-relaxed">
                  <span className="text-brand font-bold shrink-0">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Matériels */}
          <div className="mb-6">
            <h3 className="font-display text-sm font-bold text-ink mb-2">Matériel / supports</h3>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              <strong>Individuel :</strong> ardoise, craie, symboles mathématiques découpés.{' '}
              <strong>Collectif :</strong> tableau, ardoises géantes, boîtes de craies.
            </p>
          </div>

          {/* Déroulement */}
          <div className="mb-6">
            <h3 className="font-display text-sm font-bold text-ink mb-3">Déroulement</h3>
            <div className="flex flex-col gap-4">
              {DEROULEMENT.map((section) => (
                <div key={section.phase}>
                  <p className="text-[11px] font-bold text-brand uppercase tracking-wide mb-2">{section.phase}</p>
                  <div className="flex flex-col gap-2.5">
                    {section.rows.map((row) => (
                      <div key={row.etape} className="border border-line rounded-lg px-3.5 py-3">
                        <div className="flex items-baseline justify-between gap-2 mb-1.5">
                          <p className="text-[13px] font-semibold text-ink">{row.etape}</p>
                          <span className="text-[11px] text-slate-400 font-medium shrink-0">{row.duree}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed mb-1">
                          <span className="font-semibold text-slate-400">Enseignant·e — </span>{row.enseignant}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <span className="font-semibold text-slate-400">Apprenant·e·s — </span>{row.apprenant}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div>
            <h3 className="font-display text-sm font-bold text-ink mb-2">Sources</h3>
            <p className="text-[13px] text-slate-600">
              Fiches d&apos;arithmétique CE2 · Guide du maître CE2 · Approche Pédagogique Intégratrice (MENAPLN)
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-4 border-t border-line bg-slate-50 flex items-center justify-between gap-4">
          <p className="text-[12px] text-muted">Fiche générée en quelques secondes, non modifiée.</p>
          
           <a href="/login"
            className="shrink-0 px-5 py-2.5 rounded-lg bg-linear-to-br from-brand to-brand2 text-white font-bold text-[13px] no-underline"
          >
            Essayer gratuitement
          </a>
        </div>
      </div>
    </div>
  )
}