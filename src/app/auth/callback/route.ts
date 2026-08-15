import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user?.id)
        .single()
      if (profile?.full_name) {
        return NextResponse.redirect(new URL('/fiches', request.url))
      } else {
        return NextResponse.redirect(new URL('/onboarding', request.url))
      }
    }
  }

  return NextResponse.redirect(new URL('/login', request.url))
}