import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fiches+ — Fiches pédagogiques MENAPLN',
    short_name: 'Fiches+',
    description: 'Générez vos fiches pédagogiques CP1 à CM2 conformes au format API du MENAPLN en quelques minutes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#EEF1FE',
    theme_color: '#3B5FEB',
    lang: 'fr',
    icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
    }
}