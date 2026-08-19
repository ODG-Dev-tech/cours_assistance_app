import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import BuildPDF from './ExportToPDF'

export default async function FicheDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    const { data: fiche } = await supabase
        .from('fiches')
        .select('*')
        .eq('id', id)
        .single()

    if (!fiche) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-16 text-center">
                <p className="font-display font-semibold text-ink mb-2">Fiche introuvable</p>
                <Link href="/fiches" className="text-brand text-sm font-medium hover:underline">
                    ← Retour à mes fiches
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <Link href="/fiches" className="print:hidden inline-flex items-center gap-2 text-sm text-muted hover:text-brand transition mb-6">
                ← Mes fiches
            </Link>

            <div className="bg-white border border-line rounded-2xl p-6 md:p-8 print:border-none print:shadow-none print:p-0 print:rounded-none">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="bg-soft text-brand text-xs font-semibold px-2.5 py-1 rounded-full">
                        {fiche.discipline}
                    </span>
                    <span className="bg-soft text-brand text-xs font-semibold px-2.5 py-1 rounded-full">
                        {fiche.matiere}
                    </span>
                    <span className="bg-ink text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        {fiche.level}
                    </span>
                </div>

                <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink mb-8">
                    {fiche.title}
                </h1>

                <div className="mb-8">
                    <h2 className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                        Objectifs
                    </h2>
                    <ul className="flex flex-col gap-2">
                        {fiche.content.objectifs.map((obj: string, i: number) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-ink/80">
                                <span className="text-brand mt-0.5 shrink-0">✓</span>
                                <span>{obj}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="border-t border-line pt-6 mb-8">
                    <h2 className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                        Matériel
                    </h2>
                    <p className="text-sm text-ink/80">{fiche.content.materiel}</p>
                </div>

                <div className="border-t border-line pt-6">
                    <BuildPDF />
                </div>
            </div>
        </div>
    )
}