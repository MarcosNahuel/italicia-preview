import 'server-only'
import { getProduct, type Provider } from './products'

export function required(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing configuration: ${name}`)
  return value
}

export function siteUrl() {
  // Never construct provider callbacks from an untrusted Host header.
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL?.endsWith('.vercel.app')) return `https://${process.env.VERCEL_URL}`
  return 'https://www.italicia.com'
}

export function paymentMode(): 'live' | 'sandbox' {
  return process.env.BOOK_PAYMENT_MODE === 'live' ? 'live' : 'sandbox'
}

export function configurationIssues(productId: string, provider: Provider): string[] {
  const product = getProduct(productId)
  if (!product) return ['unknown-product']
  const names = ['BOOK_TOKEN_SECRET', 'RESEND_API_KEY', 'BOOK_EMAIL_FROM', product.pdfEnv]
  names.push(...(provider === 'mercadoPago'
    ? ['MP_ACCESS_TOKEN', 'MP_WEBHOOK_SECRET', 'MP_MERCHANT_ID']
    : ['PAYPAL_CLIENT_ID', 'PAYPAL_CLIENT_SECRET', 'PAYPAL_WEBHOOK_ID', 'PAYPAL_MERCHANT_ID']))
  const issues = names.filter(name => !process.env[name]?.trim())
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) issues.push('private-blob-connection')
  if ((process.env.BOOK_TOKEN_SECRET?.length ?? 0) < 32) issues.push('BOOK_TOKEN_SECRET-length')
  const pdf = process.env[product.pdfEnv] ?? ''
  if (pdf && !/^books\/[a-zA-Z0-9_./-]+\.pdf$/.test(pdf)) issues.push('private-pdf-path')
  if (process.env.BOOK_DELIVERY_VERIFIED !== 'true') issues.push('delivery-not-verified')
  if (process.env[provider === 'mercadoPago' ? 'BOOK_CHECKOUT_MP_ENABLED' : 'BOOK_CHECKOUT_PAYPAL_ENABLED'] !== 'true') issues.push('provider-disabled')
  if (paymentMode() !== 'live' && process.env.VERCEL_ENV === 'production') issues.push('sandbox-in-production')
  return issues
}

export function checkoutReady(productId: string, provider: Provider) {
  return configurationIssues(productId, provider).length === 0
}
