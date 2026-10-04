import { required } from '@/lib/commerce/config'
import { downloadToken, equalSecret, verifyDownloadToken } from '@/lib/commerce/security'
import { getProduct } from '@/lib/commerce/products'
import { orderStore, privatePdf } from '@/lib/commerce/store'
import { reconcileOrder } from '@/lib/commerce/service'
import { privateHeaders } from '@/lib/commerce/http'

export const runtime = 'nodejs'
export const maxDuration = 90
export async function GET(request: Request) {
  try {
    const token = new URL(request.url).searchParams.get('token') ?? ''
    const secret = required('BOOK_TOKEN_SECRET')
    const id = verifyDownloadToken(token, secret)
    if (!id) return new Response('Enlace inválido o vencido. Consultá con Alicia.', { status: 403, headers: privateHeaders })
    const order = await orderStore.read(id)
    if (!order || order.status !== 'paid' || !order.paidAt || !equalSecret(token, downloadToken(id, order.paidAt, secret))) return new Response('Esta compra no tiene una descarga habilitada.', { status: 403, headers: privateHeaders })
    // Fail closed if a provider cannot be reached: stale paid state must not bypass a refund.
    const current = await reconcileOrder(order, false)
    if (current.status !== 'paid') return new Response('Esta compra no tiene una descarga habilitada.', { status: 403, headers: privateHeaders })
    const product = getProduct(order.productId)!
    const pdf = await privatePdf(required(product.pdfEnv))
    if (!pdf || pdf.statusCode !== 200 || pdf.blob.contentType !== 'application/pdf') return new Response('El archivo no está disponible. Contactá a Alicia.', { status: 503, headers: privateHeaders })
    return new Response(pdf.stream, { headers: { ...privateHeaders, 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${product.filename}"`, 'X-Content-Type-Options': 'nosniff' } })
  } catch { return new Response('No pudimos comprobar tu descarga. Volvé a intentar o contactá a Alicia.', { status: 503, headers: privateHeaders }) }
}
