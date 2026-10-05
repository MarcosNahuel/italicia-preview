# Venta y entrega de PDF

Implementación del 4 de octubre de 2026. Las compras PayPal Sandbox de ambos libros aprobaron correo, PDF correcto, deduplicación y reembolso. La entrega automática pública permanece deshabilitada hasta comprobar también los avisos externos y la compra completa de Mercado Pago. Los cuatro enlaces originales siguen disponibles y la web explica la entrega coordinada con Alicia.

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

Diez pruebas locales y la compilación aprobaron. Alicia corrigió la clave de Preview y su autenticación **ya funciona**. La vista limpia `https://italicia-nkkb22la0-traid.vercel.app` completó las dos compras de prueba y entregó ambos archivos. La herramienta temporal de reembolso se retiró del código y su despliegue se eliminó; la ruta administrativa devuelve 404 en el Preview limpio. Los pedidos de prueba y sus evidencias no se guardan en Git.

El Preview conserva Vercel Authentication. PayPal Developer muestra que el aviso real de captura recibió **401 Unauthorized** de Vercel; no pasó la prueba externa del webhook. La revisión automática rechazó crear un secreto de excepción que ampliaría el acceso al proyecto; no se ejecutó esa creación y no se modificó la protección. Las consultas autenticadas de la página de resultado sí comprobaron captura, correo y PDF. La reconciliación autenticada funcionó sin fallos. Queda pendiente autorizar específicamente la excepción temporal para probar los avisos externos y retirarla después; también falta la compra completa de prueba de Mercado Pago.

`npm run test:commerce` comprueba precios, firmas alteradas, pedidos cruzados, expiración, pagos pendientes/reembolsados, concurrencia de entregas, reintentos y rechazo de solicitudes HTTP no autorizadas. El almacén de estas pruebas es simulado; no sustituye la prueba de escrituras condicionales de Blob ni los proveedores reales.

`npm run build` incluye las funciones de compra, descarga, webhooks y reconciliación. No hacer transacciones reales para comprobar la implementación sin autorización específica.

La migración inicial verificó en producción la lectura consistente y el rechazo de escrituras con una versión desactualizada. Ambos PDF se subieron de forma privada y se comprobaron tamaño y SHA-256. La ruta administrativa temporal se retiró y `BOOK_ASSET_UPLOAD_ENABLED=false`. No hay un canal público de carga en la versión final.
