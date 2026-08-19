'use client'

import { useState } from 'react'

export default function BuildPDF() {
    const [showHelp, setShowHelp] = useState(false)

    return (
        <div className="print:hidden">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => window.print()}
                    className="bg-linear-to-r from-brand to-brand2 text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition cursor-pointer"
                >
                    Exporter en PDF
                </button>
                <button
                    onClick={() => setShowHelp(!showHelp)}
                    className="text-sm text-brand font-medium hover:underline cursor-pointer"
                >
                    {showHelp ? 'Masquer l\'astuce' : 'Comment garder le style ?'}
                </button>
            </div>

            {showHelp && (
                <ol className="mt-4 bg-soft border border-line rounded-lg p-4 text-sm text-ink/80 flex flex-col gap-1.5 list-decimal list-inside max-w-md">
                    <li>Cliquez sur <strong>&laquo;&nbsp;Plus de paramètres&nbsp;&raquo;</strong> dans la fenêtre d&apos;impression</li>
                    <li>Décochez <strong>&laquo;&nbsp;En-têtes et pieds de page&nbsp;&raquo;</strong></li>
                    <li>Cochez <strong>&laquo;&nbsp;Graphiques d&apos;arrière-plan&nbsp;&raquo;</strong> pour garder les couleurs</li>
                    <li>Choisissez <strong>&laquo;&nbsp;Enregistrer au format PDF&nbsp;&raquo;</strong> comme destination</li>
                </ol>
            )}
        </div>
    )
}