import { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import AboutUs from '@/components/AboutUs'
import PricingSection from '@/components/PricingSection'
import VittoriaPreview from '@/components/VittoriaPreview'
import CoursesPreview from '@/components/CoursesPreview'
import Methodology from '@/components/Methodology'
import Certifications from '@/components/Certifications'
import FAQSection from '@/components/FAQSection'
import BlogSection from '@/components/BlogSection'
import ContactSection from '@/components/ContactSection'
import SchemaOrg from '@/components/SchemaOrg'

export const metadata: Metadata = {
  title: 'ItalicIA - Aprende Italiano con Inteligencia Artificial',
  description:
    'Plataforma argentina de aprendizaje de italiano con IA. Tutor virtual Vittoria disponible 24/7, clases personalizadas con profesora certificada y certificaciones oficiales. Aprende italiano de forma inmersiva.',
  keywords: [
    'aprender italiano',
    'italiano con IA',
    'curso italiano online Argentina',
    'tutor virtual italiano',
    'clases italiano online',
    'certificacion italiano CELI CILS',
    'italiano principiantes',
    'Vittoria bot italiano',
  ],
  alternates: {
    canonical: 'https://italicia.com',
  },
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Curso de Italiano Nivel A1 con IA',
  description:
    'Curso completo de italiano nivel A1 con tutor IA Vittoria disponible 24/7, clases sincrónicas con profesora certificada y material de estudio completo.',
  provider: {
    '@type': 'Organization',
    name: 'ItalicIA',
    url: 'https://italicia.com',
  },
  courseMode: 'online',
  educationalLevel: 'beginner',
  inLanguage: ['es', 'it'],
  teaches: 'Idioma Italiano',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'PT12W',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Plan Base',
      price: '75000',
      priceCurrency: 'ARS',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Plan Premium',
      price: '150000',
      priceCurrency: 'ARS',
      availability: 'https://schema.org/InStock',
    },
  ],
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Alicia',
  jobTitle: 'Profesora de Italiano',
  description:
    'Profesora especializada en italiano, portugués y español con método pedagógico personalizado centrado en la motivación y necesidades únicas de cada estudiante.',
  worksFor: {
    '@type': 'Organization',
    name: 'ItalicIA',
  },
  knowsLanguage: ['es', 'it', 'pt'],
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vittoria - Tutor IA de Italiano',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Telegram',
  description:
    'Tutor virtual de italiano basado en inteligencia artificial. Disponible 24/7 para practicar conversación, corregir errores, enseñar vocabulario y preparar para certificaciones.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'ARS',
  },
  url: 'https://t.me/ItaliciaBot',
}

export default function HomePage() {
  return (
    <>
      <SchemaOrg schema={[courseSchema, personSchema, softwareSchema]} />
      <HeroSection />
      <AboutUs />
      <PricingSection />
      <VittoriaPreview />
      <CoursesPreview />
      <Methodology />
      <Certifications />
      <FAQSection />
      <BlogSection />
      <ContactSection />
    </>
  )
}
