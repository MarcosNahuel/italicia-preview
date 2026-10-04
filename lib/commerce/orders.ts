import type { Currency, ProductId, Provider } from './products'

export interface Order {
  version: 1
  id: string
  productId: ProductId
  provider: Provider
  email: string
  amount: number
  currency: Currency
  mode: 'live' | 'sandbox'
  createdAt: string
  providerOrderId?: string
  paymentId?: string
  status: 'pending' | 'paid' | 'revoked'
  paidAt?: string
  emailSentAt?: string
  emailId?: string
  emailFirstAttemptAt?: string
  emailLeaseUntil?: string
  emailLeaseOwner?: string
  emailNeedsReview?: boolean
}

export interface OrderStore {
  create(order: Order): Promise<void>
  read(id: string): Promise<Order | null>
  update(id: string, change: (order: Order) => Order): Promise<Order>
  claimPayment(provider: Provider, paymentId: string, orderId: string): Promise<void>
  findByProviderOrder(provider: Provider, id: string): Promise<string | null>
  indexProviderOrder(provider: Provider, providerOrderId: string, orderId: string): Promise<void>
}
