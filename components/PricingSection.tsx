import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export default function PricingSection() {
  return (
    <section id="precios" className="scroll-mt-20 py-16 bg-primary-900 text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-5">Empecemos por lo que necesitás</h2>
        <p className="text-lg text-gray-200 mb-8">Contanos tu nivel, tus objetivos y tu disponibilidad. Alicia te informa las propuestas, los horarios y los aranceles vigentes.</p>
        <Link href="/#contacto" className="btn-primary inline-flex items-center gap-2"><MessageCircle className="w-5 h-5" aria-hidden="true" />Consultar horarios y cupos</Link>
      </div>
    </section>
  )
}
