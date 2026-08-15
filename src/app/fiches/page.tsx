import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function FichesPage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    const { data: fiches } = await supabase
        .from('fiches')
        .select('*')

    return (
        <div>
        <h1>Mes fiches</h1>
        <Link href="/newfiche">+ Créer une nouvelle fiche</Link>

        {fiches && fiches.length > 0 ? (
            <ul>
            {fiches.map((fiche) => (
                <li key={fiche.id}>
                {fiche.title} — {fiche.discipline} — {fiche.theme}
                </li>
            ))}
            </ul>
        ) : (
            <p>Vous ne possédé pas encore de fiche</p>
        )}
        </div>
    )
}