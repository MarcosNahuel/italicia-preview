import type { Order, OrderStore } from './orders'
import { verifyTransferAdminAccess } from './security'
import { confirmTransfer } from './transfers'
import { json, sameOrigin, smallJson } from './http'
import { getProduct } from './products'

export function transferManagement(deps: {
  store: OrderStore; secret: () => string; mode: () => 'live' | 'sandbox';
  production: () => boolean; deliver: (order: Order) => Promise<Order>;
}) {
  return async (request: Request) => {
    if (!sameOrigin(request)) return json({ error: 'Solicitud no permitida.' }, 403)
    try {
      const body = await smallJson(request)
      if (typeof body.id !== 'string' || typeof body.access !== 'string' || !verifyTransferAdminAccess(body.id, body.access, deps.secret())) return json({ error: 'Abrí el enlace privado del correo de Italicia.' }, 403)
      let order = await deps.store.read(body.id)
      if (!order || order.provider !== 'transferencia' || order.mode !== deps.mode() || (deps.production() && order.mode !== 'live')) return json({ error: 'Pedido no disponible.' }, 404)
      if (body.action === 'confirm') {
        if (body.checked !== true) return json({ error: 'Primero comprobá el ingreso en tu banco.' }, 400)
        try { order = await confirmTransfer(deps.store, order.id, body.reference) }
        catch { return json({ error: 'No se pudo confirmar: revisá la referencia bancaria; puede estar usada o el pedido suspendido.' }, 409) }
      } else if (body.action === 'revoke') {
        if (body.checked !== true) return json({ error: 'Confirmá que querés suspender el acceso.' }, 400)
        order = await deps.store.update(order.id, current => ({ ...current, status: 'revoked', transferRevokedAt: current.transferRevokedAt ?? new Date().toISOString() }))
      } else if (body.action !== 'inspect' && body.action !== 'retry') return json({ error: 'Acción no válida.' }, 400)
      if ((body.action === 'confirm' || body.action === 'retry') && order.status === 'paid') {
        try { order = await deps.deliver(order) }
        catch { order = await deps.store.read(order.id) ?? order }
      }
      return json({ id: order.id, title: getProduct(order.productId)!.title, email: order.email, amount: order.amount, status: order.status, paidAt: order.paidAt, emailSent: !!order.emailSentAt, needsReview: !!order.emailNeedsReview, deliveryIssue: order.deliveryIssue })
    } catch { return json({ error: 'No pudimos consultar el pedido. Volvé a intentar.' }, 503) }
  }
}
