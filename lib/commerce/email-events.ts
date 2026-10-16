import { Webhook } from 'svix'
import type { OrderStore } from './orders'
import { alertsEnabled, notifyOwner, type SendOwnerAlert } from './owner-alerts'
import { validOrderId } from './security'

export function verifyEmailEvent(payload: string, headers: Headers, secret: string) {
  new Webhook(secret).verify(payload, {
    'svix-id': headers.get('svix-id') ?? '',
    'svix-timestamp': headers.get('svix-timestamp') ?? '',
    'svix-signature': headers.get('svix-signature') ?? '',
  })
  const event = JSON.parse(payload)
  if (!event || typeof event !== 'object' || Array.isArray(event)) throw new Error('Invalid event')
  return event as { type?: string; data?: { email_id?: string; to?: string[]; tags?: Record<string, string> } }
}

export async function handleEmailEvent(store: OrderStore, event: ReturnType<typeof verifyEmailEvent>, send: SendOwnerAlert) {
  const messages: Record<string, string> = {
    'email.bounced': 'El servidor del destinatario rechazó el correo del libro.',
    'email.failed': 'El servicio de correo informó que falló la entrega del libro.',
    'email.suppressed': 'El servicio bloqueó el envío al destinatario.',
  }
  const issue = messages[event.type ?? '']
  const id = event.data?.tags?.book_order
  // Owner alerts have no book_order tag: never create an alert loop.
  if (!issue || !id || !validOrderId(id) || event.data?.tags?.book_mode !== 'live') return
  const order = await store.read(id)
  if (!order || !alertsEnabled(order)) return
  // The webhook can arrive before the send response is saved. Retry that race.
  if (!order.emailId) throw new Error('Email receipt not stored yet')
  if (event.data?.email_id !== order.emailId || !event.data.to?.includes(order.email)) return
  await store.update(id, current => ({ ...current, deliveryIssue: issue }))
  await notifyOwner(store, id, send)
  const current = await store.read(id)
  if (!current?.ownerAlerts?.delivery?.sentAt && !current?.ownerAlerts?.delivery?.needsReview) throw new Error('Retry owner notice')
}
