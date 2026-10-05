import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { currencyFor, getProduct, normalizeEmail, cents } from '../lib/commerce/products'
import { orderAccess, verifyOrderAccess, downloadToken, verifyDownloadToken, verifyMpSignature, newOrderId } from '../lib/commerce/security'
import { validateMpPayment, validatePaypalPayment } from '../lib/commerce/validation'
import { confirmPayment, deliverEmail } from '../lib/commerce/fulfillment'
import { checkoutEmailAllowed, commerceStoragePrefix, configurationIssues, sandboxTesting } from '../lib/commerce/config'
import type { Order, OrderStore } from '../lib/commerce/orders'
import type { MpPayment, PaypalOrder, PaypalCapture } from '../lib/commerce/validation'
import { paypalWebhookReference } from '../lib/commerce/paypal-events'
import { createProviderCheckout, verifiedMpTestMerchant } from '../lib/commerce/providers'

const secret = 'test-only-secret-with-more-than-32-characters'
const order = (provider: Order['provider'] = 'mercadoPago'): Order => ({ version: 1, id: newOrderId(), productId: 'lectura-a1', provider, email: 'buyer@example.com', amount: provider === 'mercadoPago' ? 990000 : 1000, currency: currencyFor(provider), mode: 'sandbox', createdAt: new Date().toISOString(), status: 'pending', providerOrderId: 'ABC123' })

class MemoryStore implements OrderStore {
  orders = new Map<string, Order>()
  payments = new Map<string, string>()
  index = new Map<string, string>()
  async create(value: Order) { if (this.orders.has(value.id)) throw new Error('duplicate'); this.orders.set(value.id, structuredClone(value)) }
  async read(id: string) { return structuredClone(this.orders.get(id) ?? null) }
  async update(id: string, change: (value: Order) => Order) { const next = change(structuredClone(this.orders.get(id)!)); this.orders.set(id, structuredClone(next)); return next }
  async claimPayment(provider: Order['provider'], paymentId: string, orderId: string) { const key = `${provider}:${paymentId}`; if (this.payments.has(key) && this.payments.get(key) !== orderId) throw new Error('payment reused'); this.payments.set(key, orderId) }
  async indexProviderOrder(provider: Order['provider'], remoteId: string, id: string) { this.index.set(`${provider}:${remoteId}`, id) }
  async findByProviderOrder(provider: Order['provider'], remoteId: string) { return this.index.get(`${provider}:${remoteId}`) ?? null }
  async findByPayment(provider: Order['provider'], remoteId: string) { return this.payments.get(`${provider}:${remoteId}`) ?? null }
}

test('the four prices are the confirmed catalog prices, with no A2 paid product', () => {
  assert.deepEqual(getProduct('lectura-a1')?.amounts, { ARS: 990000, USD: 1000 })
  assert.deepEqual(getProduct('manual-a1')?.amounts, { ARS: 1990000, USD: 1300 })
  assert.equal(getProduct('unidades-a2'), null)
  assert.equal(cents('13.00'), 1300)
  assert.equal(cents('13.001'), null)
  assert.equal(cents('-10'), null)
  assert.equal(normalizeEmail(' Buyer@Example.com '), 'buyer@example.com')
  assert.equal(normalizeEmail('buyer@example.com\r\nBcc:x@example.com'), null)
})

test('Mercado Pago requires an approved exact payment from the configured merchant and mode', () => {
  const expected = order()
  const payment: MpPayment = { id: 123, external_reference: expected.id, transaction_amount: 9900, currency_id: 'ARS', collector_id: 456, live_mode: false, status: 'approved' }
  assert.equal(validateMpPayment(expected, payment, '456'), true)
  for (const mutation of [{ status: 'pending' }, { status: 'rejected' }, { status: 'refunded' }, { transaction_amount: 10 }, { currency_id: 'USD' }, { collector_id: 999 }, { live_mode: true }, { external_reference: newOrderId() }, { transaction_amount_refunded: 1 }]) assert.equal(validateMpPayment(expected, { ...payment, ...mutation }, '456'), false)
})

