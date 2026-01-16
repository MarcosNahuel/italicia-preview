'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Brain, Calendar, MessageCircle, ArrowRight, Lightbulb, Target, Sparkles } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const methods = [
  {
    icon: Brain,
    title: 'Evaluación con IA',
    description:
      'Nuestro sistema de IA evalúa tu nivel actual y adapta el contenido a tus necesidades específicas.',
    gradient: 'from-violet-500 to-purple-600',
    step: '01',
  },
  {
    icon: Calendar,
    title: 'Aprendizaje Estructurado',
    description:
      'Clases asincrónicas, sesiones en vivo y prácticas interactivas organizadas para maximizar tu progreso.',
    gradient: 'from-blue-500 to-cyan-600',
    step: '02',
  },
  {
    icon: MessageCircle,
    title: 'Asistente Virtual Vittoria',
    description:
      'Tu compañera de aprendizaje disponible 24/7 para resolver dudas y practicar conversación.',
    gradient: 'from-emerald-500 to-teal-600',
    step: '03',
    hasLink: true,
  },
]

export default function Methodology() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent-100/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
          {/* Left: Content */}
          <AnimatedSection animation="slide-right" className="lg:w-1/2">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
                  <Lightbulb className="w-4 h-4" />
                  Cómo aprendemos
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Nuestra{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-500 to-emerald-500">
                    metodología
                  </span>
                </h2>
                <p className="text-xl text-gray-600">
                  Combinamos la tecnología de inteligencia artificial con métodos de enseñanza probados
                  para crear una experiencia de aprendizaje única y efectiva.
                </p>
              </div>

              <div className="space-y-4">
                {methods.map((method, index) => {
                  const Icon = method.icon
                  const isHovered = hoveredIndex === index

                  return (
                    <div
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`relative group p-5 rounded-2xl border transition-all duration-300 ${
                        isHovered
                          ? 'bg-white border-accent-200 shadow-lg shadow-accent-100/50'
                          : 'bg-white/50 border-gray-100 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Step number */}
                        <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>

                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${method.gradient} text-white`}>
                              Paso {method.step}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-accent-600 transition-colors">
                            {method.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{method.description}</p>

                          {method.hasLink && (
                            <a
                              href="https://t.me/ItaliciaBot"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gradient-to-r from-[#0088cc] to-[#0077b5] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            >
                              <MessageCircle className="w-4 h-4" />
                              Hablar con Vittoria
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Image */}
          <AnimatedSection animation="slide-left" delay={200} className="lg:w-1/2">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-3xl blur-2xl" />

              <div className="relative">
                {/* Image container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-accent-400 to-primary-600 rounded-2xl" />
                  <div className="relative bg-white rounded-2xl overflow-hidden m-[2px]">
                    <Image
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                      alt="Estudiantes aprendiendo italiano"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Floating card */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 max-w-xs hidden md:block animate-float">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-1">Vittoria, tu asistente IA</h4>
                      <p className="text-gray-600 text-sm">
                        "¡Ciao! Estoy aquí para ayudarte con tu aprendizaje de italiano."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats badge */}
                <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 hidden md:flex animate-bounce-slow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">95%</p>
                      <p className="text-xs text-gray-500">Tasa de éxito</p>
                    </div>
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
