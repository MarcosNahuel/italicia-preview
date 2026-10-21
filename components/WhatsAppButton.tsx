'use client'

import { MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function WhatsAppButton() {
  const pathname = usePathname()
  // Purchase screens already offer contextual help; the floating button covers text on phones.
  if (pathname.startsWith('/compra/')) return null
  return (
    <a
      href="https://wa.me/5492615449532"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6 mr-2" />
      <span className="font-semibold text-sm">Contactanos</span>
    </a>
  )
}
