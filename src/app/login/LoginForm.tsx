'use client'
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"


export default function LoginFormPage(){
    const [email, setEmail] = useState("");
    const [feedbackMessage, setFeedbackMessage]= useState("");

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const {error } = await supabase.auth.signInWithOtp( {email , options: { emailRedirectTo: "http://localhost:3000/auth/callback"} });

        if(error){
            setFeedbackMessage(`Erreur: ${error.message}`)
        }else{
            setFeedbackMessage("Aller clicker le lien dans votre boite mail pour continuer!");
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: <input type="email" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} required /></label>
                <input type="submit" value="Envoyer" />
                <p>{feedbackMessage}</p>
            </form>
        </div>
    )
}