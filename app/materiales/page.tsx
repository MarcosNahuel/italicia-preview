import type { Metadata } from 'next'
import Link from 'next/link'
import MaterialCards from '@/components/MaterialCards'

export const metadata: Metadata = {
  title: 'Materiales y lecturas para aprender italiano',
  description: 'Conocé los materiales de Italicia: manuales y unidades A1 y A2, la lectura ilustrada Un’argentina in Italia y una guía gratuita para empezar.',
  alternates: { canonical: 'https://italicia.com/materiales/' },
}
export default function MaterialesPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-accent-300 font-semibold mb-4">Leé, escuchá y practicá</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Materiales de Italicia</h1>
          <p className="text-xl text-gray-200 leading-relaxed">Recursos preparados por Alicia para acompañar tus clases o sumar momentos de italiano a tu día.</p>
        </div>
      </section>
      <section className="py-16 bg-gray-50" aria-label="Manuales, lecturas y recursos"><div className="container mx-auto px-4"><h2 className="sr-only">Manuales, lecturas y recursos</h2><MaterialCards /></div></section>
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-5">Encontrá el material para tu momento</h2>
          <p className="text-lg text-gray-600 mb-8">Si estás empezando o querés reforzar lo que trabajás en clase, contanos tu nivel y tus objetivos. Alicia te orienta sobre los materiales y cómo conseguirlos.</p>
          <Link href="/#contacto" className="btn-primary inline-flex">Consultar con Alicia</Link>
        </div>
      </section>
    </>
  )
}
