import { equalSecret } from '@/lib/commerce/security'
import { orderBatch, orderStore, reconciliationCursor, saveReconciliationCursor } from '@/lib/commerce/store'
import { reconcileOrder } from '@/lib/commerce/service'
import { json } from '@/lib/commerce/http'

export const runtime = 'nodejs'
export const maxDuration = 300
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || !equalSecret(request.headers.get('authorization') ?? '', `Bearer ${secret}`)) return json({ error: 'Unauthorized' }, 401)
  // A cursor allows operations to process additional batches without exposing customer records.
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) return json({ enabled: false })
  try {
    const explicitCursor = new URL(request.url).searchParams.get('cursor')
    const cursor = explicitCursor ?? await reconciliationCursor()
    const batch = await orderBatch(cursor)
    let checked = 0, failed = 0, needsReview = 0
    for (const id of batch.ids) {
      const order = await orderStore.read(id)
      if (!order || order.status === 'revoked' || !order.providerOrderId) continue
      // Keep retries bounded. Mature paid deliveries refresh on download and signed notifications.
      if (order.emailSentAt || (order.status === 'pending' && Date.now() - Date.parse(order.createdAt) > 7 * 86400_000)) continue
      try { const current = await reconcileOrder(order); if (current.emailNeedsReview) needsReview++; checked++ }
      catch { failed++ }
    }
    if (explicitCursor === null) await saveReconciliationCursor(batch.cursor)
    return json({ checked, failed, needsReview, nextCursor: batch.cursor })
  } catch { return json({ error: 'Retry reconciliation' }, 503) }
}
