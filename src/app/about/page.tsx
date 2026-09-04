import AboutPage from "./About";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "À propos",
    description:
        "Fiches+ est né d'une enquête terrain auprès d'enseignants du Burkina Faso : la préparation des fiches pédagogiques est le poste de temps le plus lourd de leur métier.",
};
export default function About(){
    return (
        <AboutPage />
    )
}