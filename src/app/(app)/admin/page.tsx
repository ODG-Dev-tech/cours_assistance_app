import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { isAdmin, COST_PER_FICHE_FCFA, PROVIDER_FEE_RATES } from '@/utils/admin'
import AdminDashboardClient from './AdminDashboardClient'

export const metadata: Metadata = {
    title: 'Admin',
    robots: { index: false, follow: false },
}

const DAYS_WINDOW = 30

function dateKey(d: Date) {
    return d.toISOString().slice(0, 10)
}

function buildDayRange(days: number) {
    const arr: string[] = []
    const today = new Date()
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        arr.push(dateKey(d))
    }
    return arr
}

export default async function AdminPage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const authorized = await isAdmin(supabase, user.id)
    if (!authorized) redirect('/fiches')

    const admin = createAdminClient()
    const windowStart = new Date()
    windowStart.setDate(windowStart.getDate() - DAYS_WINDOW)
    const windowStartISO = windowStart.toISOString()
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()

    const [
        { count: totalTeachers },
        { count: activeSubscriptions },
        { data: allPayments },
        { count: totalFiches },
        { count: fichesThisMonth },
        { data: signupsWindow },
        { data: paymentsWindow },
        { data: fichesWindow },
        { data: recentSignups },
        { data: recentPayments },
    ] = await Promise.all([
        admin.from('profiles').select('id', { count: 'exact', head: true }),
        admin.from('subscriptions').select('id', { count: 'exact', head: true })
            .eq('status', 'paid').gte('end_date', new Date().toISOString().slice(0, 10)),
        admin.from('subscriptions').select('amount, payment_provider, status, created_at')
            .eq('status', 'paid'),
        admin.from('fiches').select('id', { count: 'exact', head: true }),
        admin.from('fiches').select('id', { count: 'exact', head: true })
            .gte('created_at', monthStart),
        admin.from('profiles').select('created_at').gte('created_at', windowStartISO),
        admin.from('subscriptions').select('amount, created_at').eq('status', 'paid').gte('created_at', windowStartISO),
        admin.from('fiches').select('created_at').gte('created_at', windowStartISO),
        admin.from('profiles').select('id, full_name, school_name, zone, created_at')
            .order('created_at', { ascending: false }).limit(8),
        admin.from('subscriptions').select('teacher_id, amount, payment_provider, created_at')
            .eq('status', 'paid').order('created_at', { ascending: false }).limit(8),
    ])

    // --- Agrégation par jour sur la fenêtre glissante ---
    const days = buildDayRange(DAYS_WINDOW)

    const signupsByDay = Object.fromEntries(days.map(d => [d, 0]))
    signupsWindow?.forEach(s => {
        const k = dateKey(new Date(s.created_at))
        if (k in signupsByDay) signupsByDay[k]++
    })

    const revenueByDay = Object.fromEntries(days.map(d => [d, 0]))
    paymentsWindow?.forEach(p => {
        const k = dateKey(new Date(p.created_at))
        if (k in revenueByDay) revenueByDay[k] += p.amount ?? 0
    })

    const fichesByDay = Object.fromEntries(days.map(d => [d, 0]))
    fichesWindow?.forEach(f => {
        const k = dateKey(new Date(f.created_at))
        if (k in fichesByDay) fichesByDay[k]++
    })

    // Cumulés, pour des courbes de croissance qui montent (sans muter de variable externe)
    const chartData = days.reduce<Array<{
        date: string
        nouveauxUtilisateurs: number
        utilisateursCumules: number
        revenuJour: number
        revenuCumule: number
        fichesJour: number
    }>>((acc, d) => {
        const previous = acc[acc.length - 1]
        const cumUsers = (previous?.utilisateursCumules ?? 0) + signupsByDay[d]
        const cumRevenue = (previous?.revenuCumule ?? 0) + revenueByDay[d]

        acc.push({
            date: d.slice(5), // MM-JJ, plus lisible
            nouveauxUtilisateurs: signupsByDay[d],
            utilisateursCumules: cumUsers,
            revenuJour: revenueByDay[d],
            revenuCumule: cumRevenue,
            fichesJour: fichesByDay[d],
        })

        return acc
    }, [])

    // --- Finances ---
    const totalRevenue = allPayments?.reduce((sum, p) => sum + (p.amount ?? 0), 0) ?? 0
    const revenueThisMonth = allPayments
        ?.filter(p => p.created_at >= monthStart)
        .reduce((sum, p) => sum + (p.amount ?? 0), 0) ?? 0

    const totalFees = allPayments?.reduce((sum, p) => {
        const rate = PROVIDER_FEE_RATES[p.payment_provider ?? 'paydunya'] ?? 0.02
        return sum + (p.amount ?? 0) * rate
    }, 0) ?? 0

    const revenueByProvider = allPayments?.reduce((acc, p) => {
        const key = p.payment_provider ?? 'paydunya'
        acc[key] = (acc[key] ?? 0) + (p.amount ?? 0)
        return acc
    }, {} as Record<string, number>) ?? {}

    const estimatedAiCostThisMonth = (fichesThisMonth ?? 0) * COST_PER_FICHE_FCFA
    const feesThisMonthShare = totalRevenue > 0 ? totalFees * (revenueThisMonth / totalRevenue) : 0
    const estimatedProfitThisMonth = revenueThisMonth - estimatedAiCostThisMonth - feesThisMonthShare

    return (
        <AdminDashboardClient
            kpis={{
                totalTeachers: totalTeachers ?? 0,
                activeSubscriptions: activeSubscriptions ?? 0,
                totalFiches: totalFiches ?? 0,
                fichesThisMonth: fichesThisMonth ?? 0,
            }}
            finances={{
                totalRevenue,
                revenueThisMonth,
                totalFees: Math.round(totalFees),
                estimatedAiCostThisMonth,
                estimatedProfitThisMonth: Math.round(estimatedProfitThisMonth),
                revenueByProvider,
            }}
            chartData={chartData}
            recentSignups={recentSignups ?? []}
            recentPayments={recentPayments ?? []}
        />
    )
}