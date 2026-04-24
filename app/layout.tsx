import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// ── Replace this with your actual deployed URL ──────────────────────────────
const SITE_URL = 'https://muradertas.dev'
// ────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  title: 'Murad Ertaskin, Software Developer',
  description:
    'Software developer specialising in data engineering and full-stack development. Portfolio of projects, experience, and contact.',
  metadataBase: new URL(SITE_URL),

  // ── Open Graph (LinkedIn, Facebook, iMessage, Discord …) ──────────────────
  openGraph: {
    type:        'website',
    url:         SITE_URL,
    siteName:    'Murad Ertaskin',
    title:       'Murad Ertaskin, Software Developer',
    description:
      'Software developer specialising in data engineering and full-stack development. Portfolio of projects, experience, and contact.',
    // For the best result on LinkedIn etc., create a 1200 × 630 px banner and
    // save it as /public/og-image.png. Until then, the avatar works as a fallback.
    images: [
      {
        url:    '/og-image.png',   // create this; ideal 1200 × 630 px
        width:  1200,
        height: 630,
        alt:    'Murad Ertaskin, Software Developer',
      },
    ],
  },

  // ── Twitter / X card ──────────────────────────────────────────────────────
  twitter: {
    card:        'summary_large_image',
    title:       'Murad Ertaskin, Software Developer',
    description:
      'Software developer specialising in data engineering and full-stack development.',
    images:      ['/og-image.png'],
  },

  // ── Canonical URL ─────────────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Favicons ──────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'manifest', url: '/site.webmanifest' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Anti-FOUC: runs before React hydrates so the correct dark/light class
          is applied on the very first paint, with no flash of wrong theme.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d))document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
