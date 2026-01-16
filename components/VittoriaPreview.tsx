'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bot, Send, Sparkles, MessageCircle, CheckCircle2, Clock, Zap } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const chatMessages = [
  { type: 'bot', text: 'Ciao! 👋 Come stai oggi?' },
  { type: 'user', text: 'Ciao! Sto bene, grazie! 😊' },
  { type: 'bot', text: "Ottimo! Oggi impariamo i verbi. Sai coniugare 'essere'?" },
  { type: 'user', text: 'Io sono, tu sei, lui è...' },
  { type: 'bot', text: 'Perfetto! ✨ Noi siamo, voi siete, loro sono. Bravo!' },
]

const features = [
  { icon: MessageCircle, title: 'Conversación natural', desc: 'Practica como si hablaras con un nativo' },
  { icon: CheckCircle2, title: 'Corrección inteligente', desc: 'Feedback instantáneo en gramática' },
  { icon: Clock, title: 'Disponible 24/7', desc: 'Aprende cuando quieras, donde quieras' },
  { icon: Zap, title: 'Adaptativo', desc: 'Se ajusta a tu nivel y ritmo' },
]

export default function VittoriaPreview() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const showNextMessage = () => {
      if (visibleMessages < chatMessages.length) {
        const nextMessage = chatMessages[visibleMessages]

        if (nextMessage.type === 'bot' && visibleMessages > 0) {
          setIsTyping(true)
          setTimeout(() => {
            setIsTyping(false)
            setVisibleMessages(prev => prev + 1)
          }, 1200)
        } else {
          setVisibleMessages(prev => prev + 1)
        }
      } else {
        setTimeout(() => setVisibleMessages(0), 3000)
      }
    }

    const timeout = setTimeout(showNextMessage, visibleMessages === 0 ? 800 : 1800)
    return () => clearTimeout(timeout)
  }, [visibleMessages])

  return (
    <section id="vittoria" className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-accent-100/50 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left: Info */}
          <AnimatedSection animation="slide-right">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
                  <Bot className="w-4 h-4" />
                  Tutor IA
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Conocé a{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-500 to-emerald-500">
                    Vittoria
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Tu tutora virtual de italiano disponible 24/7 en Telegram.
                  Practica conversación, mejora tu gramática y aprende vocabulario
                  de forma natural e interactiva.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, idx) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={idx}
                      className="group p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-accent-200 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-500">{feature.desc}</p>
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://t.me/ItaliciaBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30 hover:-translate-y-0.5 transition-all"
                >
                  <Send className="w-5 h-5" />
                  Probar gratis en Telegram
                </a>
                <Link
                  href="/vittoria/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Conocer más
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Chat mockup */}
          <AnimatedSection animation="slide-left" delay={200}>
            <div className="relative">
              <div className="relative mx-auto max-w-[320px]">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent-400 to-emerald-400 rounded-[40px] blur-2xl opacity-20" />

                <div className="relative bg-gray-900 rounded-[40px] p-3 shadow-2xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20" />

                  <div className="bg-[#0e1621] rounded-[32px] overflow-hidden">
                    <div className="bg-[#17212b] px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">V</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">VittorIA</h4>
                        <p className="text-accent-400 text-xs flex items-center gap-1">
                          <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
                          En línea
                        </p>
                      </div>
                    </div>

                    <div className="h-[380px] p-4 space-y-3 overflow-hidden">
                      {chatMessages.slice(0, visibleMessages).map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                          style={{
                            animation: 'fadeInUp 0.3s ease-out forwards',
                          }}
                        >
                          <div
                            className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                              msg.type === 'user'
                                ? 'bg-accent-500 text-white rounded-br-md'
                                : 'bg-[#182533] text-white rounded-bl-md'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-[#182533] px-4 py-3 rounded-2xl rounded-bl-md">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-[#17212b] px-4 py-3 flex items-center gap-3">
                      <div className="flex-1 bg-[#242f3d] rounded-full px-4 py-2">
                        <span className="text-gray-500 text-sm">Escribí un mensaje...</span>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center hover:bg-accent-600 transition-colors">
                        <Send className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 top-1/4 bg-white rounded-2xl shadow-lg p-3 animate-bounce-slow hidden lg:flex">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">¡Correcto!</span>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-white rounded-2xl shadow-lg p-3 animate-float hidden lg:flex">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700">+50 XP</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
