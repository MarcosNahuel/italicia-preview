import 'server-only'
import { required, siteUrl } from './config'
import { getProduct } from './products'
import { downloadToken, transferAdminAccess } from './security'
import type { Order } from './orders'
import { alertsEnabled, type AlertKind } from './owner-alerts'

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!))

export async function sendTransferNotice(order: Order): Promise<void> {
  const url = `${siteUrl()}/compra/administrar-transferencia/#pedido=${order.id}&acceso=${transferAdminAccess(order.id, required('BOOK_TRANSFER_ADMIN_SECRET'))}`
  const text = `Nuevo pedido por transferencia (pago pendiente).\n\nLibro: ${getProduct(order.productId)!.title}\nImporte: ${(order.amount / 100).toFixed(2)} ARS\nCorreo: ${order.email}\nPedido: ${order.id}\n\nRevisá el ingreso en Banco Patagonia. Luego abrí tu pantalla privada para confirmar y enviar el libro:\n${url}\n\nNo compartas este enlace: permite confirmar el pago o suspender la descarga de este pedido. Abrirlo no confirma ningún pago.`
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(12_000),
    headers: { Authorization: `Bearer ${required('RESEND_API_KEY')}`, 'Content-Type': 'application/json', 'Idempotency-Key': `book-transfer-notice-v1-${order.id}` },
    body: JSON.stringify({ from: required('BOOK_EMAIL_FROM'), to: ['italicia.edu@gmail.com'], subject: 'Italicia: pedido por transferencia pendiente de confirmar', text }),
  })
  if (!response.ok || !(await response.json() as { id?: string }).id) throw new Error('Transfer notice not confirmed')
}

export async function sendBookEmail(order: Order): Promise<string> {
  if (order.status !== 'paid' || !order.paidAt) throw new Error('Unpaid order cannot be delivered')
  const product = getProduct(order.productId)!
  const url = `${siteUrl()}/api/libros/descarga/?token=${downloadToken(order.id, order.paidAt, required('BOOK_TOKEN_SECRET'))}`
  const text = `¡Gracias por tu compra!\n\nTu material: ${product.title}\nDescargá tu PDF: ${url}\n\nEl enlace está disponible durante 30 días desde la confirmación del pago. Guardá el archivo en tu dispositivo. Si necesitás ayuda, respondé a este correo.\n\nAlicia — Italicia`
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(12_000),
    headers: { Authorization: `Bearer ${required('RESEND_API_KEY')}`, 'Content-Type': 'application/json', 'Idempotency-Key': `book-delivery-v1-${order.id}` },
    body: JSON.stringify({ from: required('BOOK_EMAIL_FROM'), to: [order.email], tags: alertsEnabled(order) ? [{ name: 'book_order', value: order.id }, { name: 'book_mode', value: order.mode }] : undefined, reply_to: 'italicia.edu@gmail.com', subject: `Tu PDF de Italicia: ${product.title}`, text,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;color:#18352c"><h1>¡Gracias por tu compra!</h1><p>Tu material: <strong>${escapeHtml(product.title)}</strong></p><p><a href="${escapeHtml(url)}" style="background:#18352c;color:white;padding:14px 22px;display:inline-block;border-radius:8px">Descargar mi PDF</a></p><p>El enlace está disponible durante 30 días desde la confirmación del pago. Guardá el archivo en tu dispositivo.</p><p>Si necesitás ayuda, respondé a este correo.</p><p>Alicia — Italicia</p></div>` }),
  })
  if (!response.ok) throw new Error(`Email service returned ${response.status}`)
  const email = await response.json() as { id?: string }
  if (!email.id) throw new Error('Email receipt missing')
  return email.id
}

export async function sendOwnerAlert(order: Order, kind: AlertKind, text: string): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(12_000),
    headers: { Authorization: `Bearer ${required('RESEND_API_KEY')}`, 'Content-Type': 'application/json', 'Idempotency-Key': `book-owner-v1-${order.id}-${kind}` },
    body: JSON.stringify({ from: required('BOOK_EMAIL_FROM'), to: ['italicia.edu@gmail.com'],
      subject: kind === 'sale' ? 'Italicia: nueva compra confirmada' : 'Italicia: revisar entrega del correo', text }),
  })
  if (!response.ok || !(await response.json() as { id?: string }).id) throw new Error('Owner alert not confirmed')
}
