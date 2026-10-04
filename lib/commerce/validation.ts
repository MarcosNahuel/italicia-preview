import { cents } from './products'
import type { Order } from './orders'

export interface MpPayment {
  id: string | number
  status: string
  external_reference: string
  transaction_amount: number
  transaction_amount_refunded?: number
  currency_id: string
  collector_id: string | number
  live_mode: boolean
  order?: { id?: string | number }
}
export interface PaypalCapture {
  id: string
  status: string
  amount: { currency_code: string; value: string }
}
export interface PaypalOrder {
  id: string
  status: string
  purchase_units?: Array<{
    custom_id?: string
    invoice_id?: string
    amount?: { currency_code: string; value: string }
    payee?: { merchant_id?: string }
    payments?: { captures?: PaypalCapture[] }
  }>
  links?: Array<{ rel: string; href: string }>
}

export function validateMpPayment(order: Order, payment: MpPayment, merchantId: string): boolean {
  return order.provider === 'mercadoPago' && payment.status === 'approved' &&
    payment.external_reference === order.id && cents(payment.transaction_amount) === order.amount &&
    payment.currency_id === order.currency && String(payment.collector_id) === merchantId &&
    payment.live_mode === (order.mode === 'live') &&
    (payment.transaction_amount_refunded ?? 0) === 0 &&
    (!order.paymentId || order.paymentId === String(payment.id))
}

export function validatePaypalPayment(order: Order, remote: PaypalOrder, capture: PaypalCapture, merchantId: string): boolean {
  const units = remote.purchase_units
  if (order.provider !== 'paypal' || remote.id !== order.providerOrderId || remote.status !== 'COMPLETED' || !units || units.length !== 1) return false
  const unit = units[0], captures = unit.payments?.captures
  return unit.custom_id === order.id && unit.invoice_id === order.id && unit.payee?.merchant_id === merchantId &&
    cents(unit.amount?.value) === order.amount && unit.amount?.currency_code === order.currency &&
    !!captures && captures.length === 1 && captures[0].id === capture.id &&
    capture.status === 'COMPLETED' && cents(capture.amount?.value) === order.amount && capture.amount?.currency_code === order.currency &&
    (!order.paymentId || order.paymentId === capture.id)
}
