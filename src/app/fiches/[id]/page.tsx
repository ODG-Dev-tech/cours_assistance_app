import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
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
        return <p>Fiche introuvable</p>
    }

    return (
        <div>
        <h1>{fiche.title}</h1>
        <p>{fiche.discipline} — {fiche.matiere} — {fiche.level}</p>
        <h2>Objectifs</h2>
        <ul>
            {fiche.content.objectifs.map((obj: string, i: number) => (
            <li key={i}>{obj}</li>
            ))}
        </ul>
        <p><strong>Matériel :</strong> {fiche.content.materiel}</p>
        <BuildPDF />
        </div>
    )
}