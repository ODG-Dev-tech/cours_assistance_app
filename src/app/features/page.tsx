import Features from "./FeaturesClient";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Fonctionnalités",
    description:
    "Génération de fiches pédagogiques par IA conformes au format API du MENAPLN, révision par chat, export PDF et fusion multi-fiches.",
};
export default function FeaturePage(){
    return (
        <Features />
    )
}