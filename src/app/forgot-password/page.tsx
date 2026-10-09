import type { Metadata } from 'next'
import ForgotPasswordForm from './ForgotPasswordForm'

export const metadata: Metadata = {
    title: 'Mot de passe oublié',
    robots: { index: false, follow: false },
    }

    export default async function ForgotPasswordPage({
    searchParams,
    }: {
    searchParams: Promise<{ error?: string }>
    }) {
    const { error } = await searchParams
    return <ForgotPasswordForm invalidLink={error === 'lien-invalide'} />
}