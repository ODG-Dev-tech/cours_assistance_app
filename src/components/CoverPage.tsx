export default function CoverPage({
    title,
    subtitle,
    discipline,
    level,
    theme,
    accent,
    soft,
}: {
    title: string
    subtitle: string
    discipline: string
    level: string
    theme?: string | null
    accent: string
    soft: string
}) {
    const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

    return (
        <div className="print:break-after-page flex flex-col items-center text-center py-16 px-8 font-body">
            {/* En-tête ministériel */}
            <div className="grid grid-cols-2 gap-10 w-full max-w-2xl mb-14">
                <div>
                    <p className="font-display font-bold text-[11px] leading-relaxed uppercase text-ink">
                        Ministère de l&apos;Éducation Nationale de base, de l&apos;Alphabétisation et de la Promotion des Langues Nationales
                    </p>
                    <p className="text-ink/40 text-xs my-2">***************</p>
                    <p className="font-display font-bold text-[11px] leading-relaxed uppercase text-ink">
                        Direction générale de la qualité de l&apos;éducation préscolaire et de l&apos;enseignement primaire
                    </p>
                </div>
                <div>
                    <p className="font-display font-bold text-sm uppercase text-ink">Burkina Faso</p>
                    <p className="text-ink/40 text-xs my-2">*************</p>
                    <p className="text-xs italic text-ink/70">La Patrie ou la Mort, nous Vaincrons</p>
                </div>
            </div>

            {/* Titre de la fiche */}
            <span
                className="inline-block px-6 py-2.5 rounded-full font-display font-bold text-sm md:text-base w-full max-w-lg mb-14"
                style={{ backgroundColor: soft, color: accent }}
            >
                {title} • {subtitle}
            </span>

            {/* Champs administratifs, à remplir à la main comme sur les fiches sources */}
            <div className="w-full max-w-md border-t border-b py-8" style={{ borderColor: accent }}>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b border-ink/10">
                            <td className="py-2.5 text-left font-semibold text-ink w-1/3">Classe</td>
                            <td className="py-2.5 text-left text-ink/80">{level}</td>
                        </tr>
                        <tr className="border-b border-ink/10">
                            <td className="py-2.5 text-left font-semibold text-ink">Effectif</td>
                            <td className="py-2.5 text-left text-ink/40">G : ……… F : ……… Total : ………</td>
                        </tr>
                        <tr className="border-b border-ink/10">
                            <td className="py-2.5 text-left font-semibold text-ink">Date</td>
                            <td className="py-2.5 text-left text-ink/40">………………………………</td>
                        </tr>
                        <tr className="border-b border-ink/10">
                            <td className="py-2.5 text-left font-semibold text-ink">Discipline</td>
                            <td className="py-2.5 text-left text-ink/80">{discipline}</td>
                        </tr>
                        {theme && (
                            <tr>
                                <td className="py-2.5 text-left font-semibold text-ink">Thème</td>
                                <td className="py-2.5 text-left text-ink/80">{theme}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <span className="text-xs text-muted uppercase tracking-wide mt-10">{today}</span>
        </div>
    )
}