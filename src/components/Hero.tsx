import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative">
        <div className="hero-grid absolute inset-0 -z-10" />

        <div className="max-w-3xl mx-auto px-6 pt-14 pb-16 text-center">
            <div className="inline-flex items-center gap-2 bg-soft text-brand text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Pour les enseignants du primaire · Burkina Faso
            </div>

            <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.1] mb-6 text-ink">
            Préparez vos cours
            <br />
            <span className="text-brand">deux fois plus vite</span>
            </h1>

            <p className="text-base md:text-lg text-muted mb-9 max-w-xl mx-auto">
            Fiches+ génère en quelques secondes des fiches pédagogiques
            complètes, alignées sur les programmes officiels du primaire.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
                href="/onboarding"
                className="bg-gradient-to-r from-brand to-brand2 text-white font-semibold px-8 py-4 rounded-xl w-full sm:w-auto hover:opacity-90 transition"
            >
                Commencer →
            </Link>
            <Link
                href="#demo"
                className="border border-line text-brand font-semibold px-8 py-4 rounded-xl w-full sm:w-auto hover:bg-soft transition flex items-center justify-center gap-2"
            >
                <span>▷</span> Voir une démo
            </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
            <div>
                <p className="font-display font-extrabold text-2xl md:text-3xl text-ink">
                CP1 → CM2
                </p>
                <p className="text-xs md:text-sm text-muted mt-1">
                tous niveaux couverts
                </p>
            </div>
            <div>
                <p className="font-display font-extrabold text-2xl md:text-3xl text-ink">
                8 sec
                </p>
                <p className="text-xs md:text-sm text-muted mt-1">
                par fiche générée*
                </p>
            </div>
            <div>
                <p className="font-display font-extrabold text-2xl md:text-3xl text-ink">
                10
                </p>
                <p className="text-xs md:text-sm text-muted mt-1">
                enseignants consultés
                </p>
            </div>
            </div>

            <div className="flex flex-col items-center gap-2">
            <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-brand border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                A
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                M
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                S
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                F
                </div>
            </div>
            <p className="text-sm text-muted">
                Sondage terrain · adhésion quasi unanime sur le gain de temps
            </p>
            </div>
        </div>
        </section>
    );
}