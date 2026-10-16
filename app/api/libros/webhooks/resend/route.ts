import { json } from '@/lib/commerce/http'
import { verifyEmailEvent, handleEmailEvent } from '@/lib/commerce/email-events'
import { orderStore, resendWebhookConfiguration } from '@/lib/commerce/store'
import { sendOwnerAlert } from '@/lib/commerce/email'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: Request) {
  let secret = process.env.RESEND_WEBHOOK_SECRET
  if (!secret) {
    try { secret = (await resendWebhookConfiguration())?.secret } catch { /* Fail closed. */ }
  }
  if (!secret) return json({ error: 'Webhook not configured' }, 503)
  if (Number(request.headers.get('content-length') ?? 0) > 32_768) return json({ error: 'Too large' }, 413)
  const payload = await request.text()
  if (payload.length > 32_768) return json({ error: 'Too large' }, 413)
  let event: ReturnType<typeof verifyEmailEvent>
  try { event = verifyEmailEvent(payload, request.headers, secret) }
  catch { return json({ error: 'Invalid signature' }, 401) }
  try {
    await handleEmailEvent(orderStore, event, sendOwnerAlert)
    return json({ received: true })
  } catch { return json({ error: 'Retry notification' }, 503) }
}
