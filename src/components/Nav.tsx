"use client";

import { useState } from "react";
import Link from "next/link";

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5 relative">
        <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-r from-brand to-brand2 flex items-center justify-center text-white font-display font-bold text-sm">
            F+
            </div>
            <span className="font-display font-extrabold text-lg text-ink">Fiches+</span>
        </Link>

        {/* Liens desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/70">
            <Link href="#fonctionnalites" className="hover:text-brand transition">
            Fonctionnalités
            </Link>
            <Link href="#a-propos" className="hover:text-brand transition">
            À propos
            </Link>
            <Link href="#contact" className="hover:text-brand transition">
            Contact
            </Link>
        </div>

        <Link
            href="/login"
            className="hidden md:block border border-brand text-brand text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-soft transition"
        >
            Se connecter
        </Link>

        {/* Bouton hamburger — mobile uniquement */}
        <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            className="md:hidden flex flex-col gap-1.5 p-2"
        >
            <span className="w-6 h-0.5 bg-ink" />
            <span className="w-6 h-0.5 bg-ink" />
            <span className="w-6 h-0.5 bg-ink" />
        </button>

        {/* Menu mobile */}
        {menuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-line rounded-xl shadow-lg mx-4 mt-2 p-4 flex flex-col gap-1 md:hidden z-10">
            <Link
                href="#fonctionnalites"
                onClick={() => setMenuOpen(false)}
                className="py-3 border-b border-line text-sm font-medium"
            >
                Fonctionnalités
            </Link>
            <Link
                href="#a-propos"
                onClick={() => setMenuOpen(false)}
                className="py-3 border-b border-line text-sm font-medium"
            >
                À propos
            </Link>
            <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="py-3 border-b border-line text-sm font-medium"
            >
                Contact
            </Link>
            <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-gradient-to-r from-brand to-brand2 text-white text-sm font-semibold py-3 rounded-lg mt-3 text-center"
            >
                Se connecter
            </Link>
            </div>
        )}
        </nav>
    );
}