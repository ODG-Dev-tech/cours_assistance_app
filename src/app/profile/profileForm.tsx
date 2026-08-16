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
    if (!isEditing) {
    return (
        <div>
        <p>Nom complet : {fullName}</p>
        <p>Téléphone : {phone}</p>
        <p>École : {schoolName}</p>
        <p>Zone : {zone}</p>
        {message && <p>{message}</p>}
        <button onClick={() => setIsEditing(true)}>Modifier</button>
        </div>
    )

    }
    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor='fullName'>Nom complet : <input type='text' id='fullName' name='fullName' value={fullName} onChange={(e) => setFullName(e.target.value)} /></label>
        <label htmlFor='phone'>Téléphone : <input type='tel' id='phone' name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
        <label htmlFor="schoolName">Nom de votre école <input type="text" name='schoolName' id='schoolName' value={schoolName} onChange={e=>setSchoolName(e.target.value)} /></label>
        <label htmlFor="zone">Zone <input type="text" id='zone' name='zone' value={zone} onChange={e=> setZone(e.target.value)} /></label>
        <input type="submit" value="Enregistrer" />
        <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
        </form>
    )
}