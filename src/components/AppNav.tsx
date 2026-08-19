import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import AppNavClient from './AppNavClient'

export default async function AppNav() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

    const initial =
        profile?.full_name?.trim()?.[0]?.toUpperCase() ??
        user.email?.[0]?.toUpperCase() ??
        '?'

    return <AppNavClient initial={initial} />
}