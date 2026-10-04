import { Suspense } from 'react'
import type { Metadata } from 'next'
import BookPurchaseResult from '@/components/BookPurchaseResult'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Tu compra | Italicia', robots: { index: false, follow: false } }
export default function ResultPage() {
  return <main className="min-h-screen bg-gray-50 px-5 pb-20 pt-32"><div className="mx-auto max-w-lg rounded-3xl bg-white p-6 shadow-sm md:p-9"><Suspense fallback={<p>Comprobando tu compra…</p>}><BookPurchaseResult /></Suspense></div></main>
}
