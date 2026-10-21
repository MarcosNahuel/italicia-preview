import type { Metadata } from 'next'
import TransferManagement from '@/components/TransferManagement'

export const metadata: Metadata = { title: 'Confirmar transferencia', robots: { index: false, follow: false }, referrer: 'no-referrer' }
export default function TransferManagementPage() {
  return <div className="min-h-screen bg-gray-50 px-5 pb-20 pt-32"><div className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-sm md:p-9"><TransferManagement /></div></div>
}
