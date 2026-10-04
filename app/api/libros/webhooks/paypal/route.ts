import { verifyPaypalWebhook } from '@/lib/commerce/providers'
import { orderStore } from '@/lib/commerce/store'
import { reconcileOrder } from '@/lib/commerce/service'
import { json, smallJson } from '@/lib/commerce/http'

export const runtime = 'nodejs'
export const maxDuration = 90
export async function POST(request: Request) {
  try {
    const event = await smallJson(request)
    if (!(await verifyPaypalWebhook(request.headers, event))) return json({ error: 'Invalid signature' }, 401)
    const type = String(event.event_type ?? '')
    if (!['CHECKOUT.ORDER.APPROVED', 'PAYMENT.CAPTURE.COMPLETED', 'PAYMENT.CAPTURE.PENDING', 'PAYMENT.CAPTURE.DENIED', 'PAYMENT.CAPTURE.REFUNDED', 'PAYMENT.CAPTURE.REVERSED'].includes(type)) return json({ received: true })
    const resource = event.resource as { id?: string; supplementary_data?: { related_ids?: { order_id?: string } } } | undefined
    const remoteId = type === 'CHECKOUT.ORDER.APPROVED' ? resource?.id : resource?.supplementary_data?.related_ids?.order_id
    if (!remoteId) return json({ error: 'Order ID missing' }, 503)
    const id = await orderStore.findByProviderOrder('paypal', remoteId)
    if (id) {
      const order = await orderStore.read(id)
      if (order) {
        // Signed reversal events immediately disable access; API rereads handle full/partial refunds too.
        if (type === 'PAYMENT.CAPTURE.REVERSED') await orderStore.update(id, current => ({ ...current, status: 'revoked' }))
        else await reconcileOrder(order)
      }
    }
    return json({ received: true })
  } catch {
    console.error('book-paypal-webhook-retry')
    return json({ error: 'Retry notification' }, 503)
  }
}
