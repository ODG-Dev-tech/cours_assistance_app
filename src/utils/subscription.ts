import { SupabaseClient } from '@supabase/supabase-js'

export const FREE_FICHES_LIMIT = 2
export const MAX_FICHES_PER_MONTH = 200

/**
 * Vérifie si l'enseignant a un abonnement payé et encore valide aujourd'hui.
 * Retourne aussi les dates du cycle actif pour le comptage des fiches.
 */
export async function hasActiveSubscription(supabase: SupabaseClient, userId: string) {
    const today = new Date().toISOString().slice(0, 10)

    const { data } = await supabase
        .from('subscriptions')
        .select('id, start_date, end_date')
        .eq('teacher_id', userId)
        .eq('status', 'paid')
        .gte('end_date', today)
        .limit(1)
        .maybeSingle()

    return data ?? null
}

/**
 * Compte les fiches créées par l'enseignant depuis le début du cycle d'abonnement actif.
 */
async function countFichesInCurrentCycle(
    supabase: SupabaseClient,
    userId: string,
    cycleStartDate: string
) {
    const { count } = await supabase
        .from('fiches')
        .select('id', { count: 'exact', head: true })
        .eq('teacher_id', userId)
        .gte('created_at', cycleStartDate)

    return count ?? 0
}

/**
 * Détermine si l'enseignant peut créer une nouvelle fiche.
 */
export async function canCreateFiche(supabase: SupabaseClient, userId: string) {
    const activeSubscription = await hasActiveSubscription(supabase, userId)

    if (activeSubscription) {
        const fichesUsed = await countFichesInCurrentCycle(
            supabase,
            userId,
            activeSubscription.start_date
        )

        return {
            allowed: fichesUsed < MAX_FICHES_PER_MONTH,
            isSubscribed: true,
            fichesUsed,
            limit: MAX_FICHES_PER_MONTH,
        }
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
        limit: FREE_FICHES_LIMIT,
    }
}