test('MP Sandbox keeps the real delivery inbox out of the fictitious payer account', async () => {
  const previousFetch = globalThis.fetch
  const keys = ['MP_ACCESS_TOKEN', 'BOOK_TOKEN_SECRET'] as const
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]))
  Object.assign(process.env, { MP_ACCESS_TOKEN: 'test-only-token', BOOK_TOKEN_SECRET: secret })
  const requests: Record<string, unknown>[] = []
  globalThis.fetch = (async (url, init) => {
    assert.equal(url, 'https://api.mercadopago.com/checkout/preferences')
    assert.equal(init?.method, 'POST')
    requests.push(JSON.parse(String(init?.body)))
    return Response.json({ id: 'PREF1', init_point: 'https://www.mercadopago.com.ar/test', sandbox_init_point: 'https://sandbox.mercadopago.com.ar/test' })
  }) as typeof fetch
  try {
    const expected = { ...order(), email: 'italicia.edu@gmail.com' }
    assert.equal((await createProviderCheckout(expected)).url, 'https://sandbox.mercadopago.com.ar/test')
    assert.equal(requests[0].payer, undefined)
    assert.equal(requests[0].external_reference, expected.id)
    assert.equal((await createProviderCheckout({ ...expected, mode: 'live' })).url, 'https://www.mercadopago.com.ar/test')
    assert.deepEqual(requests[1].payer, { email: expected.email })
  } finally {
    globalThis.fetch = previousFetch
    for (const key of keys) { if (previous[key] === undefined) delete process.env[key]; else process.env[key] = previous[key] }
  }
})

test('an MP live_mode flag needs API-verified fictitious merchant credentials inside Preview Sandbox', async () => {
  const previousFetch = globalThis.fetch
  const keys = ['VERCEL_ENV', 'BOOK_PAYMENT_MODE', 'BOOK_SANDBOX_TEST_ENABLED', 'BOOK_SANDBOX_TEST_EMAIL', 'MP_ACCESS_TOKEN', 'MP_MERCHANT_ID'] as const
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]))
  Object.assign(process.env, { VERCEL_ENV: 'preview', BOOK_PAYMENT_MODE: 'sandbox', BOOK_SANDBOX_TEST_ENABLED: 'true', BOOK_SANDBOX_TEST_EMAIL: 'italicia.edu@gmail.com', MP_ACCESS_TOKEN: 'test-only-token', MP_MERCHANT_ID: '456' })
  let merchant = { id: 456, tags: ['test_user'] }
  globalThis.fetch = (async (url) => { assert.equal(url, 'https://api.mercadopago.com/users/me'); return Response.json(merchant) }) as typeof fetch
  try {
    const expected = order()
    const payment: MpPayment = { id: 123, external_reference: expected.id, transaction_amount: 9900, currency_id: 'ARS', collector_id: 456, live_mode: true, status: 'approved' }
    assert.equal(validateMpPayment(expected, payment, '456'), false)
    assert.equal(await verifiedMpTestMerchant(payment), true)
    assert.equal(validateMpPayment(expected, payment, '456', await verifiedMpTestMerchant(payment)), true)
    assert.equal(validateMpPayment(expected, { ...payment, transaction_amount: 1 }, '456', true), false)
    assert.equal(validateMpPayment({ ...expected, mode: 'live' }, { ...payment, live_mode: false }, '456', true), false)
    merchant = { id: 456, tags: [] }
    assert.equal(await verifiedMpTestMerchant(payment), false)
    merchant = { id: 999, tags: ['test_user'] }
    assert.equal(await verifiedMpTestMerchant(payment), false)
    process.env.VERCEL_ENV = 'production'
    assert.equal(await verifiedMpTestMerchant(payment), false)
    process.env.VERCEL_ENV = 'preview'; process.env.BOOK_PAYMENT_MODE = 'live'
    assert.equal(await verifiedMpTestMerchant(payment), false)
  } finally {
    globalThis.fetch = previousFetch
    for (const key of keys) { if (previous[key] === undefined) delete process.env[key]; else process.env[key] = previous[key] }
  }
})

