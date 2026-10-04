import { materials } from '../catalog'

export type ProductId = 'manual-a1' | 'lectura-a1'
export type Provider = 'mercadoPago' | 'paypal'
export type Currency = 'ARS' | 'USD'

export function getProduct(id: string) {
  const material = materials.find(item => item.id === id)
  if (!material || !('price' in material)) return null
  return {
    id: material.id as ProductId,
    title: material.title,
    amounts: { ARS: material.price.ars * 100, USD: material.price.usd * 100 },
    filename: material.id === 'manual-a1' ? 'Italiano_A1_Italicia.pdf' : 'Un_argentina_in_Italia.pdf',
    pdfEnv: material.id === 'manual-a1' ? 'BOOK_PDF_MANUAL_A1' : 'BOOK_PDF_LECTURA_A1',
  }
}

export function isProvider(value: unknown): value is Provider {
  return value === 'mercadoPago' || value === 'paypal'
}

export function currencyFor(provider: Provider): Currency {
  return provider === 'mercadoPago' ? 'ARS' : 'USD'
}

// Work in integer cents: never trust a price or a currency supplied by the browser.
export function cents(value: unknown): number | null {
  if (typeof value !== 'string' && typeof value !== 'number') return null
  const text = String(value)
  if (!/^\d+(\.\d{1,2})?$/.test(text)) return null
  const [whole, fraction = ''] = text.split('.')
  const result = Number(whole) * 100 + Number(fraction.padEnd(2, '0'))
  return Number.isSafeInteger(result) ? result : null
}

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const email = value.trim().toLowerCase()
  return email.length <= 254 && /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(email) && !/[\r\n]/.test(email) ? email : null
}
