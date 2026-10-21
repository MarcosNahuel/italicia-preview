import { randomUUID } from 'node:crypto'
import type { Order, OrderStore } from './orders'
import { getProduct } from './products'
import { deliverEmail, type SendBookEmail } from './fulfillment'

export type AlertKind = 'sale' | 'delivery'
export type SendOwnerAlert = (order: Order, kind: AlertKind, text: string) => Promise<void>

// Explicit activation date prevents historical orders from generating surprise alerts.
export function alertsEnabled(order: Order) {
  const since = Date.parse(process.env.BOOK_OWNER_ALERTS_FROM ?? '')
  return order.mode === 'live' && process.env.VERCEL_ENV === 'production'
    && Number.isFinite(since) && !!order.paidAt && Date.parse(order.paidAt) >= since
}

export function ownerAlertText(order: Order, kind: AlertKind) {
  const details = `Libro: ${getProduct(order.productId)!.title}\nImporte: ${new Intl.NumberFormat('es-AR', { style: 'currency', currency: order.currency }).format(order.amount / 100)} (${order.currency})\nMedio de pago: ${order.provider === 'transferencia' ? 'Transferencia bancaria' : order.provider === 'paypal' ? 'PayPal' : 'Mercado Pago'}\nCorreo del comprador: ${order.email}\nPedido: ${order.id}`
  return kind === 'sale'
    ? `Se confirmó una compra en Italicia.\n\n${details}\n\nEl pago está confirmado. Este aviso no confirma que el comprador haya recibido el correo o descargado el PDF.`
    : `Revisá la entrega del correo de este pedido.\n\n${details}\n\nEstado: ${order.deliveryIssue ?? 'El envío requiere revisión.'}\n\nVerificá el estado en Resend y el correo del comprador antes de reenviar. No vuelvas a cobrarle. Si hubo un problema temporal, el sistema puede seguir reintentando el envío.`
}

export async function notifyOwner(store: OrderStore, id: string, send: SendOwnerAlert, now = Date.now()) {
  for (const kind of ['sale', 'delivery'] as const) {
    const owner = randomUUID()
    const claimed = await store.update(id, order => {
      if (!alertsEnabled(order) || (kind === 'delivery' && !order.deliveryIssue)) return order
      const previous = order.ownerAlerts?.[kind]
      if (previous?.sentAt || previous?.needsReview || (previous?.leaseUntil ?? 0) > now) return order
      const state = previous ?? { text: ownerAlertText(order, kind), firstAttemptAt: new Date(now).toISOString() }
      // Resend's idempotency lasts 24h. Never blindly resend an ambiguous older attempt.
      const expired = now - Date.parse(state.firstAttemptAt) >= 23 * 3600_000
      return { ...order, ownerAlerts: { ...order.ownerAlerts, [kind]: { ...state, needsReview: expired, leaseOwner: expired ? undefined : owner, leaseUntil: expired ? undefined : now + 120_000 } } }
    })
    const state = claimed.ownerAlerts?.[kind]
    if (state?.leaseOwner !== owner) continue
    try {
      await send(claimed, kind, state.text)
      await store.update(id, order => order.ownerAlerts?.[kind]?.leaseOwner !== owner ? order : {
        ...order, ownerAlerts: { ...order.ownerAlerts, [kind]: { ...state, sentAt: new Date(now).toISOString(), leaseOwner: undefined, leaseUntil: undefined } },
      })
    } catch {
      await store.update(id, order => order.ownerAlerts?.[kind]?.leaseOwner !== owner ? order : {
        ...order, ownerAlerts: { ...order.ownerAlerts, [kind]: { ...state, leaseOwner: undefined, leaseUntil: undefined } },
      })
      // A failed owner notice must not prevent the customer from receiving their book.
      console.error('book-owner-alert-retry')
    }
  }
}

export async function deliverWithAlerts(store: OrderStore, id: string, sendBook: SendBookEmail, sendOwner: SendOwnerAlert) {
  try {
    const result = await deliverEmail(store, id, sendBook)
    if (result?.emailNeedsReview) await store.update(id, order => ({ ...order, deliveryIssue: 'El envío quedó sin confirmación y requiere revisión manual.' }))
    return result
  } catch (error) {
    await store.update(id, order => ({ ...order, deliveryIssue: 'No se pudo confirmar el envío al comprador. Puede tratarse de un fallo temporal.' }))
    throw error
  } finally {
    try { await notifyOwner(store, id, sendOwner) }
    catch { console.error('book-owner-alert-retry') }
  }
}
