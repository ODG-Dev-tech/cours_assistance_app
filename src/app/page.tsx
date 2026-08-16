import Link from "next/link"

export default async function Home() {

  return (
    <div>
      <p>Bonjour bienvenue dans cours_assistance_app!</p>
      <Link href="/login" className="p-2 bg-emerald-600 text-white inline-block rounded-2xl">Get Started</Link>
    </div>
  )
}
