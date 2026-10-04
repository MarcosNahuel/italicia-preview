import Link from 'next/link'
import CourseCards from './CourseCards'

export default function CoursesPreview() {
  return (
    <section id="cursos" className="scroll-mt-20 py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-accent-700 font-semibold mb-4">Cursos de Italicia</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">Encontrá tu lugar en el italiano</h2>
          <p className="text-xl text-gray-600">Empezá desde cero, seguí avanzando o sumate a conversar. Alicia te acompaña con clases y materiales pensados para usar el idioma.</p>
        </div>
        <CourseCards />
        <p className="text-center mt-10"><Link href="/cursos/" className="font-semibold text-accent-700 hover:underline">Conocer los cursos</Link></p>
      </div>
    </section>
  )
}
