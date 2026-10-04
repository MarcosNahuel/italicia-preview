import Link from 'next/link'
import MaterialCards from './MaterialCards'

export default function MaterialsPreview() {
  return (
    <section id="materiales" className="scroll-mt-20 py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-accent-700 font-semibold mb-4">Creado para acompañarte</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">Italiano también entre clases</h2>
          <p className="text-xl text-gray-600">Manuales, lecturas y recursos de Italicia para leer, escuchar y seguir practicando a tu ritmo.</p>
        </div>
        <MaterialCards />
        <p className="text-center mt-10"><Link href="/materiales/" className="font-semibold text-accent-700 hover:underline">Conocer los materiales de Italicia</Link></p>
      </div>
    </section>
  )
}
