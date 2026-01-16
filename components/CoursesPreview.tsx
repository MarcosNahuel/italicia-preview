'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Star, ArrowRight, BookOpen, Clock, Users } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const courses = [
  {
    level: 'A1-A2',
    title: 'Italiano para Principiantes',
    description:
      'Comienza tu viaje en italiano con vocabulario esencial, gramática básica y conversaciones sencillas.',
    image:
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    rating: 4.9,
    reviews: 324,
    duration: '12 semanas',
    feature: 'Tutor IA 24/7',
    available: true,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    level: 'B1-B2',
    title: 'Italiano Intermedio',
    description:
      'Expande tus habilidades con gramática compleja, vocabulario diverso y matices culturales.',
    image:
      'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    rating: 4.8,
    reviews: 256,
    duration: '16 semanas',
    feature: 'Tutor IA 24/7',
    available: false,
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    level: 'C1-C2',
    title: 'Italiano Avanzado',
    description:
      'Domina el idioma con expresiones sofisticadas, análisis de literatura y comunicación profesional.',
    image:
      'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    rating: 4.9,
    reviews: 189,
    duration: '20 semanas',
    feature: 'Tutor IA 24/7',
    available: false,
    gradient: 'from-purple-500 to-pink-600',
  },
]

export default function CoursesPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="cursos" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary-100/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Cursos disponibles
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tu camino al{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-500 to-emerald-500">
              italiano
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Desde principiante hasta avanzado, nuestros cursos integrales te llevarán a través de
            cada etapa del dominio del idioma italiano.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <AnimatedSection
              key={index}
              animation="fade-up"
              delay={index * 100}
            >
              <div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative h-full"
              >
                {/* Card glow effect */}
                <div
                  className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-b ${course.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
                />
                <div
                  className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-b ${course.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Level badge */}
                    <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full bg-gradient-to-r ${course.gradient} text-white text-sm font-bold shadow-lg`}>
                      Nivel {course.level}
                    </div>

                    {/* Coming soon overlay */}
                    {!course.available && (
                      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <span className="inline-block px-6 py-2 bg-white/10 border border-white/20 rounded-full text-white font-bold text-lg backdrop-blur-sm">
                            PRÓXIMAMENTE
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Bottom info */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-white">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm font-medium ml-1">{course.rating}</span>
                      </div>
                      <span className="text-white/80 text-sm">
                        ({course.reviews} reseñas)
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-accent-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{course.feature}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href="/cursos/"
                      className={`w-full py-3.5 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                        course.available
                          ? `bg-gradient-to-r ${course.gradient} text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5`
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {course.available ? (
                        <>
                          Ver Detalles
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      ) : (
                        'Próximamente'
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection animation="fade-up" delay={400} className="text-center mt-12">
          <Link
            href="/cursos/"
            className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-accent-400 hover:text-accent-600 hover:bg-accent-50 transition-all duration-300"
          >
            Ver todos los cursos
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
