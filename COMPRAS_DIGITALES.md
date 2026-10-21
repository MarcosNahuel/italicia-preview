# Venta y entrega de PDF

## Transferencias publicadas el 21 de octubre de 2026

Alicia eligió reemplazar Mercado Pago por transferencia a Banco Patagonia, alias `italicia.bp`, titular Alicia Alejandra Tapia. PayPal se conserva. Los botones nuevos y rutas antiguas de compra con Mercado Pago llevan a transferencia; la API rechaza nuevos checkouts MP. Se conservan sus webhooks y verificación para pedidos históricos: no retirar las credenciales históricas al desplegar.

El comprador crea un pedido pendiente con correo confirmado antes de ver datos bancarios. Puede avisar a Alicia por WhatsApp con su número de pedido. El sistema envía a `italicia.edu@gmail.com` un aviso de pedido pendiente con un enlace privado por pedido, en el fragmento URL. Abrirlo o consultar el pedido no confirma pagos. Alicia revisa importe e identidad en su banco, introduce el número de operación y confirma explícitamente. La referencia se normaliza y guarda como hash en el índice exclusivo de pagos, para impedir reutilizarla en otro pedido.

La confirmación dispara la entrega existente, con reintentos, enlace de 30 días y deduplicación. La pantalla privada permite reintentar un correo pendiente o suspender definitivamente la descarga después de una cancelación/devolución; no mueve dinero en el banco. La conciliación periódica reintenta avisos pendientes y entregas confirmadas. Intentos ambiguos de más de 23 horas requieren revisión operativa. La lectura de descargas consulta el pedido actualizado, sin consultar un proveedor externo para las transferencias.

Configuración operativa: `BOOK_CHECKOUT_TRANSFER_ENABLED=true` y `BOOK_TRANSFER_ADMIN_SECRET` aleatorio e independiente de al menos 32 caracteres; mantener los secretos fuera de Git y del chat. Rotarlo invalida enlaces privados anteriores (requiere regenerarlos operativamente). Mantener el control de entrega verificada y aislamiento Sandbox/Production. Probar futuros cambios en Preview con almacenamiento Sandbox y correo de Italicia antes del uso público; la simulación local no acredita entrega real. `BOOK_CHECKOUT_MP_ENABLED=false` en Production. Sin configuración completa se ofrece consultar a Alicia y no se muestran datos para pagar.

La prueba autorizada en Preview creó dos pedidos Sandbox para Italicia: llegaron ambos avisos y ambos correos de entrega a INBOX, con SPF/DKIM/DMARC correctos. Los PDF descargados coinciden con los originales por tamaño y SHA-256. Repetir la confirmación no duplicó correos. Suspender ambos pedidos bloqueó sus descargas con 403. No se hicieron transferencias ni cobros reales.

Se configuró una clave de administración independiente en Production, se habilitó transferencia y se deshabilitaron los nuevos checkouts MP conservando sus credenciales históricas. La versión Production dpl_J2u3ikCKLZa4HohGCXmMXBnP1PTE se revisó antes de promoverla a www.italicia.com. Los cuatro formularios (dos libros, transferencia/PayPal) quedaron habilitados sin modo Sandbox. Evidencia y capturas en `trabajos/2026-10-21/transferencias-libros/` dentro de la carpeta principal Italicia. Los tokens y cuerpos privados se conservan únicamente en `.vercel/transfer-test`, excluidos de Git y despliegues.

Implementación y pruebas completas del 4 y 5 de octubre de 2026, autorizadas por Alicia para Vercel, Mercado Pago y PayPal. Precios: manual A1 ARS 19.900 / USD 13; lectura Un’argentina in Italia ARS 9.900 / USD 10, oferta de lanzamiento. No se hicieron cobros reales para probar.

## Compra y entrega

La persona indica y confirma su correo antes de pagar. El servidor fija producto, importe y moneda, y crea un pedido privado con una preferencia de Mercado Pago o una orden de PayPal. Los enlaces anteriores no registran estos pedidos ni generan entrega automática.

Un aviso autenticado, el resultado de compra o la reconciliación comprueba estado, importe, moneda, vendedor, referencia, preferencia y entorno. PayPal exige captura completada. Resend envía un enlace firmado al PDF privado, también disponible en el resultado. Vence a los 30 días; la descarga consulta de nuevo al proveedor y rechaza reembolsos o verificaciones fallidas.

Vercel revisa lotes de cinco pedidos cada 15 minutos. Reservas con escrituras condicionales e idempotencia evitan correos duplicados. Intentos ambiguos de correo con más de 23 horas requieren revisión. La persona puede contactar a Alicia si necesita asistencia.

