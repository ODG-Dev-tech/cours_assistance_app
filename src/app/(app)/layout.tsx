import AppNav from '@/components/AppNav'
import { Metadata } from 'next'

export const metadata: Metadata = {
    robots: { index: false, follow: false },
};
export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppNav />
            <main>{children}</main>
        </>
    )
}