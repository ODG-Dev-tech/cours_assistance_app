import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')

  // On n'accepte que la récupération de mot de passe, et la destination est fixe :
  // pas de paramètre "next", donc aucune redirection ouverte possible.

    if (token_hash && type === 'recovery') {
        const cookieStore = await cookies()
        const supabase = createClient(cookieStore)

        const { error } = await supabase.auth.verifyOtp({ type: 'recovery', token_hash })

        if (!error) {
        return NextResponse.redirect(new URL('/reset-password', request.url))
        }
    }

    return NextResponse.redirect(new URL('/forgot-password?error=lien-invalide', request.url))
}