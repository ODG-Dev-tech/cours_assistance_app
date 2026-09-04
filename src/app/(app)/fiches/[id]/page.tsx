import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import FicheDetailView from './FicheDetailView'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: fiche } = await supabase
        .from('fiches')
        .select('title')
        .eq('id', id)
        .single()

    return {
        title: fiche?.title ?? 'Fiche',
    }
}

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

    return <FicheDetailView fiche={fiche} />
}