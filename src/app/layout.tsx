import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Panger Lkr — Cybersecurity Professional & Entrepreneur',
  description:
    'Hi, I’m Panger Lkr — a cybersecurity professional, entrepreneur, and builder from Nagaland, India. Founder of NEXUSCIPHERGUARD India.',
  keywords: [
    'Panger Lkr',
    'NEXUSCIPHERGUARD',
    'Cybersecurity Professional',
    'Offensive Security',
    'Security Awareness India',
    'Nagaland Tech',
  ],
  authors: [{ name: 'Pangerkumzuk Longkumer', url: 'https://pangerlkr.link' }],
  openGraph: {
    title: 'Panger Lkr — Cybersecurity Professional & Entrepreneur',
    description: 'Founder of NEXUSCIPHERGUARD India. Protecting digital trust through awareness and implementation.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panger Lkr — Cybersecurity Professional & Entrepreneur',
    description: 'Founder of NEXUSCIPHERGUARD India. Protecting digital trust through awareness and implementation.',
  },
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
