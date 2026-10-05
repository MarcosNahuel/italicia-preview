import { verifyPaypalWebhook } from '@/lib/commerce/providers'
import { orderStore } from '@/lib/commerce/store'
import { reconcileOrder } from '@/lib/commerce/service'
import { json, smallJson } from '@/lib/commerce/http'
import { paymentMode } from '@/lib/commerce/config'
import { paypalWebhookReference } from '@/lib/commerce/paypal-events'

export const runtime = 'nodejs'
export const maxDuration = 90
export async function POST(request: Request) {
  try {
    const event = await smallJson(request)
    if (!(await verifyPaypalWebhook(request.headers, event))) return json({ error: 'Invalid signature' }, 401)
    const type = String(event.event_type ?? '')
    if (!['CHECKOUT.ORDER.APPROVED', 'PAYMENT.CAPTURE.COMPLETED', 'PAYMENT.CAPTURE.PENDING', 'PAYMENT.CAPTURE.DENIED', 'PAYMENT.CAPTURE.REFUNDED', 'PAYMENT.CAPTURE.REVERSED'].includes(type)) return json({ received: true })
    const reference = paypalWebhookReference(event, paymentMode())
    if (!reference.orderId && !reference.captureId) return json({ error: 'Payment reference missing' }, 503)
    const id = (reference.orderId ? await orderStore.findByProviderOrder('paypal', reference.orderId) : null)
      ?? (reference.captureId ? await orderStore.findByPayment('paypal', reference.captureId) : null)
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
