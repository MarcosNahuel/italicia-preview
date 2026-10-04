import { ExternalLink } from 'lucide-react'
import { getBookPaymentLinks } from '@/lib/book-payments'

export default function BookPaymentButtons({ materialId }: { materialId: string }) {
  const links = getBookPaymentLinks(materialId)
  if (!links.length) return null

  return (
    <div className="space-y-3" aria-label="Comprar este material">
      {links.map(link => (
        <a
          key={link.provider}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary-900 px-4 py-3 text-center font-semibold text-white hover:bg-primary-800 transition-colors"
        >
          {link.label}<ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      ))}
      <p className="text-xs text-gray-600">El precio y la moneda se muestran en la página de pago.</p>
    </div>
  )
}
