import Link from 'next/link'
import { Instagram, Facebook, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-950 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">ItalicIA</h3>
            <p className="text-gray-400 mb-4">
              Cursos, materiales y práctica de italiano. Vittoria en WhatsApp con acceso pago.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/parla.con.italicia/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-800 p-2 rounded-full hover:bg-primary-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/profile.php?id=61555614825852"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-800 p-2 rounded-full hover:bg-primary-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-400">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#nosotros" className="text-gray-400 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/cursos/" className="text-gray-400 hover:text-white transition-colors">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/vittoria/" className="text-gray-400 hover:text-white transition-colors">
                  Vittoria en WhatsApp
                </Link>
              </li>
              <li>
                <Link href="/materiales/" className="text-gray-400 hover:text-white transition-colors">
                  Materiales y lecturas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-400">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Mail size={18} className="mr-2 shrink-0 text-accent-400" />
                <a href="mailto:italicia.edu@gmail.com" className="min-w-0 break-words hover:text-white transition-colors">
                  italicia.edu@gmail.com
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={18} className="mr-2 text-accent-400" />
                <a href="https://wa.me/5492615449532" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +54 9 261 544-9532
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} ItalicIA. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">Mendoza, Argentina</p>
          <Link href="/privacy/" className="inline-block mt-3 text-sm hover:text-white transition-colors">Privacidad</Link>
        </div>
      </div>
    </footer>
  )
}
