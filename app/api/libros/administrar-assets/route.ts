import { put, get, del, BlobPreconditionFailedError } from '@vercel/blob'
import { createHash } from 'node:crypto'
import { getProduct } from '@/lib/commerce/products'
import { equalSecret, validOrderId, newOrderId } from '@/lib/commerce/security'
import { json } from '@/lib/commerce/http'

export const runtime = 'nodejs'
export const maxDuration = 300
// Temporarily enabled for initial migration only. Defaults to disabled, including on previews.
export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET
  if (process.env.BOOK_ASSET_UPLOAD_ENABLED !== 'true' || !secret || !equalSecret(request.headers.get('authorization') ?? '', `Bearer ${secret}`)) return json({ error: 'Unauthorized' }, 401)
  const params = new URL(request.url).searchParams
  const auth = { access: 'private' as const, storeId: process.env.BLOB_STORE_ID }
  if (params.get('action') === 'verify-store') {
    const path = `system/migration-test-${newOrderId()}.json`
    const first = await put(path, '{"version":1}', { ...auth, addRandomSuffix: false, allowOverwrite: false })
    await put(path, '{"version":2}', { ...auth, addRandomSuffix: false, ifMatch: first.etag })
    let rejectedStaleWrite = false
    try { await put(path, '{"version":3}', { ...auth, addRandomSuffix: false, ifMatch: first.etag }) }
    catch (error) { if (!(error instanceof BlobPreconditionFailedError)) throw error; rejectedStaleWrite = true }
    const latest = await get(path, { ...auth, useCache: false })
    const value = latest?.statusCode === 200 ? await new Response(latest.stream).json() : null
    await del(path, auth)
    return json({ consistentRead: value?.version === 2, rejectedStaleWrite })
  }
  const product = getProduct(params.get('productId') ?? '')
  const uploadId = params.get('uploadId') ?? ''
  if (!product || !validOrderId(uploadId)) return json({ error: 'Invalid upload' }, 400)
  const prefix = `migration-parts/${uploadId}/`
  if (params.get('action') === 'part') {
    const part = params.get('part') ?? ''
    if (!/^\d$/.test(part) || Number(request.headers.get('content-length') ?? 0) > 2_000_000) return json({ error: 'Invalid part' }, 400)
    const bytes = Buffer.from(await request.arrayBuffer())
    if (bytes.length > 2_000_000 || !equalSecret(request.headers.get('x-content-sha256') ?? '', createHash('sha256').update(bytes).digest('hex'))) return json({ error: 'Integrity mismatch' }, 400)
    await put(`${prefix}${part}`, bytes, { ...auth, addRandomSuffix: false, allowOverwrite: false })
    return json({ part: Number(part), size: bytes.length })
  }
  const body = await request.json() as { parts?: number }
  if (!Number.isInteger(body.parts) || !body.parts || body.parts < 1 || body.parts > 10) return json({ error: 'Invalid upload' }, 400)
  const parts: Buffer[] = []
  for (let i = 0; i < body.parts; i++) {
    const part = await get(`${prefix}${i}`, { ...auth, useCache: false })
    if (!part || part.statusCode !== 200) return json({ error: 'Missing part' }, 400)
    parts.push(Buffer.from(await new Response(part.stream).arrayBuffer()))
  }
  const bytes = Buffer.concat(parts)
  if (bytes.length > 20_000_000 || bytes.subarray(0, 5).toString() !== '%PDF-') return json({ error: 'Invalid PDF' }, 400)
  const hash = createHash('sha256').update(bytes).digest('hex')
  if (!equalSecret(request.headers.get('x-content-sha256') ?? '', hash)) return json({ error: 'Integrity mismatch' }, 400)
  const blob = await put(`books/${product.id}.pdf`, bytes, { ...auth, contentType: 'application/pdf', addRandomSuffix: false, allowOverwrite: false, multipart: true })
  await del(parts.map((_, i) => `${prefix}${i}`), auth)
  return json({ pathname: blob.pathname, size: bytes.length, sha256: hash })
}
