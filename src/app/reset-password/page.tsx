import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import ResetPasswordForm from './ResetPasswordForm'

export const metadata: Metadata = {
    title: 'Nouveau mot de passe',
    robots: { index: false, follow: false },
    }

    export default async function ResetPasswordPage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/forgot-password?error=lien-invalide')

    return <ResetPasswordForm />
}