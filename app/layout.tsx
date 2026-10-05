import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import SchemaOrg from '@/components/SchemaOrg'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://italicia.com'),
  title: {
    default: 'ItalicIA - Aprende Italiano con Inteligencia Artificial',
    template: '%s | ItalicIA',
  },
  description: 'Aprendé italiano con Alicia: cursos A1, A2, conversación y materiales de Italicia. Vittoria en WhatsApp con acceso pago; consultá precio y activación.',
  keywords: [
    'aprender italiano',
    'italiano con IA',
    'curso italiano online',
    'tutor virtual italiano',
    'italiano Argentina',
    'clases italiano',
    'certificacion italiano',
    'Vittoria bot',
    'italiano A1',
    'italiano principiantes',
  ],
  authors: [{ name: 'ItalicIA', url: 'https://italicia.com' }],
  creator: 'ItalicIA',
  publisher: 'ItalicIA',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://italicia.com',
    siteName: 'ItalicIA',
    title: 'ItalicIA - Aprende Italiano con Inteligencia Artificial',
    description: 'Cursos A1, A2 y conversación con Alicia. Manuales, lecturas y Vittoria en WhatsApp con acceso pago.',
    images: [
      {
        url: '/logo_italicia.png',
        width: 1200,
        height: 630,
        alt: 'ItalicIA - Aprende Italiano con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ItalicIA - Aprende Italiano con IA',
    description: 'Italiano con Alicia y Vittoria en WhatsApp con acceso pago',
    images: ['/logo_italicia.png'],
  },
  verification: {
    google: 'tu-codigo-verificacion',
  },
  alternates: {
    canonical: 'https://italicia.com',
  },
}

// Schema.org Organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ItalicIA',
  url: 'https://italicia.com',
  logo: 'https://italicia.com/logo_italicia.png',
  description: 'Plataforma innovadora para aprender italiano que combina IA personalizada con enseñanza tradicional',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AR',
    addressRegion: 'Mendoza',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'italicia.edu@gmail.com',
    telephone: '+54-9-261-544-9532',
    contactType: 'customer service',
    availableLanguage: ['Spanish', 'Italian'],
  },
  sameAs: [
    'https://www.instagram.com/parla.con.italicia/',
    'https://facebook.com/profile.php?id=61555614825852',
    'https://wa.me/5492615449532',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo_italicia.svg" type="image/svg+xml" />
        <SchemaOrg schema={organizationSchema} />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
