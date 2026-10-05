'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/cursos/', label: 'Cursos' },
  { href: '/materiales/', label: 'Materiales' },
  { href: '/vittoria/', label: 'Vittoria IA' },
  { href: '/#contacto', label: 'Contacto' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-900/95 backdrop-blur-sm border-b border-primary-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo_italicia.svg"
              alt="ItalicIA"
              width={140}
              height={45}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-200 hover:text-accent-400 transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contacto"
              className="btn-primary text-sm py-2 px-4"
            >
              Empezar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="menu-movil"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="menu-movil" className="lg:hidden py-4 border-t border-primary-800">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-200 hover:text-accent-400 transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contacto"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-center mt-4"
              >
                Empezar
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
