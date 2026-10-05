import 'server-only'
import { required, paymentMode } from './config'
import { orderStore } from './store'
import { confirmPayment, deliverEmail } from './fulfillment'
import { sendBookEmail } from './email'
import { capturePaypalOrder, findMpPayments, getMpPayment, getPaypalCapture, getPaypalOrder, mpPreferenceMatches, verifiedMpTestMerchant } from './providers'
import { validateMpPayment, validatePaypalPayment } from './validation'
import type { MpPayment } from './validation'
import type { Order } from './orders'

async function processMpPayment(payment: MpPayment, expectedId?: string, sendEmail = true) {
  const id = payment.external_reference
  if (expectedId && id !== expectedId) return null
  const order = await orderStore.read(id)
  if (!order || order.provider !== 'mercadoPago') return null
  if (order.mode !== paymentMode() || (order.mode === 'sandbox' && process.env.VERCEL_ENV === 'production')) throw new Error('Payment environment mismatch')
  if (!(await mpPreferenceMatches(payment, order))) {
    if (order.status === 'paid') throw new Error('Payment preference mismatch')
    return order
  }
  if (['refunded', 'charged_back', 'cancelled'].includes(payment.status) || (payment.transaction_amount_refunded ?? 0) > 0) {
    if (order.paymentId === String(payment.id)) return orderStore.update(id, current => ({ ...current, status: 'revoked' }))
    return order
  }
  const testMerchant = order.mode === 'sandbox' && payment.live_mode === true ? await verifiedMpTestMerchant(payment) : false
  if (!validateMpPayment(order, payment, required('MP_MERCHANT_ID'), testMerchant)) {
    if (order.status === 'paid') throw new Error('Payment no longer matches')
    return order
  }
  const confirmed = await confirmPayment(orderStore, id, String(payment.id))
  return sendEmail ? deliverEmail(orderStore, id, sendBookEmail) : confirmed
}

export async function handleMpPayment(id: string) {
  const payment = await getMpPayment(id)
  // Notifications for unrelated merchant sales must not become website orders.
  if (!/^[0-9a-f-]{36}$/.test(payment.external_reference ?? '')) return null
  return processMpPayment(payment)
}

export async function reconcileOrder(order: Order, sendEmail = true) {
  if (order.mode !== paymentMode() || (order.mode === 'sandbox' && process.env.VERCEL_ENV === 'production')) throw new Error('Payment environment mismatch')
  if (!order.providerOrderId || order.status === 'revoked') return order
  if (order.provider === 'mercadoPago') {
    const payments = order.paymentId ? [await getMpPayment(order.paymentId)] : await findMpPayments(order)
    for (const payment of payments) {
      const result = await processMpPayment(payment, order.id, sendEmail)
      if (result?.status !== 'pending') return result ?? order
    }
    return order
  }
  let remote = await getPaypalOrder(order.providerOrderId)
  const unit = remote.purchase_units?.[0]
  if (remote.id !== order.providerOrderId || remote.purchase_units?.length !== 1 || unit?.custom_id !== order.id || unit.invoice_id !== order.id || unit.payee?.merchant_id !== required('PAYPAL_MERCHANT_ID')) {
    if (order.status === 'paid') throw new Error('Payment no longer matches')
    return order
  }
  if (remote.status === 'APPROVED') {
    try { remote = await capturePaypalOrder(order) }
    catch { remote = await getPaypalOrder(order.providerOrderId) }
  }
  const captureId = remote.purchase_units?.[0]?.payments?.captures?.[0]?.id
  if (!captureId) {
    if (order.status === 'paid') throw new Error('Paid capture missing')
    return order
  }
  const capture = await getPaypalCapture(captureId)
  if (['REFUNDED', 'PARTIALLY_REFUNDED', 'DECLINED', 'FAILED'].includes(capture.status)) {
    if (order.paymentId === capture.id) return orderStore.update(order.id, current => ({ ...current, status: 'revoked' }))
    return order
  }
  if (!validatePaypalPayment(order, remote, capture, required('PAYPAL_MERCHANT_ID'))) {
    if (order.status === 'paid') throw new Error('Payment no longer matches')
    return order
  }
  const confirmed = await confirmPayment(orderStore, order.id, capture.id)
  return sendEmail ? await deliverEmail(orderStore, order.id, sendBookEmail) ?? order : confirmed
}
