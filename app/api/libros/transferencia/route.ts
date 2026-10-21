import { transferManagement } from '@/lib/commerce/transfer-management'
import { orderStore } from '@/lib/commerce/store'
import { paymentMode } from '@/lib/commerce/config'
import { reconcileOrder } from '@/lib/commerce/service'

export const runtime = 'nodejs'
export const maxDuration = 90
export const POST = transferManagement({ store: orderStore, secret: () => process.env.BOOK_TRANSFER_ADMIN_SECRET ?? '', mode: paymentMode, production: () => process.env.VERCEL_ENV === 'production', deliver: reconcileOrder })
