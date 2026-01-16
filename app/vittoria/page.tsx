import { Metadata } from 'next'
import Link from 'next/link'
import {
  MessageCircle,
  Brain,
  Clock,
  BookOpen,
  Mic,
  PenTool,
  Award,
  Zap,
  Check,
  ArrowRight
} from 'lucide-react'
import SchemaOrg from '@/components/SchemaOrg'

export const metadata: Metadata = {
  title: 'Vittoria - Tu Tutor de Italiano con IA 24/7',
  description:
    'Vittoria es tu tutora virtual de italiano basada en inteligencia artificial. Disponible 24/7 en Telegram para practicar conversación, corregir errores y aprender vocabulario.',
  keywords: [
    'tutor italiano IA',
    'bot italiano telegram',
    'practicar italiano online',
    'tutor virtual italiano',
    'inteligencia artificial italiano',
    'Vittoria bot',
  ],
  alternates: {
    canonical: 'https://italicia.com/vittoria/',
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vittoria - Tutor IA de Italiano',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Telegram',
  description:
    'Tutor virtual de italiano basado en inteligencia artificial. Practica conversación, recibe correcciones en tiempo real y aprende vocabulario nuevo. Disponible 24/7.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'ARS',
    description: 'Prueba gratuita disponible',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '324',
  },
  url: 'https://t.me/ItaliciaBot',
  author: {
    '@type': 'Organization',
    name: 'ItalicIA',
  },
}

const features = [
  {
    icon: MessageCircle,
    title: 'Conversación Natural',
    description: 'Chateá en italiano sobre cualquier tema. Vittoria se adapta a tu nivel y mantiene conversaciones naturales y fluidas.',
  },
  {
    icon: PenTool,
    title: 'Corrección Instantánea',
    description: 'Recibí correcciones de gramática, ortografía y estilo en tiempo real con explicaciones claras.',
  },
  {
    icon: BookOpen,
    title: 'Vocabulario Contextual',
    description: 'Aprendé palabras nuevas en contexto, con ejemplos prácticos y expresiones idiomáticas.',
  },
  {
    icon: Mic,
    title: 'Práctica de Pronunciación',
    description: 'Enviá audios y recibí feedback sobre tu pronunciación con tips para mejorar.',
  },
  {
    icon: Brain,
    title: 'Ejercicios Personalizados',
    description: 'Pedí ejercicios de gramática, vocabulario o comprensión adaptados a lo que necesitás reforzar.',
  },
  {
    icon: Award,
    title: 'Preparación Certificaciones',
    description: 'Practicá con ejercicios tipo examen para CELI, CILS, PLIDA y otras certificaciones.',
  },
]

const useCases = [
  {
    title: 'Practicar conversación',
    example: 'Voglio parlare di viaggi in Italia',
    response: 'Perfetto! Che bella scelta! Quali città italiane ti piacerebbe visitare? Roma, Firenze, Venezia...?',
  },
  {
    title: 'Corregir un texto',
    example: 'Puoi correggere: "Io sono andato a la scuola ieri"',
    response: '📝 Correzione: "Sono andato a scuola ieri" - En italiano no se usa el artículo con "scuola" y el pronombre "io" es opcional.',
  },
  {
    title: 'Aprender vocabulario',
    example: 'Insegnami parole per descrivere il tempo',
    response: '☀️ Il sole - sol | 🌧️ La pioggia - lluvia | ❄️ La neve - nieve | 💨 Il vento - viento...',
  },
  {
    title: 'Ejercicios de gramática',
    example: 'Voglio praticare il passato prossimo',
    response: 'Completa: "Ieri io (mangiare) ____ una pizza." | "Maria (andare) ____ al cinema."',
  },
]

export default function VittoriaPage() {
  return (
    <>
      <SchemaOrg schema={softwareSchema} />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-[#0088cc] to-[#006699]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl font-bold text-white">V</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Conocé a Vittoria
            </h1>
            <p className="text-2xl text-white/90 mb-2">Tu tutora virtual de italiano</p>
            <p className="text-xl text-white/70 mb-8">
              Inteligencia artificial disponible 24/7 para ayudarte a aprender y practicar italiano
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://t.me/ItaliciaBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#0088cc] font-bold rounded-full hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Probar Gratis en Telegram
              </a>
            </div>
            <p className="text-white/60 mt-4 text-sm">
              No requiere registro. Comenzá a practicar ahora mismo.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Qué puede hacer Vittoria por vos?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vittoria combina inteligencia artificial avanzada con conocimiento pedagógico
              para ofrecerte una experiencia de aprendizaje personalizada.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="bg-[#0088cc]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#0088cc]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Conversations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mirá cómo funciona
            </h2>
            <p className="text-xl text-gray-600">
              Ejemplos de conversaciones reales con Vittoria
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-[#0088cc] text-white px-4 py-2 font-semibold">
                  {useCase.title}
                </div>
                <div className="p-4 bg-[#e6ebee]">
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-[#effdde] p-3 rounded-lg max-w-[85%]">
                        <p className="text-sm text-gray-800">{useCase.example}</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white p-3 rounded-lg max-w-[85%] shadow-sm">
                        <p className="text-sm text-gray-800">{useCase.response}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ¿Por qué practicar con IA?
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Clock,
                    title: 'Disponible 24/7',
                    description: 'Practicá cuando quieras, sin depender de horarios o disponibilidad de profesores.',
                  },
                  {
                    icon: Zap,
                    title: 'Sin vergüenza',
                    description: 'Cometí errores sin miedo. La IA nunca te juzga y siempre te ayuda a mejorar.',
                  },
                  {
                    icon: Brain,
                    title: 'Paciencia infinita',
                    description: 'Repetí las mismas preguntas todas las veces que necesites. Vittoria nunca se cansa.',
                  },
                  {
                    icon: BookOpen,
                    title: 'Complemento perfecto',
                    description: 'Vittoria no reemplaza a los profesores humanos, los complementa para acelerar tu aprendizaje.',
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-accent-100 p-2 rounded-lg mr-4">
                      <benefit.icon className="w-5 h-5 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Comenzá en 3 pasos
              </h3>
              <ol className="space-y-6">
                {[
                  { step: 'Abrí Telegram', detail: 'Si no lo tenés, descargalo gratis' },
                  { step: 'Buscá @ItaliciaBot', detail: 'O hacé click en el botón de abajo' },
                  { step: 'Escribí /start', detail: 'Y empezá a practicar inmediatamente' },
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="bg-[#0088cc] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{item.step}</p>
                      <p className="text-sm text-gray-600">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a
                href="https://t.me/ItaliciaBot"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full inline-flex items-center justify-center px-6 py-4 bg-[#0088cc] text-white font-bold rounded-full hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Abrir Vittoria en Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-16 bg-accent-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Acceso completo con nuestros planes
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Podés probar Vittoria gratis, pero el acceso ilimitado está incluido
            en nuestros planes Intermedio y Premium junto con clases sincrónicas
            con profesora certificada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#precios" className="btn-primary inline-flex items-center justify-center">
              Ver Planes <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/guia-italiano/"
              className="px-6 py-3 border-2 border-accent-600 text-accent-600 font-semibold rounded-lg hover:bg-accent-100 transition-colors"
            >
              Descargar Guía Gratuita
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
