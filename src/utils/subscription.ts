import { SupabaseClient } from '@supabase/supabase-js'

export const FREE_FICHES_LIMIT = 2

/**
 * Vérifie si l'enseignant a un abonnement payé et encore valide aujourd'hui.
 */
export async function hasActiveSubscription(supabase: SupabaseClient, userId: string) {
    const today = new Date().toISOString().slice(0, 10)

    const { data } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('teacher_id', userId)
        .eq('status', 'paid')
        .gte('end_date', today)
        .limit(1)
        .maybeSingle()

    return !!data
}

/**
 * Détermine si l'enseignant peut créer une nouvelle fiche *
 */
export async function canCreateFiche(supabase: SupabaseClient, userId: string) {
    const isSubscribed = await hasActiveSubscription(supabase, userId)
    if (isSubscribed) {
        return { allowed: true, isSubscribed: true, fichesUsed: null }
    }

    const { count } = await supabase
        .from('fiches')
        .select('id', { count: 'exact', head: true })
        .eq('teacher_id', userId)

    const fichesUsed = count ?? 0

    return {
        allowed: fichesUsed < FREE_FICHES_LIMIT,
        isSubscribed: false,
        fichesUsed,
    }
}