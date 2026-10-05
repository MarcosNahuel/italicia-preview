import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de ItalicIA. Información sobre cómo recopilamos, usamos y protegemos tus datos personales.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PrivacyPage() {
  return (
    <section className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Última actualización: 5 de octubre de 2026
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Información que Recopilamos</h2>
            <p className="text-gray-700 mb-4">
              En ItalicIA recopilamos la siguiente información:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Nombre y dirección de correo electrónico cuando nos contactás o te registrás</li>
              <li>Información de uso del sitio web mediante cookies</li>
              <li>Conversaciones con nuestro bot Vittoria para mejorar el servicio</li>
              <li>Información de pago procesada de forma segura por terceros</li>
              <li>En compras de PDF: correo de entrega, material, importe, moneda, referencia y estado del pago</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Uso de la Información</h2>
            <p className="text-gray-700 mb-4">
              Utilizamos tu información para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Proporcionar y mejorar nuestros servicios educativos</li>
              <li>Personalizar tu experiencia de aprendizaje</li>
              <li>Comunicarnos contigo sobre tu cuenta y actualizaciones</li>
              <li>Mejorar el rendimiento de nuestro tutor IA Vittoria</li>
              <li>Cumplir con obligaciones legales</li>
              <li>Confirmar las compras de materiales, entregar el PDF y resolver problemas de descarga. El correo de compra no se incorpora automáticamente a listas de publicidad.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Vittoria y consultas por WhatsApp</h2>
            <p className="text-gray-700 mb-4">
              Vittoria se ofrece en WhatsApp con acceso pago. Para consultar el precio y la activación, contactás a Alicia por ese medio:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>En las consultas por WhatsApp recibimos tu número, el nombre que mostrás y los mensajes que nos enviás</li>
              <li>Usamos lo que nos compartís para responder tu consulta y coordinar el acceso. Antes de contratar, podés consultar cómo se tratan tus datos al usar Vittoria</li>
              <li>Al abrir WhatsApp, también se aplican las condiciones y la política de privacidad de ese servicio</li>
              <li>Podés solicitar la eliminación de tus datos en cualquier momento</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Cookies</h2>
            <p className="text-gray-700 mb-4">
              Utilizamos cookies para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Recordar tus preferencias</li>
              <li>Analizar el tráfico del sitio web</li>
              <li>Mejorar la experiencia de usuario</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Podés configurar tu navegador para rechazar cookies, aunque esto puede afectar
              algunas funcionalidades del sitio.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Compartir Información</h2>
            <p className="text-gray-700 mb-4">
              No vendemos ni alquilamos tu información personal. Solo compartimos datos con:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Proveedores de servicios que nos ayudan a operar (hosting, email, pagos)</li>
              <li>Autoridades legales cuando sea requerido por ley</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Seguridad</h2>
            <p className="text-gray-700 mb-4">
              Implementamos medidas de seguridad técnicas y organizativas para proteger
              tu información personal contra acceso no autorizado, pérdida o destrucción.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Tus Derechos</h2>
            <p className="text-gray-700 mb-4">
              Tenés derecho a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Contacto</h2>
            <p className="text-gray-700 mb-4">
              Para ejercer tus derechos o consultas sobre privacidad:
            </p>
            <ul className="list-none text-gray-700 space-y-2 mb-4">
              <li><strong>Email:</strong> italicia.edu@gmail.com</li>
              <li><strong>WhatsApp:</strong> +54 9 261 544-9532</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. Cambios en esta Política</h2>
            <p className="text-gray-700 mb-4">
              Podemos actualizar esta política ocasionalmente. Te notificaremos sobre
              cambios significativos por email o mediante un aviso en nuestro sitio web.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