test('PayPal approval alone and incorrect amounts, merchants, references, refunds, or reused captures cannot deliver', () => {
  const expected = order('paypal')
  const capture: PaypalCapture = { id: 'CAPTURE1', status: 'COMPLETED', amount: { currency_code: 'USD', value: '10.00' } }
  const remote: PaypalOrder = { id: 'ABC123', status: 'COMPLETED', purchase_units: [{ custom_id: expected.id, invoice_id: expected.id, payee: { merchant_id: 'SELLER' }, amount: { currency_code: 'USD', value: '10.00' }, payments: { captures: [capture] } }] }
  assert.equal(validatePaypalPayment(expected, remote, capture, 'SELLER'), true)
  assert.equal(validatePaypalPayment(expected, { ...remote, status: 'APPROVED' }, capture, 'SELLER'), false)
  assert.equal(validatePaypalPayment(expected, remote, capture, 'OTHER'), false)
  assert.equal(validatePaypalPayment(expected, remote, { ...capture, status: 'REFUNDED' }, 'SELLER'), false)
  assert.equal(validatePaypalPayment(expected, remote, { ...capture, amount: { currency_code: 'USD', value: '1.00' } }, 'SELLER'), false)
  assert.equal(validatePaypalPayment(expected, { ...remote, purchase_units: [{ ...remote.purchase_units![0], custom_id: newOrderId() }] }, capture, 'SELLER'), false)
  assert.equal(validatePaypalPayment({ ...expected, paymentId: 'OTHER' }, remote, capture, 'SELLER'), false)
})

test('MP signatures reject missing, modified and mismatched notifications', () => {
  const manifest = 'id:123;request-id:req-1;ts:1791120000;'
  const signature = createHmac('sha256', secret).update(manifest).digest('hex')
  const headers = new Headers({ 'x-signature': `ts=1791120000,v1=${signature}`, 'x-request-id': 'req-1' })
  assert.equal(verifyMpSignature(headers, '123', secret), true)
  assert.equal(verifyMpSignature(headers, '124', secret), false)
  assert.equal(verifyMpSignature(headers, '123', 'wrong'), false)
  assert.equal(verifyMpSignature(new Headers(), '123', secret), false)
})

test('PayPal refund notices resolve the original capture even without an order ID', async () => {
  const store = new MemoryStore(), expected = order('paypal')
  await store.create(expected)
  await confirmPayment(store, expected.id, 'CAPTURE1')
  const refund = { event_type: 'PAYMENT.CAPTURE.REFUNDED', resource: { id: 'REFUND1', supplementary_data: { related_ids: { capture_id: 'CAPTURE1' } } } }
  const reference = paypalWebhookReference(refund, 'sandbox')
  assert.equal(reference.orderId, undefined)
  assert.equal(await store.findByPayment('paypal', reference.captureId!), expected.id)
  assert.equal(await store.findByPayment('mercadoPago', reference.captureId!), null)
  assert.equal(paypalWebhookReference({ event_type: refund.event_type, resource: { id: 'REFUND1' } }, 'sandbox').captureId, undefined)
  const linkOnly = (href: string) => ({ event_type: refund.event_type, resource: { id: 'REFUND1', links: [{ rel: 'up', href }] } })
  assert.equal(paypalWebhookReference(linkOnly('https://api.sandbox.paypal.com/v2/payments/captures/CAPTURE1'), 'sandbox').captureId, 'CAPTURE1')
  for (const href of ['https://foreign.example/v2/payments/captures/CAPTURE1', 'https://api.sandbox.paypal.com.evil.example/v2/payments/captures/CAPTURE1', 'https://api.sandbox.paypal.com/v2/payments/captures/CAPTURE1?redirect=x', 'http://api.sandbox.paypal.com/v2/payments/captures/CAPTURE1']) assert.equal(paypalWebhookReference(linkOnly(href), 'sandbox').captureId, undefined)
  assert.equal(paypalWebhookReference(linkOnly('https://api.sandbox.paypal.com/v2/payments/captures/CAPTURE1'), 'live').captureId, undefined)
})

