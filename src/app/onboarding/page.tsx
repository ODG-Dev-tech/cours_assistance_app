'use client'
import {useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from 'next/navigation'

export default function CompletCount(){
    const [phone , setPhone] = useState("")
    const [full_name, setFullName]= useState("")
    const [schoolName, setSchoolName] = useState("")
    const [zone, setZone] =useState("")
    const [message, setMessage]= useState("")

    const supabase = createClient()
    const router = useRouter()

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {data : {user}}=await supabase.auth.getUser()
        const {error}=await supabase
        .from('profiles')
        .update({
            phone,
            full_name,
            school_name: schoolName,
            zone
        })
        .eq('id', user?.id)

        if(error){
            setMessage(`Erreur: ${error.message}`)
        }else{
            router.push('/fiches');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">Nom Complet <input type="text" name="fullName" id="fullName" value={full_name} onChange={(e)=> setFullName(e.target.value)} required /></label>
            <label htmlFor="phone">Téléphone <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/></label>
            <label htmlFor="schoolName" >Nom de votre école <input type="text" name="schoolName" id="schoolName" value={schoolName} onChange={e=> setSchoolName(e.target.value)} required /></label>
            <label htmlFor="zone">Zone <input type="text" id="zone" name="zone" value={zone} onChange={e=> setZone(e.target.value)} required /></label>
            <input type="submit" value="Création" />
            {message && <p>{message}</p>}
        </form>    
    )
}