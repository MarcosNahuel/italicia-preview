import { required } from '@/lib/commerce/config'
import { verifyMpSignature } from '@/lib/commerce/security'
import { handleMpPayment } from '@/lib/commerce/service'
import { json, smallJson } from '@/lib/commerce/http'

export const runtime = 'nodejs'
export const maxDuration = 90
export async function POST(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get('data.id') ?? ''
    if (!verifyMpSignature(request.headers, id, required('MP_WEBHOOK_SECRET'))) return json({ error: 'Invalid signature' }, 401)
    const body = await smallJson(request)
    const data = body.data as { id?: unknown } | undefined
    if (body.type !== 'payment') return json({ received: true })
    if (String(data?.id ?? '') !== id) return json({ error: 'Resource mismatch' }, 400)
    await handleMpPayment(id)
    return json({ received: true })
  } catch {
    console.error('book-mp-webhook-retry')
    return json({ error: 'Retry notification' }, 503)
  }
}
