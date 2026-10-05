# Venta y entrega de PDF

Implementación del 4 al 5 de octubre de 2026. PayPal Sandbox aprobó tres compras ficticias: ambos libros por el resultado de compra y una tercera entrega disparada exclusivamente por su webhook externo. Se comprobaron correo, PDF correcto, deduplicación y reembolso. Mercado Pago aprobó compras ficticias de ambos libros. Avisos firmados desde su simulador oficial dispararon una entrega por libro al buzón de Italicia; se comprobaron recepción, PDF original y deduplicación al repetir esos avisos. Los avisos automáticos de las compras todavía rechazan la firma y el reembolso de lectura devolvió HTTP 401 `unauthorized`, causa `7`. Falta cerrar esas dos comprobaciones con una aplicación propia del vendedor ficticio. La entrega automática pública permanece deshabilitada. Los cuatro enlaces originales siguen disponibles con entrega coordinada por Alicia.

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

Estado comprobado el 4 de octubre de 2026, después de la confirmación explícita de Alicia para conectar los servicios y aceptar las condiciones del plan gratuito:

- Mercado Pago: `MP_ACCESS_TOKEN` y `MP_WEBHOOK_SECRET` configurados como secretos de producción. Alicia completó la verificación por SMS y la firma se ingresó directamente en Vercel. Webhook `https://www.italicia.com/api/libros/webhooks/mercadopago/` registrado para **Pagos (legacy)**, que corresponde a los eventos `payment` usados por Checkout Pro. Una comprobación desde Vercel autenticó la credencial y confirmó vendedor argentino e ID esperados. El 401 inicial se debía a que Alicia había copiado los puntitos del campo oculto; después de copiar la clave real, la firma se validó. Una simulación oficial de tipo `order`, autenticada y descartada por ser un evento no usado, devolvió 200. La simulación `payment.updated` pasó la firma y devolvió 503 al consultar el recurso ficticio `123456`; no acredita una compra. Falta la prueba completa de compra en un entorno separado.
- PayPal: aplicación REST de producción **Italicia Libros** creada en la cuenta de Alicia. Los cuatro datos necesarios están configurados, incluida `PAYPAL_CLIENT_SECRET` como secreto de producción. Una comprobación desde Vercel autenticó las credenciales contra PayPal Live y consultó el webhook: ID, URL y los seis eventos esperados coinciden. No se crearon ni capturaron pagos para esa comprobación.
- Resend: recurso **italicia-libros**, plan **Free**, instalado en TRAID y conectado sólo al proyecto `italicia`, en Production y Preview. La integración creó `RESEND_API_KEY` y `RESEND_EMAIL_DOMAIN` como secretos. Se agregaron DKIM, SPF y MX de Resend en Namecheap; los 17 registros anteriores se conservaron. El dominio `italicia.com` está **verificado** por Resend. Se envió un único correo técnico desde `Italicia <libros@italicia.com>` a `italicia.edu@gmail.com` y se encontró en ese buzón mediante el conector de Gmail de Italicia. No corresponde a una compra.
- Los tres controles de producción permanecen en `false`. En Preview se completaron dos compras contra PayPal Sandbox: manual US$13 y lectura US$10, con un comprador ficticio y correo de entrega al buzón de Italicia. Llegó un único correo por libro a la bandeja de entrada, con SPF, DKIM y DMARC aprobados; ambos PDF descargados coinciden con los originales por tamaño y SHA-256. Recargar los resultados no duplicó los correos. Ambos pagos ficticios se reembolsaron y sus enlaces pasaron de HTTP 200 a 403. No se hicieron cobros reales.

Vercel CLI **62.2.0** está instalado en el perfil de Alicia, con sesión `marcosnahuel` y vínculo comprobado a `traid/italicia`, proyecto `prj_iGkBRQeIASI6w3iqtTg3kYeWSM7Z`. Usar `C:/Users/alial/AppData/Roaming/npm/vercel.cmd`, anteponiendo también `C:/Program Files/nodejs` al PATH, o el acceso técnico `.tools/vercel-italicia.cmd` de la carpeta de trabajo. `.vercel/` y `.env.local` permanecen fuera de Git. Los secretos de tipo sensitive no se exportan para diagnosticarlos localmente; las pruebas de credenciales se ejecutan dentro de Vercel y devuelven sólo resultados, nunca claves.

- Mercado Pago: Access Token del vendedor, ID del vendedor y clave de firma del webhook. Registrar `/api/libros/webhooks/mercadopago/` y eventos de pagos, diferenciando prueba y producción.
- PayPal: aplicación REST de Alicia, Client ID, Client Secret, Merchant ID y Webhook ID. Registrar `/api/libros/webhooks/paypal/` para `CHECKOUT.ORDER.APPROVED`, `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.PENDING`, `PAYMENT.CAPTURE.DENIED`, `PAYMENT.CAPTURE.REFUNDED`, `PAYMENT.CAPTURE.REVERSED`.
- Correo: Resend con dominio/remitente verificado, `RESEND_API_KEY` y `BOOK_EMAIL_FROM`. La respuesta se dirige a `italicia.edu@gmail.com`. La aceptación por la API de correo no demuestra recepción en la bandeja del comprador.
- Verificar pago de prueba aprobado, pendiente, repetido y reembolsado; recepción real del correo y descarga del archivo correcto. No activar producción solamente por pasar pruebas con datos simulados.
- Separar recursos y credenciales de prueba y producción al operar las pruebas. La comparación de entorno impide que los pedidos de prueba se entreguen desde producción.

## Comprobaciones locales

### Entorno Sandbox separado

