import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'

export const DOWNLOAD_LIFETIME_SECONDS = 30 * 24 * 60 * 60
export function validOrderId(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value)
}
export const newOrderId = () => randomUUID()

function digest(secret: string, message: string) {
  return createHmac('sha256', secret).update(message).digest('base64url')
}
export function equalSecret(actual: string, expected: string) {
  const a = Buffer.from(actual), b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}
export function orderAccess(id: string, secret: string) {
  return digest(secret, `status:v1:${id}`)
}
export function verifyOrderAccess(id: string, token: string, secret: string) {
  return validOrderId(id) && equalSecret(token, orderAccess(id, secret))
}
export function downloadToken(id: string, paidAt: string, secret: string) {
  const expiry = Math.floor(Date.parse(paidAt) / 1000) + DOWNLOAD_LIFETIME_SECONDS
  return `${id}.${expiry}.${digest(secret, `download:v1:${id}:${expiry}`)}`
}
export function verifyDownloadToken(token: string, secret: string, now = Date.now()) {
  if (token.length > 200) return null
  const [id, expiry, signature, extra] = token.split('.')
  if (extra || !id || !expiry || !signature || !validOrderId(id) || !/^\d{10}$/.test(expiry)) return null
  if (Number(expiry) * 1000 <= now) return null
  return equalSecret(signature, digest(secret, `download:v1:${id}:${expiry}`)) ? id : null
}

export function verifyMpSignature(headers: Headers, dataId: string, secret: string) {
  const signature = headers.get('x-signature') ?? ''
  const requestId = headers.get('x-request-id') ?? ''
  const parts = Object.fromEntries(signature.split(',').map(part => part.trim().split('=')))
  if (!/^\d{10,13}$/.test(parts.ts ?? '') || !/^[0-9a-f]{64}$/.test(parts.v1 ?? '') || !requestId || !/^[a-zA-Z0-9_-]{1,100}$/.test(dataId)) return false
  // Mercado Pago requires the data.id from the query string, lowercased.
  // Do not reject legitimate provider retries on timestamp age; payment state is reread from its API.
  const manifest = `id:${dataId.toLowerCase()};request-id:${requestId};ts:${parts.ts};`
  return equalSecret(parts.v1, createHmac('sha256', secret).update(manifest).digest('hex'))
}
