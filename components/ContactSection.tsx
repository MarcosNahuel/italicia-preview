'use client'

import { useState, FormEvent } from 'react'
import { Mail, Phone, Clock, Instagram, Facebook, Send, CheckCircle2, MapPin, Sparkles } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'italicia.edu@gmail.com',
    href: 'mailto:italicia.edu@gmail.com',
  },
  {
    icon: Phone,
    title: 'WhatsApp',
    value: '+54 9 261 544-9532',
    href: 'https://wa.me/5492615449532',
  },
  {
    icon: Clock,
    title: 'Horario',
    value: 'Lun - Vie: 9:00 - 20:00',
    href: null,
  },
  {
    icon: MapPin,
    title: 'Ubicación',
    value: 'Mendoza, Argentina',
    href: null,
  },
]

export default function ContactSection() {
  const [preparedMessage, setPreparedMessage] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const value = (name: string) => String(data.get(name) ?? '').trim()
    const message = [
      'Consulta desde la web de Italicia',
      'Nombre: ' + value('name'),
      'Email: ' + value('email'),
      'Asunto: ' + value('subject'),
      '', value('message'),
    ].join('\n')
    setPreparedMessage('https://wa.me/5492615449532?text=' + encodeURIComponent(message))
  }

  return (
    <section id="contacto" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-100/40 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
            <Mail className="w-4 h-4" />
            Contacto
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hablemos de tu{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-500 to-emerald-500">
              aprendizaje
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Tienes preguntas sobre nuestros cursos o materiales? Estamos aquí para ayudarte.
          </p>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <AnimatedSection animation="slide-right" className="lg:w-2/5">
            <div className="relative h-full">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-3xl blur-2xl" />

              <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 rounded-2xl p-8 h-full shadow-2xl border border-primary-700/50">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10 rounded-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-accent-400 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400 rounded-full blur-2xl" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-8">Información de Contacto</h3>

                  <div className="space-y-6">
                    {contactInfo.map((item, index) => {
                      const Icon = item.icon
                      const content = (
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10 group">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white/60">{item.title}</h4>
                            <p className="text-white font-semibold">{item.value}</p>
                          </div>
                        </div>
                      )

                      return item.href ? (
                        <a
                          key={index}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          {content}
                        </a>
                      ) : (
                        <div key={index}>{content}</div>
                      )
                    })}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h4 className="text-sm font-medium text-white/60 mb-4">Síguenos</h4>
                    <div className="flex gap-3">
                      <a
                        href="https://www.instagram.com/parla.con.italicia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-5 w-5 text-white" />
                      </a>
                      <a
                        href="https://facebook.com/profile.php?id=61555614825852"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-5 w-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection animation="slide-left" delay={200} className="lg:w-3/5">
            {preparedMessage ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-12 rounded-2xl bg-gradient-to-br from-accent-50 to-emerald-50 border border-accent-200">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Tu consulta está preparada</h3>
                  <p className="text-gray-600 mb-6">
                    Abrí WhatsApp, revisá el mensaje y tocá Enviar para completar la consulta.
                  </p>
                  <button
                    type="button"
                    onClick={() => setPreparedMessage(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <Mail className="w-5 h-5" />
                    Volver al formulario
                  </button>
                  <a
                    href={preparedMessage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-primary-900 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors"
                  >
                    <Send className="w-5 h-5" aria-hidden="true" />
                    Abrir WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl blur-xl opacity-50" />

                <form
                  onSubmit={handleSubmit}
                  className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Envíanos un mensaje</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                      placeholder="¿Sobre qué quieres hablar?"
                    />
                  </div>

                  <div className="mb-8">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all resize-none"
                      placeholder="Cuéntanos tu consulta..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-500 to-emerald-500 text-white font-semibold shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" aria-hidden="true" />
                    Preparar consulta por WhatsApp
                  </button>
                </form>
              </div>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
