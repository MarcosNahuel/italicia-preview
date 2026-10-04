import { required, siteUrl } from '@/lib/commerce/config'
import { downloadToken, verifyOrderAccess } from '@/lib/commerce/security'
import { orderStore } from '@/lib/commerce/store'
import { reconcileOrder } from '@/lib/commerce/service'
import { json, sameOrigin, smallJson } from '@/lib/commerce/http'

export const runtime = 'nodejs'
export const maxDuration = 90
export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: 'Solicitud no permitida.' }, 403)
  try {
    const body = await smallJson(request)
    if (typeof body.id !== 'string' || typeof body.access !== 'string' || !verifyOrderAccess(body.id, body.access, required('BOOK_TOKEN_SECRET'))) return json({ error: 'El enlace de compra no es válido.' }, 404)
    let order = await orderStore.read(body.id)
    if (!order) return json({ error: 'No encontramos esa compra.' }, 404)
    // Browser redirects never determine paid status. Read the provider again, including reversals.
    try { order = await reconcileOrder(order) } catch { order = await orderStore.read(body.id) ?? order }
    return json({ status: order.status, emailSent: !!order.emailSentAt,
      downloadUrl: order.status === 'paid' && order.paidAt
        ? `${siteUrl()}/api/libros/descarga/?token=${downloadToken(order.id, order.paidAt, required('BOOK_TOKEN_SECRET'))}` : undefined })
  } catch { return json({ error: 'No pudimos comprobar la compra. Contactá a Alicia si ya pagaste.' }, 503) }
}
