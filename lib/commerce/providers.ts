import 'server-only'
import { required, paymentMode, siteUrl } from './config'
import { orderAccess } from './security'
import { getProduct } from './products'
import type { Order } from './orders'
import type { MpPayment, PaypalOrder, PaypalCapture } from './validation'

async function api<T>(url: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url, { ...init, cache: 'no-store', signal: AbortSignal.timeout(12_000) })
  // Provider responses may contain credentials or personal details. Do not log their bodies.
  if (!response.ok) throw new Error(`Payment service returned ${response.status}`)
  return response.json() as Promise<T>
}
const mpHeaders = () => ({ Authorization: `Bearer ${required('MP_ACCESS_TOKEN')}`, 'Content-Type': 'application/json' })
const ppBase = () => paymentMode() === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com'
async function paypalHeaders() {
  const credentials = Buffer.from(`${required('PAYPAL_CLIENT_ID')}:${required('PAYPAL_CLIENT_SECRET')}`).toString('base64')
  const auth = await api<{ access_token: string }>(`${ppBase()}/v1/oauth2/token`, {
    method: 'POST', headers: { Authorization: `Basic ${credentials}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'grant_type=client_credentials',
  })
  return { Authorization: `Bearer ${auth.access_token}`, 'Content-Type': 'application/json', Prefer: 'return=representation' }
}

export function resultUrl(order: Order) {
  return `${siteUrl()}/compra/resultado/?pedido=${order.id}&acceso=${orderAccess(order.id, required('BOOK_TOKEN_SECRET'))}`
}
export async function createProviderCheckout(order: Order) {
  const product = getProduct(order.productId)!
  const back = resultUrl(order)
  if (order.provider === 'mercadoPago') {
    const preference = await api<{ id: string; init_point: string; sandbox_init_point: string }>('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST', headers: { ...mpHeaders(), 'X-Idempotency-Key': order.id },
      body: JSON.stringify({
        items: [{ id: product.id, title: product.title, quantity: 1, currency_id: order.currency, unit_price: order.amount / 100, category_id: 'ebooks' }],
        payer: { email: order.email }, external_reference: order.id,
        notification_url: `${siteUrl()}/api/libros/webhooks/mercadopago/`,
        back_urls: { success: back, pending: back, failure: back }, auto_return: 'approved',
      }),
    })
    return { id: preference.id, url: order.mode === 'live' ? preference.init_point : preference.sandbox_init_point }
  }
  const remote = await api<PaypalOrder>(`${ppBase()}/v2/checkout/orders`, {
    method: 'POST', headers: { ...await paypalHeaders(), 'PayPal-Request-Id': order.id },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{ reference_id: order.productId, custom_id: order.id, invoice_id: order.id,
        payee: { merchant_id: required('PAYPAL_MERCHANT_ID') },
        description: product.title, amount: { currency_code: order.currency, value: (order.amount / 100).toFixed(2) } }],
      payment_source: { paypal: { experience_context: { brand_name: 'Italicia', shipping_preference: 'NO_SHIPPING', user_action: 'PAY_NOW', return_url: back, cancel_url: `${back}&cancelado=1` } } },
    }),
  })
  const url = remote.links?.find(link => link.rel === 'payer-action' || link.rel === 'approve')?.href
  if (!url) throw new Error('Checkout URL missing')
  return { id: remote.id, url }
}

export async function getMpPayment(id: string) {
  if (!/^\d{1,30}$/.test(id)) throw new Error('Invalid payment ID')
  return api<MpPayment>(`https://api.mercadopago.com/v1/payments/${id}`, { headers: mpHeaders() })
}
export async function mpPreferenceMatches(payment: MpPayment, order: Order) {
  if (!payment.order?.id || !order.providerOrderId) return false
  const merchantOrder = await api<{ preference_id: string }>(`https://api.mercadopago.com/merchant_orders/${encodeURIComponent(String(payment.order.id))}`, { headers: mpHeaders() })
  return merchantOrder.preference_id === order.providerOrderId
}
export async function findMpPayments(order: Order) {
  const query = new URLSearchParams({ external_reference: order.id, sort: 'date_created', criteria: 'desc', limit: '10' })
  return (await api<{ results: MpPayment[] }>(`https://api.mercadopago.com/v1/payments/search?${query}`, { headers: mpHeaders() })).results
}
export async function getPaypalOrder(id: string) {
  if (!/^[A-Z0-9]{1,40}$/.test(id)) throw new Error('Invalid PayPal order')
  return api<PaypalOrder>(`${ppBase()}/v2/checkout/orders/${id}`, { headers: await paypalHeaders() })
}
export async function capturePaypalOrder(order: Order) {
  return api<PaypalOrder>(`${ppBase()}/v2/checkout/orders/${order.providerOrderId}/capture`, {
    method: 'POST', headers: { ...await paypalHeaders(), 'PayPal-Request-Id': `capture-${order.id}` }, body: '{}',
  })
}
export async function getPaypalCapture(id: string) {
  if (!/^[A-Z0-9]{1,40}$/.test(id)) throw new Error('Invalid PayPal capture')
  return api<PaypalCapture>(`${ppBase()}/v2/payments/captures/${id}`, { headers: await paypalHeaders() })
}
export async function verifyPaypalWebhook(headers: Headers, event: unknown) {
  const mappings = { auth_algo: 'paypal-auth-algo', cert_url: 'paypal-cert-url', transmission_id: 'paypal-transmission-id', transmission_sig: 'paypal-transmission-sig', transmission_time: 'paypal-transmission-time' }
  const info = Object.fromEntries(Object.entries(mappings).map(([key, header]) => [key, headers.get(header)]))
  if (Object.values(info).some(value => !value)) return false
  // PayPal verifies the certificate; this server never fetches a user-controlled certificate URL.
  const verification = await api<{ verification_status: string }>(`${ppBase()}/v1/notifications/verify-webhook-signature`, {
    method: 'POST', headers: await paypalHeaders(), body: JSON.stringify({ ...info, webhook_id: required('PAYPAL_WEBHOOK_ID'), webhook_event: event }),
  })
  return verification.verification_status === 'SUCCESS'
}

export function validCheckoutUrl(value: string, provider: Order['provider'], mode: Order['mode']) {
  try {
    const url = new URL(value)
    const hosts = provider === 'paypal' ? [mode === 'live' ? 'www.paypal.com' : 'www.sandbox.paypal.com'] : ['www.mercadopago.com.ar', 'www.mercadopago.com', 'sandbox.mercadopago.com.ar']
    return url.protocol === 'https:' && !url.username && !url.password && hosts.includes(url.hostname)
  } catch { return false }
}
