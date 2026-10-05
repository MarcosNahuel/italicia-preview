// Contacto de Alicia para consultar el servicio; no es el número del bot.
export const vittoriaContactUrl =
  'https://wa.me/5492615449532?text=' +
  encodeURIComponent('Hola Alicia, quiero consultar el precio y cómo acceder a Vittoria en WhatsApp.')

export const vittoriaSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Vittoria en WhatsApp',
  serviceType: 'Práctica de italiano con inteligencia artificial',
  description: 'Tutora virtual de italiano en WhatsApp con acceso pago. Consultá precio, condiciones y activación con Alicia.',
  url: 'https://italicia.com/vittoria/',
  provider: { '@type': 'Organization', name: 'Italicia', url: 'https://italicia.com' },
}
