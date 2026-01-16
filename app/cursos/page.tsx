import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, Users, BookOpen, Award, Check, Star } from 'lucide-react'
import SchemaOrg from '@/components/SchemaOrg'

export const metadata: Metadata = {
  title: 'Cursos de Italiano Online - Niveles A1 a C2',
  description:
    'Cursos de italiano online con IA y profesora certificada. Desde principiante (A1) hasta avanzado (C2). Clases sincrónicas, tutor virtual 24/7 y certificaciones oficiales.',
  keywords: [
    'curso italiano online',
    'clases italiano',
    'italiano A1',
    'italiano principiantes',
    'aprender italiano',
    'curso italiano Argentina',
  ],
  alternates: {
    canonical: 'https://italicia.com/cursos/',
  },
}

const coursesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'Course',
      position: 1,
      name: 'Italiano Nivel A1-A2 (Principiante)',
      description: 'Curso para principiantes absolutos. Aprende vocabulario esencial, gramática básica y comunicación cotidiana.',
      provider: { '@type': 'Organization', name: 'ItalicIA' },
      educationalLevel: 'beginner',
      courseMode: 'online',
      offers: { '@type': 'Offer', price: '75000', priceCurrency: 'ARS' },
    },
    {
      '@type': 'Course',
      position: 2,
      name: 'Italiano Nivel B1-B2 (Intermedio)',
      description: 'Curso intermedio para expandir vocabulario, gramática compleja y matices culturales.',
      provider: { '@type': 'Organization', name: 'ItalicIA' },
      educationalLevel: 'intermediate',
      courseMode: 'online',
    },
    {
      '@type': 'Course',
      position: 3,
      name: 'Italiano Nivel C1-C2 (Avanzado)',
      description: 'Curso avanzado con literatura, comunicación profesional y preparación para certificaciones.',
      provider: { '@type': 'Organization', name: 'ItalicIA' },
      educationalLevel: 'advanced',
      courseMode: 'online',
    },
  ],
}

const levels = [
  {
    level: 'A1-A2',
    title: 'Italiano para Principiantes',
    subtitle: 'Desde cero hasta comunicación básica',
    available: true,
    duration: '12 semanas',
    hours: '36 horas',
    students: '324',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80',
    description: 'Curso diseñado para principiantes absolutos. Aprenderás las bases fundamentales del italiano para comunicarte en situaciones cotidianas.',
    topics: [
      'Saludos y presentaciones',
      'Números, fechas y hora',
      'Vocabulario básico cotidiano',
      'Gramática fundamental',
      'Verbos regulares en presente',
      'Artículos y sustantivos',
      'Adjetivos y concordancia',
      'Preguntas básicas',
    ],
    objectives: [
      'Comunicarse en situaciones cotidianas simples',
      'Comprender frases y expresiones básicas',
      'Presentarse y hacer preguntas básicas',
      'Escribir textos cortos y sencillos',
      'Entender instrucciones simples',
    ],
    includes: [
      'Material didáctico completo',
      'Acceso a clases grabadas',
      'Ejercicios interactivos',
      'Acceso a Vittoria (tutor IA)',
      'Certificado de finalización',
    ],
  },
  {
    level: 'B1-B2',
    title: 'Italiano Intermedio',
    subtitle: 'Fluidez y expresión avanzada',
    available: false,
    duration: '16 semanas',
    hours: '48 horas',
    students: '256',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?auto=format&fit=crop&w=800&q=80',
    description: 'Profundiza tus conocimientos y desarrolla fluidez en la comunicación oral y escrita.',
    topics: [
      'Expresiones idiomáticas',
      'Tiempos verbales avanzados',
      'Subjuntivo y condicional',
      'Cultura y sociedad italiana',
      'Conversación fluida',
      'Textos complejos',
    ],
    objectives: [
      'Mantener conversaciones fluidas',
      'Comprender textos complejos',
      'Expresar opiniones detalladas',
      'Escribir textos elaborados',
    ],
    includes: [
      'Todo lo del nivel anterior',
      'Práctica de conversación avanzada',
      'Material de preparación CELI/CILS',
    ],
  },
  {
    level: 'C1-C2',
    title: 'Italiano Avanzado',
    subtitle: 'Dominio profesional del idioma',
    available: false,
    duration: '20 semanas',
    hours: '60 horas',
    students: '189',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=800&q=80',
    description: 'Alcanza un dominio casi nativo del idioma italiano para contextos profesionales y académicos.',
    topics: [
      'Literatura italiana',
      'Negocios y profesionalismo',
      'Debates y argumentación',
      'Dialectos regionales',
      'Expresiones académicas',
      'Análisis de textos',
    ],
    objectives: [
      'Dominar el idioma a nivel profesional',
      'Comprender contenido especializado',
      'Argumentar con precisión',
      'Escribir textos académicos',
    ],
    includes: [
      'Todo lo de niveles anteriores',
      'Preparación certificación C1/C2',
      'Práctica profesional especializada',
    ],
  },
]

export default function CursosPage() {
  return (
    <>
      <SchemaOrg schema={coursesSchema} />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-primary-900 to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cursos de Italiano Online
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Desde principiante hasta avanzado, con tutor IA disponible 24/7 y profesora certificada.
              Aprende italiano de forma efectiva y personalizada.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-300">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-accent-400" />
                <span>Clases personalizadas</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-accent-400" />
                <span>Certificaciones oficiales</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-accent-400" />
                <span>Material completo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {levels.map((course, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Image */}
                  <div className="lg:col-span-2 relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-2 rounded-full text-white font-bold ${
                        course.available ? 'bg-accent-500' : 'bg-gray-500'
                      }`}>
                        Nivel {course.level}
                      </span>
                    </div>
                    {!course.available && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-3xl font-bold rotate-[-15deg]">
                          PRÓXIMAMENTE
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
                        <p className="text-gray-600">{course.subtitle}</p>
                      </div>
                      <div className="flex items-center text-sm">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">{course.rating}</span>
                        <span className="text-gray-500 ml-1">({course.students} reseñas)</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6">{course.description}</p>

                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-primary-600" />
                        {course.hours} totales
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Temas principales</h3>
                        <ul className="space-y-2">
                          {course.topics.slice(0, 5).map((topic, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-600">
                              <Check className="w-4 h-4 mr-2 text-accent-500 flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                          {course.topics.length > 5 && (
                            <li className="text-sm text-gray-500 italic">
                              +{course.topics.length - 5} temas más...
                            </li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Incluye</h3>
                        <ul className="space-y-2">
                          {course.includes.map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-600">
                              <Check className="w-4 h-4 mr-2 text-accent-500 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {course.available ? (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          href="/#precios"
                          className="btn-primary text-center"
                        >
                          Ver Planes y Precios
                        </Link>
                        <Link
                          href="/#contacto"
                          className="px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors text-center"
                        >
                          Solicitar Información
                        </Link>
                      </div>
                    ) : (
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-gray-600">
                          Este nivel estará disponible próximamente.
                          <Link href="/#contacto" className="text-primary-600 font-semibold ml-1">
                            Dejanos tu email para avisarte.
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿No sabés qué nivel elegir?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Hacé una prueba rápida con Vittoria, nuestro tutor IA, y te recomendará el nivel ideal para vos.
          </p>
          <a
            href="https://t.me/ItaliciaBot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            Evaluar mi nivel con Vittoria
          </a>
        </div>
      </section>
    </>
  )
}
