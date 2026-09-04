import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginFormPage from "./LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Connexion",
    description: "Connectez-vous à Fiches+ pour créer vos fiches pédagogiques.",
};
export default async function Login(){
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
        redirect('/fiches')
    }
    
    return(
            <LoginFormPage />
        )
}