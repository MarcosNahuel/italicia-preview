import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { materials } from '@/lib/catalog'
import BookPaymentButtons from './BookPaymentButtons'

export default function MaterialCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {materials.map(material => (
        <article key={material.id} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
          <BookOpen className="h-8 w-8 text-accent-600 mb-5" aria-hidden="true" />
          <p className="text-sm font-semibold text-accent-700 mb-2">{material.tag}</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{material.title}</h3>
          {'subtitle' in material ? <p className="text-gray-700 italic mb-3">{material.subtitle}</p> : null}
          <p className="text-gray-600 leading-relaxed mb-5">{material.description}</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-7">{material.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
          <div className="mt-auto space-y-4">
            {'price' in material ? (
              <div className="rounded-xl bg-accent-50 p-4">
                {material.price.launchOffer ? <p className="text-sm font-semibold text-accent-700 mb-2">Oferta de lanzamiento</p> : null}
                <p className="text-3xl font-bold text-gray-900">${new Intl.NumberFormat('es-AR').format(material.price.ars)} <span className="text-sm font-semibold">ARS</span></p>
                <p className="text-base text-gray-700 mt-1">o US${material.price.usd}</p>
              </div>
            ) : null}
            <BookPaymentButtons materialId={material.id} />
            <Link href={material.href} className="inline-flex items-center gap-2 font-semibold text-accent-700 hover:underline">{material.action}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
          </div>
        </article>
      ))}
    </div>
  )
}