test('download tokens expire, cannot cross orders, and status tokens never authorize downloads', () => {
  const expected = order()
  const paidAt = '2026-10-04T12:00:00.000Z'
  const token = downloadToken(expected.id, paidAt, secret)
  assert.equal(verifyDownloadToken(token, secret, Date.parse('2026-10-05')), expected.id)
  assert.equal(verifyDownloadToken(token, secret, Date.parse('2026-11-04')), null)
  assert.equal(verifyDownloadToken(token.replace(expected.id, newOrderId()), secret, Date.parse('2026-10-05')), null)
  assert.equal(verifyDownloadToken(token, 'wrong', Date.parse('2026-10-05')), null)
  const access = orderAccess(expected.id, secret)
  assert.equal(verifyOrderAccess(expected.id, access, secret), true)
  assert.equal(verifyOrderAccess(newOrderId(), access, secret), false)
  assert.equal(verifyDownloadToken(access, secret), null)
})

test('no email before approval; duplicate simultaneous events send once; one payment cannot fulfill another order', async () => {
  const store = new MemoryStore(), expected = order()
  await store.create(expected)
  let sent = 0
  const send = async () => { sent++; return 'email-1' }
  await deliverEmail(store, expected.id, send)
  assert.equal(sent, 0)
  await Promise.all([confirmPayment(store, expected.id, '123'), confirmPayment(store, expected.id, '123')])
  await Promise.all(Array.from({ length: 5 }, () => deliverEmail(store, expected.id, send)))
  assert.equal(sent, 1)
  const second = order(); await store.create(second)
  await assert.rejects(() => confirmPayment(store, second.id, '123'))
  assert.equal((await store.read(second.id))?.status, 'pending')
  await store.update(expected.id, current => ({ ...current, status: 'revoked' }))
  await confirmPayment(store, expected.id, '123')
  assert.equal((await store.read(expected.id))?.status, 'revoked')
})

test('mail failures can retry, old ambiguous attempts require review, paidAt remains stable', async () => {
  const store = new MemoryStore(), expected = order()
  await store.create(expected); await confirmPayment(store, expected.id, '999')
  const firstPaidAt = (await store.read(expected.id))!.paidAt
  await assert.rejects(() => deliverEmail(store, expected.id, async () => { throw new Error('temporary outage') }))
  assert.equal((await store.read(expected.id))?.emailLeaseUntil, undefined)
  await confirmPayment(store, expected.id, '999')
  assert.equal((await store.read(expected.id))?.paidAt, firstPaidAt)
  let sent = 0
  const later = Date.parse((await store.read(expected.id))!.emailFirstAttemptAt!) + 24 * 60 * 60 * 1000
  await deliverEmail(store, expected.id, async () => { sent++; return 'mail' }, later)
  assert.equal(sent, 0)
  assert.equal((await store.read(expected.id))?.emailNeedsReview, true)
})

test('provider buttons stay inactive without configuration and verified delivery', () => {
  const old = process.env.BOOK_DELIVERY_VERIFIED
  process.env.BOOK_DELIVERY_VERIFIED = 'false'
  try { assert.ok(configurationIssues('manual-a1', 'mercadoPago').includes('delivery-not-verified')); assert.ok(configurationIssues('lectura-a1', 'paypal').includes('delivery-not-verified')) }
  finally { if (old === undefined) delete process.env.BOOK_DELIVERY_VERIFIED; else process.env.BOOK_DELIVERY_VERIFIED = old }
})

