import 'server-only'
import { get, put, list, BlobPreconditionFailedError } from '@vercel/blob'
import { commerceStoragePrefix, required } from './config'
import { validOrderId } from './security'
import type { Order, OrderStore } from './orders'
import type { Provider } from './products'

// Prefer the project's short-lived Vercel identity; a static token is optional for local operations.
const auth = () => process.env.BLOB_READ_WRITE_TOKEN
  ? { token: process.env.BLOB_READ_WRITE_TOKEN }
  : { storeId: required('BLOB_STORE_ID') }
const options = () => ({ access: 'private' as const, ...auth() })
const orderPath = (id: string) => {
  if (!validOrderId(id)) throw new Error('Invalid order ID')
  return `${commerceStoragePrefix()}orders/${id}.json`
}
function providerPath(prefix: string, provider: Provider, id: string) {
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(id)) throw new Error('Invalid provider ID')
  return `${commerceStoragePrefix()}${prefix}/${provider}/${id}.json`
}

async function readJson<T>(path: string): Promise<{ value: T; etag: string } | null> {
  const blob = await get(path, { ...options(), useCache: false })
  if (!blob || blob.statusCode !== 200) return null
  return { value: await new Response(blob.stream).json() as T, etag: blob.blob.etag }
}
async function createJson(path: string, value: unknown) {
  return put(path, JSON.stringify(value), { ...options(), contentType: 'application/json', addRandomSuffix: false, allowOverwrite: false })
}
async function uniqueIndex(path: string, orderId: string) {
  try { await createJson(path, { orderId }) }
  catch (error) {
    const existing = await readJson<{ orderId: string }>(path)
    if (!existing || existing.value.orderId !== orderId) throw error
  }
}

export const orderStore: OrderStore = {
  async create(order) { await createJson(orderPath(order.id), order) },
  async read(id) { return (await readJson<Order>(orderPath(id)))?.value ?? null },
  async update(id, change) {
    // Conditional writes prevent simultaneous webhooks from losing updates or claiming two mail deliveries.
    for (let attempt = 0; attempt < 8; attempt++) {
      const current = await readJson<Order>(orderPath(id))
      if (!current) throw new Error('Order not found')
      const next = change(structuredClone(current.value))
      if (next.id !== id || next.email !== current.value.email || next.productId !== current.value.productId || next.provider !== current.value.provider || next.amount !== current.value.amount || next.currency !== current.value.currency || next.mode !== current.value.mode) throw new Error('Immutable order fields changed')
      try {
        await put(orderPath(id), JSON.stringify(next), { ...options(), contentType: 'application/json', addRandomSuffix: false, ifMatch: current.etag })
        return next
      } catch (error) { if (!(error instanceof BlobPreconditionFailedError)) throw error }
    }
    throw new Error('Order update contention')
  },
  async claimPayment(provider, paymentId, orderId) { await uniqueIndex(providerPath('payments', provider, paymentId), orderId) },
  async indexProviderOrder(provider, providerOrderId, orderId) { await uniqueIndex(providerPath('provider-orders', provider, providerOrderId), orderId) },
  async findByProviderOrder(provider, id) { return (await readJson<{ orderId: string }>(providerPath('provider-orders', provider, id)))?.value.orderId ?? null },
  async findByPayment(provider, id) { return (await readJson<{ orderId: string }>(providerPath('payments', provider, id)))?.value.orderId ?? null },
}

export async function orderBatch(cursor?: string) {
  const prefix = `${commerceStoragePrefix()}orders/`
  const batch = await list({ ...auth(), prefix, limit: 5, cursor })
  return { ids: batch.blobs.map(blob => blob.pathname.slice(prefix.length, -5)).filter(validOrderId), cursor: batch.hasMore ? batch.cursor : undefined }
}

export async function reconciliationCursor() {
  return (await readJson<{ cursor?: string }>(`${commerceStoragePrefix()}system/reconciliation.json`))?.value.cursor
}
export async function saveReconciliationCursor(cursor?: string) {
  await put(`${commerceStoragePrefix()}system/reconciliation.json`, JSON.stringify({ cursor }), { ...options(), contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true })
}

export async function privatePdf(path: string) {
  return get(path, { ...options(), useCache: false })
}
