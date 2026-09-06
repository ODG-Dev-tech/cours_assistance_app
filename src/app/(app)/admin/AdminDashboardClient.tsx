'use client'

import {
    ResponsiveContainer,
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts'

type ChartPoint = {
    date: string
    nouveauxUtilisateurs: number
    utilisateursCumules: number
    revenuJour: number
    revenuCumule: number
    fichesJour: number
}

type Props = {
    kpis: {
        totalTeachers: number
        activeSubscriptions: number
        totalFiches: number
        fichesThisMonth: number
    }
    finances: {
        totalRevenue: number
        revenueThisMonth: number
        totalFees: number
        estimatedAiCostThisMonth: number
        estimatedProfitThisMonth: number
        revenueByProvider: Record<string, number>
    }
    chartData: ChartPoint[]
    recentSignups: { id: string; full_name: string; school_name: string | null; created_at: string }[]
    recentPayments: { teacher_id: string; amount: number; payment_provider: string; created_at: string }[]
}

function fcfa(n: number) {
    return `${Math.round(n).toLocaleString('fr-FR')} FCFA`
}

type TooltipPayloadItem = {
    dataKey: string
    name: string
    value: number
    color: string
}

type CustomTooltipProps = {
    active?: boolean
    payload?: TooltipPayloadItem[]
    label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white border border-line rounded-lg shadow-lg px-3 py-2 text-xs">
            <p className="font-semibold text-ink mb-1">{label}</p>
            {payload.map((p) => (
                <p key={p.dataKey} style={{ color: p.color }}>
                    {p.name} : <span className="font-semibold">{p.dataKey.toLowerCase().includes('revenu') ? fcfa(p.value) : p.value}</span>
                </p>
            ))}
        </div>
    )
}

export default function AdminDashboardClient({ kpis, finances, chartData, recentSignups, recentPayments }: Props) {
    const kpiCards = [
        { label: 'Enseignants inscrits', value: kpis.totalTeachers },
        { label: 'Abonnés actifs', value: kpis.activeSubscriptions },
        { label: 'Fiches générées (total)', value: kpis.totalFiches },
        { label: 'Fiches ce mois-ci', value: kpis.fichesThisMonth },
    ]

    const financeCards = [
        { label: 'Revenu total', value: fcfa(finances.totalRevenue), accent: false },
        { label: 'Revenu ce mois-ci', value: fcfa(finances.revenueThisMonth), accent: true },
        { label: 'Frais de paiement (total)', value: fcfa(finances.totalFees), accent: false },
        { label: 'Coût IA estimé (ce mois)', value: fcfa(finances.estimatedAiCostThisMonth), accent: false },
        { label: 'Bénéfice estimé (ce mois)', value: fcfa(finances.estimatedProfitThisMonth), accent: true },
    ]

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="font-display font-extrabold text-2xl text-ink mb-1">Tableau de bord admin</h1>
            <p className="text-sm text-muted mb-8">Vue d&apos;ensemble de Fiches+ — visible uniquement par toi.</p>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {kpiCards.map((k) => (
                    <div key={k.label} className="bg-white border border-line rounded-xl p-4">
                        <p className="text-xs text-muted mb-1">{k.label}</p>
                        <p className="text-2xl font-extrabold text-ink">{k.value}</p>
                    </div>
                ))}
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                {/* Croissance utilisateurs */}
                <div className="bg-white border border-line rounded-xl p-5">
                    <h2 className="font-display font-bold text-sm text-ink mb-4">Croissance des utilisateurs (30 jours)</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E9F5" />
                            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} />
                            <YAxis tick={{ fontSize: 11, fill: '#64748B' }} allowDecimals={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="utilisateursCumules"
                                name="Utilisateurs cumulés"
                                stroke="#3B5FEB"
                                strokeWidth={2.5}
                                dot={false}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Croissance revenus */}
                <div className="bg-white border border-line rounded-xl p-5">
                    <h2 className="font-display font-bold text-sm text-ink mb-4">Évolution des revenus (30 jours)</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E9F5" />
                            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} />
                            <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="revenuCumule"
                                name="Revenu cumulé"
                                stroke="#6C4CE0"
                                strokeWidth={2.5}
                                dot={false}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Usage quotidien (fiches générées) */}
            <div className="bg-white border border-line rounded-xl p-5 mb-8">
                <h2 className="font-display font-bold text-sm text-ink mb-4">Fiches générées par jour (30 jours)</h2>
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E9F5" />
                        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#64748B' }} allowDecimals={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="fichesJour" name="Fiches créées" fill="#3B5FEB" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Finances détaillées */}
            <div className="bg-white border border-line rounded-xl p-5 mb-8">
                <h2 className="font-display font-bold text-base text-ink mb-4">Finances</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                    {financeCards.map((f) => (
                        <div key={f.label}>
                            <p className="text-xs text-muted mb-1">{f.label}</p>
                            <p className={`text-lg font-bold ${f.accent ? 'text-brand' : 'text-ink'}`}>{f.value}</p>
                        </div>
                    ))}
                </div>
                {Object.keys(finances.revenueByProvider).length > 0 && (
                    <div className="border-t border-line pt-4 flex flex-wrap gap-6 text-sm">
                        {Object.entries(finances.revenueByProvider).map(([provider, amount]) => (
                            <p key={provider}>
                                <span className="text-muted capitalize">{provider} : </span>
                                <span className="font-semibold text-ink">{fcfa(amount)}</span>
                            </p>
                        ))}
                    </div>
                )}
                <p className="text-[11px] text-slate-400 mt-3">
                    Coût IA estimé sur les créations de fiches uniquement. Répartition des frais de paiement proportionnelle au revenu du mois.
                </p>
            </div>

            {/* Listes récentes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-line rounded-xl p-5">
                    <h2 className="font-display font-bold text-sm text-ink mb-4">Derniers inscrits</h2>
                    <div className="flex flex-col gap-2">
                        {recentSignups.map((s) => (
                            <div key={s.id} className="flex justify-between text-sm border-b border-line pb-2 last:border-0">
                                <span className="text-ink truncate">{s.full_name} — {s.school_name ?? '—'}</span>
                                <span className="text-muted shrink-0 ml-2">{new Date(s.created_at).toLocaleDateString('fr-FR')}</span>
                            </div>
                        ))}
                        {!recentSignups.length && <p className="text-sm text-muted">Aucun inscrit pour l&apos;instant.</p>}
                    </div>
                </div>

                <div className="bg-white border border-line rounded-xl p-5">
                    <h2 className="font-display font-bold text-sm text-ink mb-4">Derniers paiements</h2>
                    <div className="flex flex-col gap-2">
                        {recentPayments.map((p, i) => (
                            <div key={i} className="flex justify-between text-sm border-b border-line pb-2 last:border-0">
                                <span className="text-ink">{fcfa(p.amount)} — <span className="capitalize">{p.payment_provider}</span></span>
                                <span className="text-muted">{new Date(p.created_at).toLocaleDateString('fr-FR')}</span>
                            </div>
                        ))}
                        {!recentPayments.length && <p className="text-sm text-muted">Aucun paiement pour l&apos;instant.</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}