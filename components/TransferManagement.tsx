'use client'

import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

type Details = { id: string; title: string; email: string; amount: number; status: 'pending' | 'paid' | 'revoked'; emailSent: boolean; needsReview: boolean }
export default function TransferManagement() {
  const [credentials, setCredentials] = useState({ id: '', access: '' })
  const [order, setOrder] = useState<Details | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    const fields = new URLSearchParams(window.location.hash.slice(1))
    setCredentials({ id: fields.get('pedido') ?? '', access: fields.get('acceso') ?? '' })
  }, [])
  async function act(action: string, reference?: string, checked = false) {
    if (busy) return
    setBusy(true); setError('')
    try {
      const response = await fetch('/api/libros/transferencia/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...credentials, action, reference, checked }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error)
      setOrder(result)
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'No pudimos consultar el pedido.') }
    finally { setBusy(false) }
  }
  function confirm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    void act('confirm', String(fields.get('reference') ?? ''), fields.get('checked') === 'on')
  }
  return <section className="space-y-6">
    <h1 className="text-3xl font-bold text-primary-900">Confirmar transferencia</h1>
    <p>Panel privado de Alicia. No compartas este enlace.</p>
    {!order && <button disabled={busy || !credentials.access} onClick={() => void act('inspect')} className="rounded-xl bg-primary-900 px-5 py-3 text-white disabled:opacity-60">{busy ? 'Consultando…' : 'Ver pedido'}</button>}
    {order && <>
      <dl className="space-y-2 rounded-xl bg-gray-50 p-4">
        <div><dt className="font-semibold">Libro</dt><dd>{order.title}</dd></div>
        <div><dt className="font-semibold">Importe a verificar</dt><dd>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(order.amount / 100)} ARS</dd></div>
        <div><dt className="font-semibold">Correo de entrega</dt><dd className="break-all">{order.email}</dd></div>
        <div><dt className="font-semibold">Pedido</dt><dd className="break-all text-sm">{order.id}</dd></div>
      </dl>
      {order.status === 'pending' && <form onSubmit={confirm} className="space-y-4">
        <p>Comprobá en Banco Patagonia que ingresó este importe y que corresponde a este comprador.</p>
        <label className="block">Número de operación de la transferencia en el banco<input name="reference" required minLength={6} maxLength={100} autoComplete="off" className="mt-2 w-full rounded-xl border p-3" /></label>
        <label className="flex items-start gap-3"><input name="checked" type="checkbox" required className="mt-1" />Verifiqué el ingreso y el importe en mi cuenta.</label>
        <button disabled={busy} className="w-full rounded-xl bg-primary-900 p-4 font-semibold text-white disabled:opacity-60">{busy ? 'Confirmando…' : 'Confirmar transferencia recibida y enviar libro'}</button>
      </form>}
      {order.status === 'paid' && <div role="status" className="space-y-3 rounded-xl bg-green-50 p-4"><p className="font-semibold">Transferencia confirmada.</p><p>{order.emailSent ? 'El servicio de correo aceptó el envío del libro. Esto no confirma que el comprador lo haya leído.' : order.needsReview ? 'El envío necesita revisión. Revisá el correo en Resend antes de reenviar.' : 'El envío del correo está pendiente. Podés reintentar sin volver a confirmar ni cobrar.'}</p>{!order.emailSent && !order.needsReview && <button disabled={busy} onClick={() => void act('retry')} className="underline">Reintentar envío</button>}</div>}
      {order.status === 'revoked' && <p role="status">Acceso suspendido. Este pedido ya no permite descargar el libro.</p>}
      {order.status !== 'revoked' && <details className="border-t pt-4"><summary>Suspender este pedido</summary><p className="my-3">Usalo si cancelás la compra o devolvés el dinero. Suspende la descarga; no realiza una devolución bancaria.</p><form onSubmit={event => { event.preventDefault(); void act('revoke', undefined, true) }} className="space-y-3"><label className="flex gap-2"><input type="checkbox" required />Quiero suspender definitivamente la descarga de este pedido.</label><button disabled={busy} className="rounded-xl border border-red-700 p-3 text-red-800">Suspender descarga</button></form></details>}
    </>}
    {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-800">{error}</p>}
  </section>
}
