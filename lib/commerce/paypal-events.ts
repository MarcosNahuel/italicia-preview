// Refund resources identify the original capture, and can omit the checkout order ID.
// Extract references only; never fetch URLs supplied in webhook bodies.
export function paypalWebhookReference(event: Record<string, unknown>, mode: 'live' | 'sandbox') {
  const type = event.event_type
  const resource = event.resource as { id?: unknown; supplementary_data?: { related_ids?: { order_id?: unknown; capture_id?: unknown } }; links?: { rel?: string; href?: string }[] } | undefined
  const valid = (id: unknown): string | undefined => typeof id === 'string' && /^[a-zA-Z0-9_-]{1,100}$/.test(id) ? id : undefined
  const orderId = valid(type === 'CHECKOUT.ORDER.APPROVED' ? resource?.id : resource?.supplementary_data?.related_ids?.order_id)
  let captureId = valid(resource?.supplementary_data?.related_ids?.capture_id)
  if (!captureId && typeof type === 'string' && type.startsWith('PAYMENT.CAPTURE.') && type !== 'PAYMENT.CAPTURE.REFUNDED') captureId = valid(resource?.id)
  if (!captureId && Array.isArray(resource?.links)) {
    for (const link of resource.links) {
      if (link.rel !== 'up' || typeof link.href !== 'string') continue
      try {
        const url = new URL(link.href)
        const hosts = mode === 'sandbox' ? ['api.sandbox.paypal.com', 'api-m.sandbox.paypal.com'] : ['api.paypal.com', 'api-m.paypal.com']
        if (url.protocol !== 'https:' || !hosts.includes(url.hostname) || url.username || url.password || url.port || url.search || url.hash) continue
        captureId = valid(url.pathname.match(/^\/v2\/payments\/captures\/([a-zA-Z0-9_-]{1,100})$/)?.[1])
        if (captureId) break
      } catch { /* Ignore unrelated or malformed links. */ }
    }
  }
  return { orderId, captureId }
}
