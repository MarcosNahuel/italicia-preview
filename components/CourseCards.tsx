import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { courses } from '@/lib/catalog'

export default function CourseCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {courses.map(course => (
        <article key={course.id} id={course.id} className="scroll-mt-24 flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
          <span className="self-start rounded-full bg-accent-50 px-4 py-1.5 text-sm font-semibold text-accent-700">{course.level}</span>
          <h3 className="mt-5 mb-3 text-2xl font-bold text-gray-900">{course.title}</h3>
          <p className="font-medium text-accent-700 mb-3">{course.introduction}</p>
          <p className="text-gray-600 leading-relaxed mb-5">{course.description}</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">{course.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
          <p className="flex items-start gap-2 text-sm text-gray-600 mb-6"><BookOpen className="h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />{course.materials}</p>
          <Link href="/#contacto" className="btn-primary mt-auto inline-flex items-center justify-center gap-2 text-center">Consultar horarios y cupos<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
        </article>
      ))}
    </div>
  )
}
