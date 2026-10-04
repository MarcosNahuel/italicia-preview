import { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import AboutUs from '@/components/AboutUs'
import PricingSection from '@/components/PricingSection'
import VittoriaPreview from '@/components/VittoriaPreview'
import CoursesPreview from '@/components/CoursesPreview'
import MaterialsPreview from '@/components/MaterialsPreview'
import Methodology from '@/components/Methodology'
import Certifications from '@/components/Certifications'
import FAQSection from '@/components/FAQSection'
import BlogSection from '@/components/BlogSection'
import ContactSection from '@/components/ContactSection'
import SchemaOrg from '@/components/SchemaOrg'
import { courses } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Italicia - Cursos de italiano y materiales con Alicia',
  description:
    'Aprendé italiano con Alicia: cursos A1, A2 y conversación. Conocé los manuales, las lecturas y los recursos de Italicia para seguir practicando entre clases.',
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
  '@type': 'ItemList',
  itemListElement: courses.map((course, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Course',
      name: `${course.level}: ${course.title}`,
      description: course.description,
      url: `https://italicia.com/cursos/#${course.id}`,
      provider: { '@type': 'Organization', name: 'Italicia', url: 'https://italicia.com' },
      inLanguage: ['es', 'it'],
    },
  })),
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
      <CoursesPreview />
      <MaterialsPreview />
      <AboutUs />
      <PricingSection />
      <VittoriaPreview />
      <Methodology />
      <Certifications />
      <FAQSection />
      <BlogSection />
      <ContactSection />
    </>
  )
}
