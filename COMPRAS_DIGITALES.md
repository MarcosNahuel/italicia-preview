# Venta y entrega de PDF

Implementación del 4 de octubre de 2026. La entrega automática permanece deshabilitada hasta comprobar cobro, archivo privado y correo. Los cuatro enlaces originales siguen disponibles y la web explica la entrega coordinada con Alicia.

## Flujo preparado

1. La web solicita y confirma el correo antes del pago. El servidor fija producto, precio y moneda: lectura ARS 9.900 / USD 10; manual A1 ARS 19.900 / USD 13.
2. Crea un pedido privado y una preferencia de Mercado Pago o una orden de PayPal, con una referencia propia. Los enlaces antiguos no registran estos pedidos.
3. Una notificación autenticada o una consulta al proveedor confirma importe, moneda, vendedor, referencia, entorno y estado del cobro. La aprobación de PayPal requiere captura completada.
4. Resend envía un enlace firmado al PDF privado. El enlace vence a los 30 días desde el pago. También aparece en la página de resultado; la descarga vuelve a comprobar el cobro y los reembolsos.
5. Un cron de Vercel cada 15 minutos revisa lotes de cinco pedidos y reintenta entregas pendientes. Una clave de idempotencia y una reserva con escritura condicional evitan envíos duplicados. Intentos de correo ambiguos de más de 23 horas requieren revisión, porque la ventana de deduplicación del proveedor es de 24 horas.

## Vercel

- Proyecto `italicia`, equipo TRAID; sitio `https://www.italicia.com`.
- Blob **privado** `italicia-libros`, `store_djLtvuCMGlIpqqdo`, región GRU1. Autenticación con la identidad temporal del proyecto y `BLOB_STORE_ID`; no se necesita publicar una URL de Drive ni guardar el PDF en Git.
- Objetos finales: `books/manual-a1.pdf`, `books/lectura-a1.pdf`. Pedidos e índices también son privados.
- Variables y valores de ejemplo en `.env.example`. Los secretos se configuran mediante el conector de Vercel, nunca en el repositorio.
- Los botones de Inicio y Materiales se calculan durante el build: redeplegar después de cambiar las variables de habilitación. Las rutas de compra además comprueban la configuración en cada petición.
- Mantener `BOOK_CHECKOUT_MP_ENABLED=false`, `BOOK_CHECKOUT_PAYPAL_ENABLED=false` y `BOOK_DELIVERY_VERIFIED=false` hasta una verificación completa. `BOOK_PAYMENT_MODE=sandbox` jamás admite compras en producción.

## Conectar los servicios

- Mercado Pago: Access Token del vendedor, ID del vendedor y clave de firma del webhook. Registrar `/api/libros/webhooks/mercadopago/` y eventos de pagos, diferenciando prueba y producción.
- PayPal: aplicación REST de Alicia, Client ID, Client Secret, Merchant ID y Webhook ID. Registrar `/api/libros/webhooks/paypal/` para `CHECKOUT.ORDER.APPROVED`, `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.PENDING`, `PAYMENT.CAPTURE.DENIED`, `PAYMENT.CAPTURE.REFUNDED`, `PAYMENT.CAPTURE.REVERSED`.
- Correo: Resend con dominio/remitente verificado, `RESEND_API_KEY` y `BOOK_EMAIL_FROM`. La respuesta se dirige a `italicia.edu@gmail.com`. La aceptación por la API de correo no demuestra recepción en la bandeja del comprador.
- Verificar pago de prueba aprobado, pendiente, repetido y reembolsado; recepción real del correo y descarga del archivo correcto. No activar producción solamente por pasar pruebas con datos simulados.
- Separar recursos y credenciales de prueba y producción al operar las pruebas. La comparación de entorno impide que los pedidos de prueba se entreguen desde producción.

## Comprobaciones locales

`npm run test:commerce` comprueba precios, firmas alteradas, pedidos cruzados, expiración, pagos pendientes/reembolsados, concurrencia de entregas, reintentos y rechazo de solicitudes HTTP no autorizadas. El almacén de estas pruebas es simulado; no sustituye la prueba de escrituras condicionales de Blob ni los proveedores reales.

`npm run build` incluye las funciones de compra, descarga, webhooks y reconciliación. No hacer transacciones reales para comprobar la implementación sin autorización específica.

La migración inicial verificó en producción la lectura consistente y el rechazo de escrituras con una versión desactualizada. Ambos PDF se subieron de forma privada y se comprobaron tamaño y SHA-256. La ruta administrativa temporal se retiró y `BOOK_ASSET_UPLOAD_ENABLED=false`. No hay un canal público de carga en la versión final.