Los controles BOOK_DELIVERY_VERIFIED, BOOK_CHECKOUT_MP_ENABLED y BOOK_CHECKOUT_PAYPAL_ENABLED habilitan las compras sólo con la configuración completa. Cambiar estos controles requiere un nuevo build para actualizar los botones. Live se rechaza en Preview y Sandbox se rechaza en Production.

## Servicios y privacidad

- Vercel traid/italicia, https://www.italicia.com. CLI 62.2.0 autenticada; el conector devolvió 404 durante la continuación y se usó la CLI.
- Blob privado italicia-libros, store_djLtvuCMGlIpqqdo, región GRU1. Identidad temporal de Vercel y BLOB_STORE_ID. Archivos books/manual-a1.pdf y books/lectura-a1.pdf. PDF, pedidos, índices y pruebas privadas permanecen fuera de Git y public/.
- Resend Free, dominio italicia.com verificado, remitente Italicia <libros@italicia.com>, respuesta al buzón de Italicia.
- Mercado Pago: claves sensibles reales sólo en Production; webhook /api/libros/webhooks/mercadopago/ con firma obligatoria y coincidencia de data.id.
- PayPal Live, aplicación Italicia Libros, webhook /api/libros/webhooks/paypal/, seis eventos de aprobación, captura completada/pendiente/denegada/reembolsada/revertida.
- /api/libros/verificar-configuracion/ es una comprobación de lectura protegida por CRON_SECRET. Devuelve autenticación, webhook PayPal y disponibilidad de PDF, nunca claves. Reconciliar exige esa misma autorización. No hay administración temporal en la fuente final.

## Verificación completa

PayPal Sandbox completó tres compras ficticias, ambos PDF, correos en INBOX con SPF/DKIM/DMARC, deduplicación y reembolsos. Una compra se entregó exclusivamente por el aviso externo, con retorno a una página estática. La corrección de reembolso encuentra el pedido por su captura cuando falta el ID de orden. Sus enlaces reembolsados devolvieron 403.

Mercado Pago completó dos compras nuevas el 5 de octubre mediante la aplicación ficticia 6869614862948894, vendedor 2407608519. Antes de guardar la clave en Preview se validó /users/me, ID exacto, MLA y test_user. Se mantuvieron separadas las credenciales de producción.

- Lectura: pedido 149b6850-4b84-4729-9825-ca01254d60d0, pago 182526400732, ARS 9.900.
- Manual: pedido 425810c5-eb29-470c-8fb5-aa8d9228c7c7, pago 181515694905, ARS 19.900.
- Ambos avisos automáticos auténticos entregaron sin consultar el resultado ni reconciliar manualmente. Repetir los sobres firmados conservó el mismo ID de correo.
- Ambos correos llegaron a INBOX, sin SPAM, con SPF/DKIM/DMARC. Ambos PDF coinciden por tamaño y SHA-256 con los originales.
- Ambos reembolsos se completaron desde las ventas ficticias. Sus avisos automáticos revocaron cada pedido antes de consultar su descarga; ambos enlaces devolvieron 403. Las dos compras anteriores también se reembolsaron.

Las cuentas ficticias usan el init_point regular devuelto por Mercado Pago. sandbox_init_point produjo un rechazo de verificación; no se desactivó la autenticación. La fuente verifica la cuenta ficticia antes de crear preferencias Sandbox y omite el correo real de entrega como payer. La excepción live_mode=true exige esa identidad ficticia y sólo funciona en Preview/Sandbox. Los avisos legacy sin data.id siguen rechazados; los webhooks firmados correctos entregan y revocan.

El reembolso ficticio por API devolvió 401 causa 7; devolver desde la venta funcionó y la API confirmó refunded. Alicia gestiona devoluciones en el proveedor; la web retira la descarga. La llave temporal de Vercel se revocó y se comprobó el bloqueo 302. Las vistas instrumentadas se retiran al cerrar las pruebas.

npm run test:commerce aprobó 14 casos: precios, firmas, pagos incorrectos/pendientes/reembolsados, pedidos cruzados, expiración, concurrencia, reintentos, rutas sin autorización e identidad de vendedores ficticios. La compilación aprobó. Antes de publicar se comprueban las cuentas reales desde un despliegue Production sin asignar dominios; no se promueve una vista Sandbox a producción.

## Portadas y videos

Alicia entregó ambas portadas el 5 de octubre. Se presentan completas en Inicio y Materiales. El manual usa https://www.youtube.com/shorts/2FsKmQyugsk y la colección https://www.youtube.com/shorts/nmiS8t67t0M. Sin reproducción automática y con enlace a YouTube.

Estado fechado y evidencia privada en trabajos/2026-10-05/CONTINUACION_LIBROS.md, dentro de la carpeta de trabajo de Alicia.
