import { checkoutReady, paymentMode } from '@/lib/commerce/config'
import { currencyFor, getProduct, isProvider, normalizeEmail } from '@/lib/commerce/products'
import { newOrderId } from '@/lib/commerce/security'
import { orderStore, privatePdf } from '@/lib/commerce/store'
import { required } from '@/lib/commerce/config'
import { createProviderCheckout, validCheckoutUrl } from '@/lib/commerce/providers'
import { json, sameOrigin, smallJson } from '@/lib/commerce/http'
import type { Order } from '@/lib/commerce/orders'

export const runtime = 'nodejs'
export const maxDuration = 60
export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: 'Solicitud no permitida.' }, 403)
  let body
  try { body = await smallJson(request) } catch { return json({ error: 'Revisá los datos de la compra.' }, 400) }
  const product = typeof body.productId === 'string' ? getProduct(body.productId) : null
  const provider = body.provider
  const email = normalizeEmail(body.email)
  if (!product || !isProvider(provider) || !email || normalizeEmail(body.emailConfirmation) !== email) return json({ error: 'Revisá el material y repetí tu correo electrónico.' }, 400)
  if (!checkoutReady(product.id, provider)) return json({ error: 'Esta compra todavía se coordina con Alicia. Volvé a Materiales para consultar.' }, 503)
  try {
    // A configured filename is not proof that the PDF was uploaded. Check before sending anyone to pay.
    const pdf = await privatePdf(required(product.pdfEnv))
    if (!pdf || pdf.statusCode !== 200 || pdf.blob.contentType !== 'application/pdf') return json({ error: 'El material no está disponible. Contactá a Alicia antes de pagar.' }, 503)
    await pdf.stream.cancel()
    const currency = currencyFor(provider)
    const order: Order = { version: 1, id: newOrderId(), productId: product.id, provider, email,
      amount: product.amounts[currency], currency, mode: paymentMode(), createdAt: new Date().toISOString(), status: 'pending' }
    await orderStore.create(order)
    const checkout = await createProviderCheckout(order)
    if (!validCheckoutUrl(checkout.url, provider, order.mode)) throw new Error('Invalid checkout destination')
    await orderStore.update(order.id, current => ({ ...current, providerOrderId: checkout.id }))
    await orderStore.indexProviderOrder(provider, checkout.id, order.id)
    return json({ url: checkout.url })
  } catch {
    console.error('book-checkout-failed')
    return json({ error: 'No pudimos abrir el pago. Intentá nuevamente o consultá con Alicia.' }, 503)
  }
}
