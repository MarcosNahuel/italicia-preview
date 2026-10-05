'use client'

import { Shield, Users, ThumbsUp, Heart, Sparkles } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const values = [
  {
    icon: Shield,
    title: 'Humanismo digital',
    description: 'La tecnología al servicio del aprendizaje humano.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Accesibilidad',
    description: 'Formación de calidad a precios justos.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: ThumbsUp,
    title: 'Cercanía',
    description: 'Trato directo, apoyo constante y comunidad activa.',
    gradient: 'from-amber-500 to-orange-500',
  },
]

export default function AboutUs() {
  return (
    <section id="nosotros" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-primary-100/40 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Content */}
          <AnimatedSection animation="slide-right" className="lg:col-span-3">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
                  <Heart className="w-4 h-4" />
                  Nuestra historia
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Pasión por{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-500 to-emerald-500">
                    enseñar
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  ItalicIA nace de la unión de dos pasiones complementarias: la enseñanza de idiomas y la
                  inteligencia artificial. <span className="text-accent-600 font-semibold">Alicia</span>,
                  profesora especializada en italiano, portugués y español, aporta su método pedagógico
                  personalizado, centrado en la motivación y en atender las necesidades únicas de cada
                  estudiante.
                </p>

                <p>
                  Junto con un <em className="text-primary-600 font-medium">AI Generative Engineer</em> y
                  consultor BI, desarrollaron herramientas tecnológicas avanzadas que enriquecen y agilizan
                  la experiencia educativa.
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">
                      A
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">
                      M
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Juntos, combinamos lo mejor de ambos mundos
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Values Card */}
          <AnimatedSection animation="slide-left" delay={200} className="lg:col-span-2">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-3xl blur-2xl" />

              <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 rounded-2xl p-8 shadow-2xl border border-primary-700/50">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10 rounded-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-400 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400 rounded-full blur-2xl" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Nuestros valores
                    </h3>
                  </div>

                  <ul className="space-y-6">
                    {values.map((value, index) => {
                      const Icon = value.icon
                      return (
                        <li
                          key={index}
                          className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10"
                        >
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <span className="font-bold text-white text-lg block mb-1 group-hover:text-accent-300 transition-colors">
                              {value.title}
                            </span>
                            <span className="text-white/60 text-sm leading-relaxed">
                              {value.description}
                            </span>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-bounce-slow hidden lg:flex">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-emerald-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Vittoria</p>
                    <p className="text-xs text-gray-500">WhatsApp · Acceso pago</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
