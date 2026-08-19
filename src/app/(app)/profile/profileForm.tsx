'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

type Profile = {
    id: string
    full_name: string | null
    phone: string | null
    school_name: string | null
    zone: string | null
}

export default function ProfileForm({ initialProfile }: { initialProfile: Profile }) {

    const [fullName, setFullName] = useState(initialProfile.full_name || '')
    const [phone, setPhone] = useState(initialProfile.phone || '')
    const [schoolName, setSchoolName] = useState(initialProfile.school_name || '')
    const [zone, setZone] = useState(initialProfile.zone || '')
    const [message, setMessage] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: fullName,
                phone: phone,
                school_name: schoolName,
                zone: zone,
            })
            .eq('id', initialProfile?.id)

        if (error) {
            setMessage(`Erreur : ${error.message}`)
        } else {
            setMessage('Profil mis à jour !')
            setIsEditing(false)
        }
    }

    const isError = message.startsWith('Erreur')
    const initial = fullName?.trim()?.[0]?.toUpperCase() ?? '?'

    // ----- Vue lecture -----
    if (!isEditing) {
        return (
            <div className="max-w-lg mx-auto px-6 py-10">
                <div className="bg-white border border-line rounded-2xl p-8">
                    <div className="flex items-center flex-col gap-4 sm:flex-row sm:justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-linear-to-r from-brand to-brand2 flex items-center justify-center text-white font-display font-bold text-xl">
                                {initial}
                            </div>
                            <div>
                                <p className="font-display font-extrabold text-lg text-ink">
                                    {fullName || 'Nom non renseigné'}
                                </p>
                                <p className="text-sm text-muted">{schoolName || 'École non renseignée'}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="border border-brand text-brand text-sm font-semibold px-4 py-2 rounded-lg hover:bg-soft transition"
                        >
                            Modifier
                        </button>
                    </div>

                    <dl className="flex flex-col gap-4">
                        <div className="flex justify-between items-center border-b border-line pb-3">
                            <dt className="text-sm text-muted">Téléphone</dt>
                            <dd className="text-sm font-medium text-ink">{phone || '—'}</dd>
                        </div>
                        <div className="flex justify-between items-center border-b border-line pb-3">
                            <dt className="text-sm text-muted">École</dt>
                            <dd className="text-sm font-medium text-ink">{schoolName || '—'}</dd>
                        </div>
                        <div className="flex justify-between items-center">
                            <dt className="text-sm text-muted">Zone</dt>
                            <dd className="text-sm font-medium text-ink">{zone || '—'}</dd>
                        </div>
                    </dl>

                    {message && (
                        <p className={`mt-6 text-sm rounded-lg px-4 py-3 text-center border ${
                            isError
                                ? 'text-rose-600 bg-rose-50 border-rose-100'
                                : 'text-emerald-700 bg-emerald-50 border-emerald-100'
                        }`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        )
    }

    // ----- Vue édition -----
    return (
        <div className="max-w-lg mx-auto px-6 py-10">
            <form onSubmit={handleSubmit} className="bg-white border border-line rounded-2xl p-8 flex flex-col gap-5">
                <h2 className="font-display font-extrabold text-lg text-ink mb-1">
                    Modifier mon profil
                </h2>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-sm font-medium text-ink">
                        Nom complet
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-medium text-ink">
                        Téléphone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="schoolName" className="text-sm font-medium text-ink">
                        Nom de votre école
                    </label>
                    <input
                        type="text"
                        id="schoolName"
                        name="schoolName"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        className="border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="zone" className="text-sm font-medium text-ink">
                        Zone
                    </label>
                    <input
                        type="text"
                        id="zone"
                        name="zone"
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                        className="border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                    />
                </div>

                <div className="flex items-center gap-3 mt-2">
                    <input
                        type="submit"
                        value="Enregistrer"
                        className="flex-1 bg-linear-to-r from-brand to-brand2 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition cursor-pointer"
                    />
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 border border-line text-ink font-medium py-3 rounded-lg hover:bg-soft transition"
                    >
                        Annuler
                    </button>
                </div>

                {message && (
                    <p className={`text-sm rounded-lg px-4 py-3 text-center border ${
                        isError
                            ? 'text-rose-600 bg-rose-50 border-rose-100'
                            : 'text-emerald-700 bg-emerald-50 border-emerald-100'
                    }`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    )
}