'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Provider } from '@/lib/commerce/products'

export default function BookCheckout({ productId, provider }: { productId: string; provider: Provider }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    setBusy(true); setError('')
    const fields = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/libros/checkout/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId, provider, email: fields.get('email'), emailConfirmation: fields.get('emailConfirmation') }) })
      const result = await response.json()
      if (!response.ok || !result.url) throw new Error(result.error ?? 'No pudimos abrir el pago.')
      window.location.assign(result.url)
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'No pudimos abrir el pago.'); setBusy(false) }
  }
  return <form onSubmit={submit} className="mt-8 space-y-5">
    <div><label htmlFor="buyer-email" className="mb-2 block font-medium">Correo donde querés recibir el PDF</label><input id="buyer-email" name="email" type="email" autoComplete="email" required maxLength={254} className="w-full rounded-xl border border-gray-300 p-3" /></div>
    <div><label htmlFor="buyer-email-confirm" className="mb-2 block font-medium">Repetí tu correo</label><input id="buyer-email-confirm" name="emailConfirmation" type="email" autoComplete="off" required maxLength={254} className="w-full rounded-xl border border-gray-300 p-3" /></div>
    <p className="text-sm text-gray-600">Cuando se confirme el pago, vas a recibir un correo con tu enlace de descarga. El enlace dura 30 días: guardá el PDF en tu dispositivo.</p>
    <p className="text-xs text-gray-600">Usamos este correo para entregar tu compra y ayudarte si necesitás asistencia. <a href="/privacy/" className="underline">Privacidad</a></p>
    {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-800">{error}</p>}
    <button disabled={busy} className="w-full rounded-xl bg-primary-900 p-4 font-semibold text-white disabled:opacity-60">{busy ? 'Abriendo el pago…' : `Continuar con ${provider === 'mercadoPago' ? 'Mercado Pago' : 'PayPal'}`}</button>
  </form>
}
