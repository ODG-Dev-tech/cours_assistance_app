"use client"

import { useState } from 'react'
import Link from 'next/link'

const links = [
    { href: '/fiches', label: 'Mes fiches' },
]

export default function AppNavClient({ initial }: { initial: string }) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="print:hidden sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-line">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 relative">
                <Link href="/fiches" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-r from-brand to-brand2 flex items-center justify-center text-white font-display font-bold text-sm">
                        F+
                    </div>
                    <span className="font-display font-extrabold text-lg text-ink hidden sm:block">
                        Fiches+
                    </span>
                </Link>

                {/* Liens desktop */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-ink/70">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:text-brand transition">
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/newfiche"
                        className="bg-linear-to-r from-brand to-brand2 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition"
                    >
                        + Nouvelle fiche
                    </Link>
                    <Link
                        href="/profile"
                        aria-label="Mon profil"
                        className="w-9 h-9 rounded-full bg-soft text-brand font-display font-bold text-sm flex items-center justify-center hover:bg-brand hover:text-white transition"
                    >
                        {initial}
                    </Link>
                </div>

                {/* Mobile : avatar + hamburger */}
                <div className="flex items-center gap-3 md:hidden">
                    <Link
                        href="/profile"
                        aria-label="Mon profil"
                        className="w-9 h-9 rounded-full bg-soft text-brand font-display font-bold text-sm flex items-center justify-center"
                    >
                        {initial}
                    </Link>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Ouvrir le menu"
                        aria-expanded={menuOpen}
                        className="flex flex-col gap-1.5 p-2"
                    >
                        <span className="w-6 h-0.5 bg-ink" />
                        <span className="w-6 h-0.5 bg-ink" />
                        <span className="w-6 h-0.5 bg-ink" />
                    </button>
                </div>

                {/* Menu mobile */}
                {menuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-line rounded-xl shadow-lg mx-4 mt-2 p-4 flex flex-col gap-1 md:hidden z-10">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="py-3 border-b border-line text-sm font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/newfiche"
                            onClick={() => setMenuOpen(false)}
                            className="bg-linear-to-r from-brand to-brand2 text-white text-sm font-semibold py-3 rounded-lg mt-3 text-center"
                        >
                            + Nouvelle fiche
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}