test('Sandbox testing is limited to Preview and the owner inbox; storage never overlaps live orders', () => {
  const keys = ['VERCEL_ENV', 'BOOK_PAYMENT_MODE', 'BOOK_DELIVERY_VERIFIED', 'BOOK_SANDBOX_TEST_ENABLED', 'BOOK_SANDBOX_TEST_EMAIL'] as const
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]))
  try {
    Object.assign(process.env, { VERCEL_ENV: 'preview', BOOK_PAYMENT_MODE: 'sandbox', BOOK_DELIVERY_VERIFIED: 'false', BOOK_SANDBOX_TEST_ENABLED: 'true', BOOK_SANDBOX_TEST_EMAIL: 'italicia.edu@gmail.com' })
    assert.equal(sandboxTesting(), true)
    assert.equal(checkoutEmailAllowed('italicia.edu@gmail.com'), true)
    assert.equal(checkoutEmailAllowed('student@example.com'), false)
    assert.equal(commerceStoragePrefix(), 'sandbox/')
    assert.equal(configurationIssues('manual-a1', 'paypal').includes('delivery-not-verified'), false)
    process.env.VERCEL_ENV = 'production'
    assert.equal(sandboxTesting(), false)
    assert.equal(checkoutEmailAllowed('italicia.edu@gmail.com'), false)
    assert.ok(configurationIssues('manual-a1', 'paypal').includes('sandbox-in-production'))
    assert.ok(configurationIssues('manual-a1', 'paypal').includes('delivery-not-verified'))
    process.env.VERCEL_ENV = 'preview'
    process.env.BOOK_SANDBOX_TEST_EMAIL = 'student@example.com'
    assert.equal(sandboxTesting(), false)
    process.env.BOOK_PAYMENT_MODE = 'live'
    assert.equal(commerceStoragePrefix(), '')
    assert.equal(sandboxTesting(), false)
    assert.ok(configurationIssues('manual-a1', 'paypal').includes('live-in-preview'))
  } finally {
    for (const key of keys) { if (previous[key] === undefined) delete process.env[key]; else process.env[key] = previous[key] }
  }
})

test('HTTP routes reject foreign origins, disabled purchases, forged downloads and unauthenticated jobs', async () => {
  const checkout = await import('../app/api/libros/checkout/route')
  const download = await import('../app/api/libros/descarga/route')
  const job = await import('../app/api/libros/reconciliar/route')
  const previous = { secret: process.env.BOOK_TOKEN_SECRET, verified: process.env.BOOK_DELIVERY_VERIFIED }
  process.env.BOOK_TOKEN_SECRET = secret
  process.env.BOOK_DELIVERY_VERIFIED = 'false'
  try {
    const url = 'https://www.italicia.com/api/libros/checkout/'
    const data = { productId: 'manual-a1', provider: 'mercadoPago', email: 'buyer@example.com', emailConfirmation: 'buyer@example.com', amount: 1 }
    assert.equal((await checkout.POST(new Request(url, { method: 'POST', headers: { origin: 'https://foreign.example' }, body: JSON.stringify(data) }))).status, 403)
    assert.equal((await checkout.POST(new Request(url, { method: 'POST', headers: { origin: 'https://www.italicia.com' }, body: '[]' }))).status, 400)
    assert.equal((await checkout.POST(new Request(url, { method: 'POST', headers: { origin: 'https://www.italicia.com' }, body: JSON.stringify(data) }))).status, 503)
    const refused = await download.GET(new Request('https://www.italicia.com/api/libros/descarga/?token=forged'))
    assert.equal(refused.status, 403)
    assert.equal(refused.headers.get('cache-control'), 'private, no-store, max-age=0')
    assert.equal((await job.GET(new Request('https://www.italicia.com/api/libros/reconciliar/'))).status, 401)
  } finally {
    if (previous.secret === undefined) delete process.env.BOOK_TOKEN_SECRET; else process.env.BOOK_TOKEN_SECRET = previous.secret
    if (previous.verified === undefined) delete process.env.BOOK_DELIVERY_VERIFIED; else process.env.BOOK_DELIVERY_VERIFIED = previous.verified
  }
})
