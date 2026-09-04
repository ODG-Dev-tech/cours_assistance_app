import ContactPage from "./ContactForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact",
    description: "Une question sur Fiches+ ? Écrivez-nous, nous répondons rapidement.",
    };
export default function Contact(){
    return(
        <ContactPage />
    )
}