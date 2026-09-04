import type { Metadata } from "next";
import CompletCount from "./OnBoardingForm";

export const metadata: Metadata = {
    title: "Bienvenue",
    robots: { index: false, follow: false },
};

export default function OnboardingPage() {
    return <CompletCount />;
}