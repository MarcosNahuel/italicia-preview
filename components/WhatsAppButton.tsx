import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5492612696929"
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
