import type { Metadata } from 'next'
import Link from 'next/link'
import CourseCards from '@/components/CourseCards'
import SchemaOrg from '@/components/SchemaOrg'
import { courses } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Cursos de italiano A1, A2 y conversación',
  description: 'Aprendé italiano con Alicia en Italicia. Cursos A1 y A2 y conversación guiada, con materiales propios y situaciones de la vida cotidiana.',
  alternates: { canonical: 'https://italicia.com/cursos/' },
}
const coursesSchema = {
  '@context': 'https://schema.org', '@type': 'ItemList',
  itemListElement: courses.map((course, index) => ({
    '@type': 'ListItem', position: index + 1,
    item: { '@type': 'Course', name: course.title, description: course.description,
      educationalLevel: course.level, inLanguage: 'it',
      provider: { '@type': 'Organization', name: 'Italicia', url: 'https://italicia.com' },
      url: 'https://italicia.com/cursos/#' + course.id },
  })),
}
export default function CursosPage() {
  return (
    <>
      <SchemaOrg schema={coursesSchema} />
      <section className="pt-28 pb-16 bg-gradient-to-b from-primary-900 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-accent-300 font-semibold mb-4">Aprender, practicar y animarte a hablar</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cursos de italiano con Alicia</h1>
          <p className="text-xl text-gray-200 leading-relaxed">A1, A2 y conversación: tres propuestas para acompañarte en tu aprendizaje, con situaciones cotidianas, cultura italiana y materiales de Italicia.</p>
        </div>
      </section>
      <section className="py-16 bg-gray-50" aria-label="Propuestas de cursos"><div className="container mx-auto px-4"><h2 className="sr-only">Propuestas de cursos</h2><CourseCards /></div></section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-5">¿Cuál es el mejor punto de partida para vos?</h2>
          <p className="text-lg text-gray-600 mb-8">Contanos qué sabés de italiano y qué te gustaría lograr. Alicia te orienta y te informa los horarios, cupos, modalidad y aranceles vigentes.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/#contacto" className="btn-primary inline-flex justify-center">Consultar con Alicia</Link>
            <Link href="/materiales/" className="inline-flex justify-center px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50">Ver los materiales</Link>
          </div>
        </div>
      </section>
    </>
  )
}