La sesión del panel PayPal fue restablecida y se creó **Italicia Libros Sandbox**, asociada al vendedor de prueba argentino. Se registró el webhook `95U3495367481882E` para los seis eventos documentados. Las credenciales de producción no se reemplazaron; los datos de Sandbox están exclusivamente en Preview.

Los pedidos, índices de pagos y cursor de reconciliación Sandbox usan el prefijo privado `sandbox/`, separado de los pedidos reales. `BOOK_SANDBOX_TEST_ENABLED=true` sólo permite preparar pruebas en Preview, en modo Sandbox y con `BOOK_SANDBOX_TEST_EMAIL=italicia.edu@gmail.com`; el servidor rechaza otros destinatarios. No habilita producción ni sustituye `BOOK_DELIVERY_VERIFIED`. Preview también rechaza el modo Live. La página de compra muestra una advertencia Sandbox y no ofrece enlaces reales cuando el medio de prueba está incompleto.

Trece pruebas locales y la compilación aprobaron. La autenticación PayPal Sandbox funciona. La vista `https://italicia-nkkb22la0-traid.vercel.app` completó las primeras dos compras y conserva la protección de Vercel. Los pedidos y PDF de comprobación se conservan fuera de Git.

El bloqueo inicial de PayPal por Vercel Authentication se resolvió después de la autorización específica de Alicia. Una llave temporal permitió la prueba externa manteniendo obligatoria la firma PayPal; se revocó al terminar y se comprobó que volvía a bloquear el acceso. Se retiró de la URL del webhook y se eliminaron las vistas administrativas temporales. Una tercera compra del manual por US$13, con retorno a una página estática, se capturó y entregó exclusivamente por el webhook, sin consultar el resultado ni ejecutar reconciliación manual. Repetir el aviso real no duplicó el correo. Los tres pagos se reembolsaron; los PDF correctos se comprobaron por tamaño y SHA-256 y sus enlaces reembolsados devolvieron 403.

La prueba detectó que el aviso de reembolso identifica la captura y puede omitir el ID del pedido: el handler ahora encuentra el índice de la captura, consulta el pago y revoca la descarga. Reenviar el reembolso auténtico retiró el acceso antes de consultar la descarga.

Mercado Pago, actualización del 5 de octubre: el 403 previo se resolvió al copiar el Access Token desde el campo real con selección y teclado; el botón de copia del panel no alimentaba el portapapeles del navegador automatizado. La API confirmó vendedor ficticio `2407608519`, país MLA y etiqueta `test_user`. Se aprobaron lectura ARS 9.900 y manual ARS 19.900 con tarjeta ficticia, con retorno a la página estática de Materiales. Sus avisos automáticos llegaron a la vista protegida, pero devolvieron 401 por firma. Algunos son avisos legacy sin `data.id`; otros contienen `data.id` y también rechazan la firma. No se quitó ninguna validación.

Tras acceder a Webhooks con la verificación del titular, se renovó sólo la firma de Modo de prueba y se transfirió a Vercel Preview como secreto sensible. El simulador oficial envió avisos firmados con los IDs de ambos pagos ficticios aprobados. La ruta validó la firma, consultó los pagos en la API, comprobó vendedor, importe y referencia, y generó las entregas. Ambos correos llegaron a INBOX, sin SPAM y con SPF, DKIM y DMARC aprobados. Ambos enlaces devolvieron HTTP 200 con PDF privado que coincide en tamaño y SHA-256 con el original. Repetir cada sobre firmado conservó el mismo ID de correo. Esto prueba la entrega a partir del simulador; no acredita el funcionamiento de los avisos automáticos ni el reembolso. El reembolso de lectura por API sigue pendiente: devolvió 401 `unauthorized`, causa `7`. La devolución del manual aún no se ejecutó.

Los pagos ficticios informaron `live_mode=true`. Checkout Pro puede operar con cuentas ficticias sobre la plataforma de producción del proveedor. En Preview/Sandbox se acepta esa variante sólo después de consultar `/users/me` y comprobar que el vendedor configurado coincide y tiene etiqueta `test_user`; producción no obtiene esta excepción. Las preferencias Sandbox omiten el correo real de entrega para que Mercado Pago tome al comprador ficticio que inició sesión. Los importes, referencias, vendedor, preferencia y reembolsos siguen validados. La consulta de estado de las pruebas no reconcilió ni forzó una entrega. Falta resolver la firma de los avisos automáticos y los permisos de devolución usando una aplicación propia del vendedor ficticio antes de habilitar producción.

Referencias oficiales: [pruebas de Checkout Pro con cuentas ficticias](https://www.mercadopago.com.ar/developers/es/docs/prestashop/sales-processing/integration-test), [tarjetas y escenarios de prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro-preferences/integration-test/test-purchases), [firma de notificaciones](https://www.mercadopago.com.ar/developers/en/docs/checkout-pro-preferences/payment-notifications).

`npm run test:commerce` comprueba precios, firmas alteradas, pedidos cruzados, expiración, pagos pendientes/reembolsados, concurrencia de entregas, reintentos y rechazo de solicitudes HTTP no autorizadas. El almacén de estas pruebas es simulado; no sustituye la prueba de escrituras condicionales de Blob ni los proveedores reales.

`npm run build` incluye las funciones de compra, descarga, webhooks y reconciliación. No hacer transacciones reales para comprobar la implementación sin autorización específica.

La migración inicial verificó en producción la lectura consistente y el rechazo de escrituras con una versión desactualizada. Ambos PDF se subieron de forma privada y se comprobaron tamaño y SHA-256. La ruta administrativa temporal se retiró y `BOOK_ASSET_UPLOAD_ENABLED=false`. No hay un canal público de carga en la versión final.
