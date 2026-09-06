'use client'

const OBJECTIFS = [
  'Constituer des regroupements d\'objets sur les nombres 900 à 1 000',
  'Écrire en chiffres et en lettres les nombres de 900 à 1 000',
  'Écrire les nombres de 900 à 1 000 dans le tableau de numération',
]

const DEROULEMENT = [
  {
    phase: 'PHASE DE PRÉSENTATION',
    rows: [
      { etape: 'Calcul mental (PLM)', duree: '5 min', enseignant: "Pose les trois problèmes suivants :\n- Mama a 450 oranges. Son voisin lui en donne 300. Combien d'oranges a-t-elle en tout ?\n- Un commerçant a vendu 230 cahiers le matin et 270 cahiers l'après-midi. Combien de cahiers a-t-il vendu en tout ?\n- Dans une école, il y a 550 garçons et 450 filles. Combien d'élèves y a-t-il en tout ?", apprenant: 'Écoutent attentivement.\nRésolvent mentalement chaque problème.\nProposent les réponses :\n750 oranges\n500 cahiers\n1 000 élèves', observations: '—' },
      { etape: 'Rappel des prérequis', duree: '4 min', enseignant: 'Exercice oral : Compte de 100 en 100 de 0 à 900.\nExercice écrit : Classe les nombres suivants en ordre croissant : 650 ; 450 ; 850 ; 750 ; 550.', apprenant: 'Comptent de 100 en 100 : 100, 200, 300…900.\nClassent les nombres : 450 ; 550 ; 650 ; 750 ; 850', observations: '—' },
      { etape: 'Motivation', duree: '1 min', enseignant: "Communique les objectifs de la leçon aux apprenant(e)s :\nAujourd'hui, nous allons apprendre à constituer, écrire et placer dans un tableau les nombres de 900 à 1 000.\nÀ la fin de cette séance, vous serez capables de : constituer des regroupements d'objets sur les nombres 900 à 1 000 ; écrire en chiffres et en lettres ces nombres ; écrire ces nombres dans le tableau de numération.", apprenant: "Écoutent attentivement.\nÉchangent entre eux.\nÉnoncent en leurs propres termes ce qui est attendu d'eux", observations: '—' },
    ],
  },
  {
    phase: 'PHASE DE DÉVELOPPEMENT',
    rows: [
      { etape: "Présentation de la situation d'apprentissage", duree: '4 min', enseignant: 'Présente le contexte :\nDans un jardin, il y a 750 plants de tomates et 250 plants de choux. Aide le jardinier à calculer le nombre total de plants dans ce jardin.', apprenant: "Écoutent attentivement.\nProposent des réponses :\nOn va faire une addition.\nOn va compter tous les plants ensemble.\nEtc.", observations: '—' },
      { etape: 'Analyse/Échanges/Production — Consigne 1', duree: '5 min', enseignant: 'Individuellement, à l\'aide des symboles mathématiques, disposez sur la table 750 bâtonnets et ajoutez 250 bâtonnets. Comptez le tout.\nEn groupe, échangez, faites la synthèse et présentez vos résultats à l\'ensemble de la classe.', apprenant: "S'exécutent individuellement.\nDisposent les symboles sur la table.\nComptent le total.\nEn groupe : échangent et font la synthèse.\nAnnoncent le résultat : 1 000 bâtonnets", observations: '—' },
      { etape: 'Analyse/Échanges/Production — Consigne 2', duree: '5 min', enseignant: 'Individuellement, dessinez sur vos ardoises 750 bâtonnets et ajoutez 250 bâtonnets. Comptez le total et écrivez le nombre obtenu en chiffres et en lettres.\nEn groupe, échangez, faites la synthèse et présentez vos résultats à l\'ensemble de la classe.', apprenant: "S'exécutent individuellement.\nDessinent les bâtonnets.\nComptent.\nÉcrivent : 1 000 en chiffres et mille en lettres.\nEn groupe : échangent et présentent.\nRéponses attendues : 1 000 = mille", observations: '—' },
      { etape: 'Analyse/Échanges/Production — Consigne 3', duree: '5 min', enseignant: 'Individuellement, tracez le tableau de numération et écrivez-y les nombres suivants : 900 ; 950 ; 975 ; 999 ; 1 000.\nEn groupe, échangez, faites la synthèse et présentez vos résultats à l\'ensemble de la classe.', apprenant: "S'exécutent individuellement.\nTracent le tableau de numération.\nPlacent les nombres dans le tableau.\nEn groupe : échangent et présentent.\nRéponses attendues :\nCDU\n900\n950\n975\n999\n1 000 (ou avec colonne des milliers)", observations: '—' },
      { etape: 'Synthèse/Application', duree: '5 min', enseignant: "Pose la question synthétique : Que pouvons-nous retenir de ce que nous venons d'apprendre ?\nFait compléter les apprenants. Valide les réponses et formalise le savoir :\nLes nombres de 900 à 1 000 : 900 = neuf cents, 950 = neuf cent cinquante, 975 = neuf cent soixante-quinze, 999 = neuf cent quatre-vingt-dix-neuf, 1 000 = mille", apprenant: 'Écoutent attentivement.\nProposent ce qu\'ils ont retenu.\nParticipent à la formalisation du savoir.\nRecopient ou mémorisent les éléments clés', observations: '—' },
    ],
  },
  {
    phase: 'ÉVALUATION',
    rows: [
      { etape: 'Évaluation des acquis — Exercice oral', duree: '3 min', enseignant: 'Pose les questions orales :\n- Compte de 100 en 100 de 900 à 1 000.\n- Quel nombre vient après 999 ?', apprenant: 'Comptent de 100 en 100 : 900, 1 000.\nRépondent : 1 000', observations: '—' },
      { etape: 'Évaluation des acquis — Exercices écrits', duree: '5 min', enseignant: 'Propose les exercices :\n- Écris en lettres les nombres suivants : 900 ; 925 ; 950 ; 999.\n- Classe les nombres suivants en ordre décroissant : 900 ; 850 ; 950 ; 925 ; 1 000.', apprenant: "Traitent les exercices individuellement.\nÉcrivent : neuf cents, neuf cent vingt-cinq, neuf cent cinquante, neuf cent quatre-vingt-dix-neuf.\nClassent en ordre décroissant : 1 000 ; 950 ; 925 ; 900 ; 850", observations: '—' },
      { etape: 'Défi additionnel', duree: '2 min', enseignant: 'Propose un défi :\nÉcris en lettres : 999 et puis dis combien il manque à 999 pour arriver à 1 000.', apprenant: 'Traitent le défi additionnel.\nÉcrivent : neuf cent quatre-vingt-dix-neuf.\nRépondent : Il manque 1 à 999 pour arriver à 1 000.', observations: '—' },
      { etape: 'Remédiation', duree: '1 min', enseignant: "Prévoit une remédiation en fonction des résultats de l'évaluation pour les apprenants en difficulté.", apprenant: 'Traitent les exercices de remédiation proposés.', observations: '—' },
      { etape: 'Prolongement/Transfert ou exercice de maison', duree: '2 min', enseignant: 'Propose un travail à la maison :\nÀ la maison, écris les nombres de 900 à 1 000 de 10 en 10.\nOu : Compte de 50 en 50 de 900 à 1 000.', apprenant: "Prennent l'engagement de faire l'exercice à la maison.\nRendent compte à la séance suivante", observations: '—' },
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
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[88vh] overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header modal (UI produit, pas partie de la fiche) */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between gap-4 bg-slate-50">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Exemple réel généré par Fiches+
          </span>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-ink border border-line cursor-pointer"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Corps scrollable = rendu fidèle de la vraie fiche */}
        <div className="overflow-y-auto px-6 py-6 sm:px-10 sm:py-8">

          {/* En-tête institutionnel MENAPLN */}
          <div className="text-center mb-6">
            <p className="font-bold text-[13px] leading-snug">
              MINISTÈRE DE L&apos;ÉDUCATION NATIONALE DE BASE, DE<br />
              L&apos;ALPHABÉTISATION ET DE LA PROMOTION DES<br />
              LANGUES NATIONALES
            </p>
            <p className="text-slate-300 text-xs my-1">*************</p>
            <p className="font-bold text-[13px]">
              DIRECTION GÉNÉRALE DE LA QUALITÉ DE L&apos;ÉDUCATION<br />
              PRÉSCOLAIRE ET DE L&apos;ENSEIGNEMENT PRIMAIRE
            </p>
            <p className="font-bold text-base mt-4">BURKINA FASO</p>
            <p className="text-slate-300 text-xs my-1">************</p>
            <p className="italic text-slate-500 text-sm">La Patrie ou la Mort, nous Vaincrons</p>
          </div>

          {/* Badge résumé */}
          <div className="bg-emerald-50 text-emerald-700 font-semibold text-sm text-center rounded-lg py-3 px-4 mb-6">
            Les nombres entiers de 900 à 1 000 · Mathématiques · CE2
          </div>

          <div className="h-px bg-emerald-600 mb-6" />

          {/* Bloc métadonnées classe */}
          <div className="flex flex-col gap-2.5 mb-8 text-sm">
            {[
              ['Classe', 'CE2'],
              ['Effectif', 'G : ......... F : ......... Total : .........'],
              ['Date', '1 septembre 2026'],
              ['Discipline', 'Mathématiques'],
              ['Thème', 'Etude des nombres'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-line pb-2">
                <span className="font-bold text-ink">{label}</span>
                <span className="text-slate-600 text-right">{value}</span>
              </div>
            ))}
          </div>

          {/* Deuxième badge récapitulatif */}
          <div className="bg-emerald-50 text-emerald-700 font-semibold text-sm text-center rounded-lg py-3 px-4 mb-6">
            Mathématiques · Arithmétique — CE2 : Fiche &quot;Les nombres entiers de 900 à 1 000&quot;
          </div>

          {/* Métadonnées détaillées */}
          <div className="flex flex-col gap-3 mb-8 text-sm">
            {[
              ['Discipline', 'Mathématiques'],
              ['Matière', 'Arithmétique'],
              ['Thème', 'Etude des nombres'],
              ['Titre', 'Les nombres entiers de 900 à 1 000'],
              ['Durée', '45 mn'],
              ['Méthode / technique', 'Travaux de groupes, Tutorat'],
              ['Champ d\'observation', 'En classe'],
              ['Documents', 'Livre de mathématiques CE2 – Fiches d\'arithmétique CE2 du Burkina Faso ; Guide du maître CE2 ; Approche Pédagogique Intégratrice (MENAPLN)'],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <span className="font-bold text-ink shrink-0">{label} :</span>
                <span className="text-slate-600">{value}</span>
              </div>
            ))}
          </div>

          {/* Objectifs */}
          <div className="mb-8">
            <h3 className="font-bold text-base text-ink mb-3">Objectifs d&apos;apprentissage</h3>
            <p className="text-sm text-slate-600 mb-2">à l&apos;issue de la séance, l&apos;apprenant(e) doit être capables de:</p>
            <ul className="flex flex-col gap-1.5">
              {OBJECTIFS.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Matériels */}
          <div className="mb-8">
            <h3 className="font-bold text-base text-ink mb-2">Matériels / supports</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              individuel : ardoise, craie, symboles mathématiques découpés… collectif : tableau, ardoises géantes, boites de craies…
            </p>
          </div>

          {/* Déroulement — vrai tableau */}
          <div className="mb-8">
            <h3 className="font-bold text-base text-ink mb-3">Déroulement</h3>
            <div className="border border-line rounded-lg overflow-hidden">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-emerald-50 text-left">
                    <th className="px-4 py-3 font-bold text-ink w-[18%]">Étapes</th>
                    <th className="px-4 py-3 font-bold text-ink w-[34%]">Rôle de l&apos;enseignant(e)</th>
                    <th className="px-4 py-3 font-bold text-ink w-[34%]">Activités apprenant(e)s</th>
                    <th className="px-4 py-3 font-bold text-ink w-[14%]">Observations</th>
                  </tr>
                </thead>
                <tbody>
                  {DEROULEMENT.map((section) => (
                    <>
                      <tr key={section.phase}>
                        <td colSpan={4} className="bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wide text-center py-2">
                          {section.phase}
                        </td>
                      </tr>
                      {section.rows.map((row) => (
                        <tr key={row.etape} className="border-t border-line align-top">
                          <td className="px-4 py-3">
                            <p className="font-semibold text-ink">{row.etape}</p>
                            <p className="text-xs text-slate-400 mt-0.5">({row.duree})</p>
                          </td>
                          <td className="px-4 py-3 text-slate-600 whitespace-pre-line">{row.enseignant}</td>
                          <td className="px-4 py-3 text-slate-600 whitespace-pre-line">{row.apprenant}</td>
                          <td className="px-4 py-3 text-slate-400">{row.observations}</td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activités de prolongement */}
          <div className="mb-8">
            <h3 className="font-bold text-base text-ink mb-2">Activités de prolongement</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              À la maison : - Écris les nombres de 900 à 1 000 de 10 en 10 : 900, 910, 920… 1 000. - Compte de 50 en 50 de 900 à 1 000 : 900, 950, 1 000. - Demande à un membre de la famille de te donner un nombre entre 900 et 1 000 et écris-le en lettres. Transfert en contexte : - Identifie dans son environnement des situations où on utilise ces nombres (prix de marché, effectifs d&apos;écoles, distances, etc.). - Résous des petits problèmes pratiques impliquant ces nombres.
            </p>
          </div>

          {/* Sources */}
          <div>
            <h3 className="font-bold text-base text-ink mb-2">Sources utilisées</h3>
            <p className="text-sm text-emerald-600 underline">Fiches d&apos;arithmétique CE2</p>
          </div>
        </div>

        {/* Footer CTA (UI produit, pas partie de la fiche) */}
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