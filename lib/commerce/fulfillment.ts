import { randomUUID } from 'node:crypto'
import type { Order, OrderStore } from './orders'

export type SendBookEmail = (order: Order) => Promise<string>

export async function confirmPayment(store: OrderStore, id: string, paymentId: string) {
  const order = await store.read(id)
  if (!order) throw new Error('Order not found')
  await store.claimPayment(order.provider, paymentId, id)
  return store.update(id, current => {
    if (current.paymentId && current.paymentId !== paymentId) throw new Error('Another payment already assigned')
    // Revocation is terminal. A delayed approval notification must not restore access.
    if (current.status === 'revoked') return current
    return { ...current, status: 'paid', paymentId, paidAt: current.paidAt ?? new Date().toISOString() }
  })
}

export async function deliverEmail(store: OrderStore, id: string, send: SendBookEmail, now = Date.now()) {
  const owner = randomUUID()
  const claimed = await store.update(id, order => {
    if (order.status !== 'paid' || order.emailSentAt || order.emailNeedsReview || (order.emailLeaseUntil && Date.parse(order.emailLeaseUntil) > now)) return order
    // Resend deduplicates for 24 hours. Ambiguous old attempts require review, never a blind resend.
    if (order.emailFirstAttemptAt && now - Date.parse(order.emailFirstAttemptAt) >= 23 * 60 * 60 * 1000) return { ...order, emailNeedsReview: true }
    return { ...order, emailFirstAttemptAt: order.emailFirstAttemptAt ?? new Date(now).toISOString(), emailLeaseUntil: new Date(now + 120_000).toISOString(), emailLeaseOwner: owner }
  })
  if (claimed.status !== 'paid' || claimed.emailSentAt || claimed.emailNeedsReview || claimed.emailLeaseOwner !== owner) return claimed
  try {
    const latest = await store.read(id)
    if (!latest || latest.status !== 'paid') return latest
    const emailId = await send(claimed)
    return store.update(id, order => order.emailLeaseOwner === owner
      ? { ...order, emailId, emailSentAt: new Date().toISOString(), emailLeaseUntil: undefined, emailLeaseOwner: undefined }
      : order)
  } catch (error) {
    await store.update(id, order => order.emailLeaseOwner === owner ? { ...order, emailLeaseUntil: undefined, emailLeaseOwner: undefined } : order)
    throw error
  }
}
