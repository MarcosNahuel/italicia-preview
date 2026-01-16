'use client'

import { useState } from 'react'
import { ChevronRight, ExternalLink, Award, GraduationCap, Globe, CheckCircle2 } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const internationalCerts = [
  {
    name: 'CELI',
    institution: 'Universidad de Perugia',
    url: 'https://www.cvcl.it/',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'CILS',
    institution: 'Universidad de Siena',
    url: 'https://cils.unistrasi.it/',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    name: 'PLIDA',
    institution: 'Sociedad Dante Alighieri',
    url: 'https://plida.it/',
    color: 'from-amber-500 to-amber-600',
  },
  {
    name: 'AIL',
    institution: 'Accademia Italiana di Lingua',
    url: 'https://www.acad.it/',
    color: 'from-purple-500 to-purple-600',
  },
]

const uncuyoFeatures = [
  'Reconocimiento nacional',
  'Evaluación completa de habilidades',
  'Preparación incluida en nuestros cursos',
]

export default function Certifications() {
  const [hoveredCert, setHoveredCert] = useState<string | null>(null)

  return (
    <section id="certificaciones" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-accent-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-primary-100/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Certificaciones
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Validá tu{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-500 to-emerald-500">
              conocimiento
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Preparación específica para rendir exámenes internacionales y nacionales que validan tu
            nivel de italiano.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* UNCUYO Card */}
          <AnimatedSection animation="slide-right">
            <div className="relative group h-full">
              {/* Glow effect */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-accent-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-accent-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg">
                {/* Header gradient */}
                <div className="h-2 bg-gradient-to-r from-accent-400 to-emerald-500" />

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-400 to-emerald-500 flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-accent-100 text-accent-700">
                        NACIONAL
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Certificación SPL – IDIO+
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">Universidad Nacional de Cuyo</p>
                  <p className="text-gray-600 mb-6">
                    Certificación oficial reconocida por la Universidad Nacional de Cuyo que valida tus
                    conocimientos del idioma italiano.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {uncuyoFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-accent-400 to-emerald-500 flex items-center justify-center mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://ffyl.uncuyo.edu.ar/servicios-spl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-400 to-emerald-500 text-white font-semibold shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    Ver Certificación UNCUYO
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* International Cards */}
          <AnimatedSection animation="slide-left" delay={200}>
            <div className="relative group h-full">
              {/* Glow effect */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg">
                {/* Header gradient */}
                <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-500" />

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                        INTERNACIONAL
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Certificaciones Internacionales
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Preparación para certificaciones reconocidas en todo el mundo.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {internationalCerts.map((cert) => (
                      <a
                        key={cert.name}
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredCert(cert.name)}
                        onMouseLeave={() => setHoveredCert(null)}
                        className={`relative p-4 rounded-xl border transition-all duration-300 ${
                          hoveredCert === cert.name
                            ? 'bg-white border-gray-200 shadow-lg'
                            : 'bg-gray-50 border-gray-100 hover:bg-white'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center mb-3`}>
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-0.5">{cert.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{cert.institution}</p>
                        <span className="inline-flex items-center text-xs font-medium text-accent-600 group-hover:text-accent-700">
                          Ver más
                          <ChevronRight className="w-3 h-3 ml-0.5" />
                        </span>
                      </a>
                    ))}
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
