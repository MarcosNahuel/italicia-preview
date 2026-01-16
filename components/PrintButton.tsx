'use client'

import { Download } from 'lucide-react'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-md font-semibold hover:bg-gray-100 transition"
    >
      <Download className="w-5 h-5" />
      Descargar Guía (PDF)
    </button>
  )
}
