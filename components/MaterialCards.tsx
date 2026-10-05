import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Play } from 'lucide-react'
import { materials } from '@/lib/catalog'
import BookPaymentButtons from './BookPaymentButtons'

export default function MaterialCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {materials.map(material => (
        <article key={material.id} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
          {'cover' in material ? (
            <div className="flex h-80 items-center justify-center rounded-xl bg-gray-50 p-4 mb-6">
              <Image src={material.cover.src} alt={material.cover.alt} width={material.cover.width} height={material.cover.height} sizes="(max-width: 767px) 80vw, 320px" className="max-h-full w-auto max-w-full object-contain rounded-sm shadow-md" />
            </div>
          ) : <BookOpen className="h-8 w-8 text-accent-600 mb-5" aria-hidden="true" />}
          <p className="text-sm font-semibold text-accent-700 mb-2">{material.tag}</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{material.title}</h3>
          {'subtitle' in material ? <p className="text-gray-700 italic mb-3">{material.subtitle}</p> : null}
          <p className="text-gray-600 leading-relaxed mb-5">{material.description}</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-7">{material.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
          {'video' in material ? (
            <details className="rounded-xl border border-gray-200 mb-6">
              <summary className="cursor-pointer p-4 font-semibold text-accent-700"><Play className="inline-block h-4 w-4 mr-2" aria-hidden="true" />{material.video.title}</summary>
              <div className="px-4 pb-4">
                <iframe src={`https://www.youtube-nocookie.com/embed/${material.video.id}`} title={material.video.title} loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="aspect-[9/16] w-full max-w-xs mx-auto rounded-lg border-0" />
                <a href={`https://www.youtube.com/shorts/${material.video.id}`} target="_blank" rel="noopener noreferrer" className="block mt-3 text-center text-sm text-accent-700 underline">Ver en YouTube</a>
              </div>
            </details>
          ) : null}
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
