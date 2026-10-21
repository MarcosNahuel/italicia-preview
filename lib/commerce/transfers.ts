import { createHash, randomUUID } from 'node:crypto'
import type { Order, OrderStore } from './orders'
import { confirmPayment } from './fulfillment'

export function transferReference(value: unknown) {
  if (typeof value !== 'string') return null
  const reference = value.trim().toUpperCase().replace(/[\s.-]/g, '')
  if (!/^[A-Z0-9]{6,80}$/.test(reference)) return null
  return createHash('sha256').update(`patagonia:${reference}`).digest('hex')
}

export async function confirmTransfer(store: OrderStore, id: string, reference: unknown) {
  const paymentId = transferReference(reference)
  const order = await store.read(id)
  if (!order || order.provider !== 'transferencia' || order.currency !== 'ARS' || !paymentId) throw new Error('Invalid transfer')
  if (order.status === 'revoked') throw new Error('Transfer revoked')
  if (order.paymentId && order.paymentId !== paymentId) throw new Error('Different transfer already assigned')
  const paid = await confirmPayment(store, id, paymentId)
  return store.update(id, current => ({ ...current, transferConfirmedAt: current.transferConfirmedAt ?? paid.paidAt }))
}

// The pending notice has its own lease: it cannot mark a sale paid or send a book.
export async function notifyTransfer(store: OrderStore, id: string, send: (order: Order) => Promise<void>, now = Date.now()) {
  const owner = randomUUID()
  const claimed = await store.update(id, order => {
    const previous = order.transferNotice
    if (order.provider !== 'transferencia' || order.status !== 'pending' || previous?.sentAt || previous?.needsReview || (previous?.leaseUntil ?? 0) > now) return order
    const firstAttemptAt = previous?.firstAttemptAt ?? new Date(now).toISOString()
    const expired = now - Date.parse(firstAttemptAt) >= 23 * 3600_000
    return { ...order, transferNotice: { firstAttemptAt, needsReview: expired, leaseOwner: expired ? undefined : owner, leaseUntil: expired ? undefined : now + 120_000 } }
  })
  if (claimed.transferNotice?.leaseOwner !== owner) return claimed
  try {
    await send(claimed)
    return await store.update(id, order => order.transferNotice?.leaseOwner !== owner ? order : { ...order, transferNotice: { ...order.transferNotice, sentAt: new Date(now).toISOString(), leaseOwner: undefined, leaseUntil: undefined } })
  } catch {
    await store.update(id, order => order.transferNotice?.leaseOwner !== owner ? order : { ...order, transferNotice: { ...order.transferNotice, leaseOwner: undefined, leaseUntil: undefined } })
    // A retry must reuse the order, never send the buyer back to create another one.
    return await store.read(id)
  }
}
