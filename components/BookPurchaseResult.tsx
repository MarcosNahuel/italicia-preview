'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type Result = { status?: 'pending' | 'paid' | 'revoked'; emailSent?: boolean; downloadUrl?: string; error?: string }
export default function BookPurchaseResult() {
  const params = useSearchParams()
  const id = params.get('pedido') ?? '', access = params.get('acceso') ?? ''
  const [result, setResult] = useState<Result>({})
  const [busy, setBusy] = useState(false)
  const refresh = useCallback(async (signal?: AbortSignal) => {
    setBusy(true)
    try {
      const response = await fetch('/api/libros/estado/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, access }), signal })
      setResult(await response.json())
    } catch { if (!signal?.aborted) setResult({ error: 'No pudimos comprobar el pago. Volvé a intentar.' }) }
    finally { if (!signal?.aborted) setBusy(false) }
  }, [id, access])
  useEffect(() => {
    const controller = new AbortController()
    void refresh(controller.signal)
    return () => controller.abort()
  }, [refresh]) // Only explicit retries after the initial check; no endless requests.
  const title = result.status === 'paid' ? '¡Gracias por tu compra!' : result.status === 'revoked' ? 'La descarga está suspendida' : 'Comprobamos tu compra'
  return <div className="space-y-6">
    <h1 className="text-3xl font-bold text-primary-900">{title}</h1>
    {result.status === 'paid' && <>
      <p>{result.emailSent ? 'Enviamos el enlace de tu PDF al correo que ingresaste. Revisá también la carpeta de spam.' : 'Tu pago está confirmado. Podés descargar el PDF acá; el correo de entrega sigue pendiente.'}</p>
      {result.downloadUrl && <a href={result.downloadUrl} className="block rounded-xl bg-primary-900 p-4 text-center font-semibold text-white">Descargar mi PDF</a>}
      <p className="text-sm text-gray-600">El enlace dura 30 días desde la confirmación del pago. Guardá el archivo en tu dispositivo.</p>
    </>}
    {result.status === 'pending' && <p>El pago todavía no está confirmado. Si ya pagaste, esperá unos minutos y volvé a comprobarlo. Cuando se apruebe, te enviaremos el PDF por correo.</p>}
    {result.status === 'revoked' && <p>Esta compra ya no tiene una descarga habilitada. Contactá a Alicia para revisar lo ocurrido.</p>}
    {result.error && <p role="alert" className="text-red-800">{result.error}</p>}
    {result.status !== 'paid' && <button onClick={() => void refresh()} disabled={busy} className="rounded-xl bg-primary-900 p-3 text-white disabled:opacity-60">{busy ? 'Comprobando…' : 'Volver a comprobar'}</button>}
    <a href="https://wa.me/5492615449532" target="_blank" rel="noopener noreferrer" className="block text-primary-900 underline">Necesito ayuda de Alicia</a>
    <a href="/materiales/" className="block text-sm text-gray-600 underline">Volver a Materiales</a>
  </div>
}
