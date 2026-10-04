// Enlaces de pago de Alicia. Completar sólo con enlaces reales de cada producto.
// Un valor vacío mantiene la consulta con Alicia sin mostrar un botón de pago.
export const bookPaymentLinks: Record<string, { mercadoPago: string; paypal: string }> = {
  'manual-a1': { mercadoPago: 'https://mpago.la/28SFv5Z', paypal: 'https://www.paypal.com/ncp/payment/72E8KM9WGEA7U' },
  'lectura-a1': { mercadoPago: 'https://mpago.la/2K9XZfP', paypal: 'https://www.paypal.com/ncp/payment/U2W6C7C3CBL6C' },
}

function isProviderLink(value: string, hosts: string[]): boolean {
  if (!value.trim()) return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password &&
      hosts.some(host => url.hostname === host || url.hostname.endsWith(`.${host}`))
  } catch {
    return false
  }
}

export function getBookPaymentLinks(materialId: string) {
  const links = bookPaymentLinks[materialId]
  if (!links) return []
  return [
    { provider: 'mercadoPago', label: 'Comprar con Mercado Pago', href: links.mercadoPago,
      hosts: ['mpago.la', 'mpago.ar', 'mercadopago.com.ar', 'mercadopago.com'] },
    { provider: 'paypal', label: 'Comprar con PayPal', href: links.paypal,
      hosts: ['paypal.com', 'paypal.me'] },
  ].filter(link => isProviderLink(link.href, link.hosts))
}
