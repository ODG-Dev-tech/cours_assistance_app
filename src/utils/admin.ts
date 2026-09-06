import { SupabaseClient } from '@supabase/supabase-js'


export const COST_PER_FICHE_FCFA = 9 // recharge en bloc, cas optimiste
export const PROVIDER_FEE_RATES: Record<string, number> = {
    paydunya: 0.02,
    chariow: 0.15,
}

export async function isAdmin(supabase: SupabaseClient, userId: string) {
    const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

    return data?.role === 'admin'
}