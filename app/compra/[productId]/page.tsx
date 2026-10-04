import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { checkoutReady } from '@/lib/commerce/config'
import { currencyFor, getProduct, isProvider } from '@/lib/commerce/products'
import BookCheckout from '@/components/BookCheckout'
import { getBookPaymentLinks } from '@/lib/book-payments'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Comprar material | Italicia', robots: { index: false, follow: false } }

export default async function PurchasePage({ params, searchParams }: { params: Promise<{ productId: string }>; searchParams: Promise<{ medio?: string }> }) {
  const { productId } = await params
  const { medio } = await searchParams
  const product = getProduct(productId)
  if (!product || !isProvider(medio)) notFound()
  const enabled = checkoutReady(product.id, medio)
  const currency = currencyFor(medio)
  const price = new Intl.NumberFormat('es-AR', { style: 'currency', currency, maximumFractionDigits: 0 }).format(product.amounts[currency] / 100)
  return <main className="min-h-screen bg-gray-50 px-5 pb-20 pt-32"><div className="mx-auto max-w-lg rounded-3xl bg-white p-6 shadow-sm md:p-9">
    <a href="/materiales/" className="text-sm text-primary-900 underline">Volver a Materiales</a>
    <p className="mt-7 text-sm font-semibold text-gray-600">Material digital · PDF</p>
    <h1 className="mt-2 text-3xl font-bold text-primary-900">{product.title}</h1>
    <p className="mt-4 text-2xl font-semibold">{price} {currency}</p>
    {enabled ? <BookCheckout productId={product.id} provider={medio} /> : <div className="mt-8 space-y-4">
      <p>Por ahora, Alicia coordina la entrega del PDF. Después de pagar, escribile con el comprobante.</p>
      <a href={getBookPaymentLinks(product.id).find(link => link.provider === medio)?.href} className="block rounded-xl bg-primary-900 p-4 text-center font-semibold text-white">Pagar con {medio === 'mercadoPago' ? 'Mercado Pago' : 'PayPal'}</a>
      <a href={`https://wa.me/5492615449532?text=${encodeURIComponent(`Hola Alicia, quiero recibir el PDF de ${product.title}.`)}`} target="_blank" rel="noopener noreferrer" className="block text-center text-primary-900 underline">Contactar a Alicia</a>
    </div>}
  </div></main>
}
