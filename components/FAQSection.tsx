'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'
import SchemaOrg from './SchemaOrg'
import AnimatedSection from './AnimatedSection'
import { vittoriaContactUrl } from '@/lib/vittoria'

const faqs = [
  {
    question: '¿Qué es ItalicIA y cómo funciona?',
    answer:
      'Italicia ofrece cursos A1, A2 y conversación con Alicia, además de manuales y lecturas para estudiar. Vittoria es una opción de práctica con IA en WhatsApp que se contrata por separado, con acceso pago.',
  },
  {
    question: '¿Quién es Vittoria y cómo me puede ayudar?',
    answer:
      'Vittoria es la tutora virtual de Italicia en WhatsApp, con acceso pago. Su propuesta es acompañar la práctica de conversación, gramática y vocabulario. Consultá con Alicia el precio, las condiciones y la activación.',
  },
  {
    question: '¿Necesito conocimientos previos de italiano para empezar?',
    answer:
      'No, nuestro curso de nivel A1 está diseñado para principiantes absolutos. Comenzarás desde cero aprendiendo saludos, presentaciones, números y vocabulario básico. La IA y los profesores adaptan el contenido a tu ritmo de aprendizaje.',
  },
  {
    question: '¿Cuánto tiempo necesito para aprender italiano?',
    answer:
      'Cada estudiante avanza a su propio ritmo. Alicia te orienta según tu nivel, tus objetivos y el tiempo que podés dedicar. Podés complementar el estudio con los materiales y, si lo contratás, con Vittoria en WhatsApp.',
  },
  {
    question: '¿Qué certificaciones puedo obtener?',
    answer:
      'Te preparamos para la certificación SPL-IDIO+ de la Universidad Nacional de Cuyo (reconocida en Argentina) y para certificaciones internacionales como CELI, CILS, PLIDA y AIL, reconocidas en Italia y todo el mundo.',
  },
  {
    question: '¿Cómo son las clases sincrónicas?',
    answer:
      'Las clases sincrónicas son sesiones en vivo con nuestra profesora Alicia, especializada en italiano. Se realizan por videollamada en grupos reducidos, permitiendo interacción directa, práctica oral y resolución de dudas en tiempo real.',
  },
  {
    question: '¿Vittoria es gratuita?',
    answer:
      'Vittoria tiene acceso pago en WhatsApp. Consultá con Alicia el precio y qué incluye el servicio antes de contratarlo.',
  },
  {
    question: '¿La IA reemplaza a los profesores humanos?',
    answer:
      'La IA es un complemento para practicar. Alicia ofrece las clases y el acompañamiento pedagógico; Vittoria en WhatsApp es un servicio con acceso pago que se consulta y contrata por separado.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-100/30 rounded-full blur-3xl" />

      <SchemaOrg schema={faqSchema} />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Preguntas frecuentes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ¿Tenés{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-500 to-emerald-500">
              dudas
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Resolvemos tus preguntas sobre aprender italiano con inteligencia artificial
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AnimatedSection
              key={index}
              animation="fade-up"
              delay={index * 50}
            >
              <div
                className={`mb-4 rounded-2xl border transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-white border-accent-200 shadow-lg shadow-accent-100/50'
                    : 'bg-white/50 border-gray-100 hover:border-gray-200 hover:bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        openIndex === index
                          ? 'bg-gradient-to-br from-accent-400 to-accent-600 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <span className="font-bold text-sm">{index + 1}</span>
                    </div>
                    <h3
                      className={`text-lg font-semibold transition-colors ${
                        openIndex === index ? 'text-accent-600' : 'text-gray-900'
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? 'bg-accent-100 rotate-180'
                        : 'bg-gray-100'
                    }`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-colors ${
                        openIndex === index ? 'text-accent-600' : 'text-gray-400'
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6 pl-20">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection animation="fade-up" delay={400} className="mt-12">
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-2xl p-8 shadow-xl">
              <MessageCircle className="w-12 h-12 text-accent-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                ¿Te quedan preguntas?
              </h3>
              <p className="text-white/70 mb-6">
                Consultá con Alicia el acceso pago a Vittoria en WhatsApp
              </p>
              <a
                href={vittoriaContactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-400 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-500/25 hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Consultar con Alicia
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
