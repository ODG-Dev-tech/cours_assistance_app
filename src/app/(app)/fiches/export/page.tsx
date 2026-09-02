import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ExportView from './ExportView'

export default async function ExportPage({
    searchParams,
}: {
    searchParams: Promise<{ ids?: string }>
}) {
    const { ids } = await searchParams
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    const ficheIds = ids?.split(',').filter(Boolean) ?? []
    if (ficheIds.length === 0) {
        redirect('/fiches')
    }

    const { data: fiches } = await supabase
        .from('fiches')
        .select('*')
        .in('id', ficheIds)
        .eq('teacher_id', user.id)

    if (!fiches || fiches.length === 0) {
        redirect('/fiches')
    }


    const orderedFiches = ficheIds
        .map((id) => fiches.find((f) => f.id === id))
        .filter((f): f is NonNullable<typeof f> => Boolean(f))

    return <ExportView fiches={orderedFiches} />
}