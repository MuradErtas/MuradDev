import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MuradDev - Portfolio',
  description: 'Personal projects and CV',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

