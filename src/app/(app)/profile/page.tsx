import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ProfileForm from './profileForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Mon profil",
};
export default async function ProfilePage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
    if(!profile){
        redirect("/onboarding")
    }
    return (
        <div>
        <ProfileForm initialProfile={profile} />
        </div>
    )
}