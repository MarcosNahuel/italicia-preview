import type { Metadata } from 'next'
import { MessageCircle, BookOpen, PenTool, ArrowRight } from 'lucide-react'
import SchemaOrg from '@/components/SchemaOrg'
import { vittoriaContactUrl, vittoriaSchema } from '@/lib/vittoria'

export const metadata: Metadata = {
  title: 'Vittoria en WhatsApp — Práctica de italiano con acceso pago',
  description: 'Practicá italiano con Vittoria, la tutora virtual de Italicia en WhatsApp. Acceso pago: consultá precio, condiciones y activación con Alicia.',
  keywords: ['tutor italiano IA', 'italiano WhatsApp', 'practicar italiano', 'Vittoria'],
  alternates: { canonical: 'https://italicia.com/vittoria/' },
}

const features = [
  { icon: MessageCircle, title: 'Conversación en italiano', description: 'Practicá situaciones cotidianas: presentarte, organizar un viaje o pedir en un restaurante.' },
  { icon: PenTool, title: 'Gramática en contexto', description: 'Trabajá tus frases y tus dudas con explicaciones y ejemplos para seguir aprendiendo.' },
  { icon: BookOpen, title: 'Vocabulario y ejercicios', description: 'Reforzá lo que estudiás con palabras nuevas y actividades de práctica.' },
]

const examples = [
  { title: 'Presentarte', message: 'Ciao! Mi chiamo Ana e sono argentina.', response: 'Piacere, Ana! Perché studi italiano?' },
  { title: 'Practicar en un restaurante', message: 'Vorrei un caffè, per favore.', response: 'Certo! Un caffè al banco o al tavolo?' },
]

export default function VittoriaPage() {
  return (
    <>
      <SchemaOrg schema={vittoriaSchema} />
      <section className="pt-28 pb-16 bg-gradient-to-b from-primary-900 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 mb-6 rounded-full bg-accent-500/20 text-accent-300 font-semibold">WhatsApp · Acceso pago</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Practicá italiano con Vittoria en WhatsApp</h1>
          <p className="text-xl text-gray-200 mb-8">Tu tutora virtual para acompañar la práctica de conversación, gramática y vocabulario.</p>
          <a href={vittoriaContactUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-3">
            <MessageCircle className="w-5 h-5" aria-hidden="true" />Consultar acceso y precio
          </a>
          <p className="text-sm text-gray-300 mt-4">El botón abre una consulta con Alicia. Ella te informa las condiciones y cómo activar el acceso.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Una compañera para seguir practicando</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-6">
                <Icon className="w-8 h-8 text-accent-600 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-center mt-8">Vittoria complementa las clases y los materiales de Italicia. Consultá con Alicia qué incluye el acceso pago.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">Ejemplos de práctica</h2>
          <p className="text-gray-600 text-center mb-8">Diálogos ilustrativos para mostrar situaciones que podés trabajar.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {examples.map((example) => (
              <div key={example.title} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <h3 className="bg-accent-600 text-white font-semibold p-4">{example.title}</h3>
                <div className="p-5 bg-emerald-50 space-y-4" lang="it">
                  <p className="bg-emerald-100 p-3 rounded-xl ml-6">{example.message}</p>
                  <p className="bg-white p-3 rounded-xl mr-6">{example.response}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Cómo acceder</h2>
          <ol className="space-y-6">
            {[
              { title: 'Consultá con Alicia', detail: 'Contale tu nivel y preguntá por el precio, la duración y lo que incluye el servicio.' },
              { title: 'Coordiná la contratación', detail: 'Alicia te indica el medio de pago y las condiciones para activar tu acceso.' },
              { title: 'Recibí las instrucciones para WhatsApp', detail: 'Una vez coordinada la activación, Alicia te comparte cómo ingresar y comenzar a practicar con Vittoria.' },
            ].map((step, index) => (
              <li key={step.title} className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-accent-600 text-white flex items-center justify-center font-bold">{index + 1}</span>
                <div><h3 className="font-bold text-gray-900 mb-1">{step.title}</h3><p className="text-gray-600">{step.detail}</p></div>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <a href={vittoriaContactUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">Consultar con Alicia<ArrowRight className="w-5 h-5" aria-hidden="true" /></a>
          </div>
        </div>
      </section>

    </>
  )
}
