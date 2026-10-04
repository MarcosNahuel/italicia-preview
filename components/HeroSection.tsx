'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0 scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />

      {/* Gradient Overlay - más sutil para mostrar la imagen */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 via-primary-900/40 to-transparent z-0" />

      {/* Animated shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-bounce-slow" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent-400/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-accent-500/20 backdrop-blur-sm border border-accent-500/30 rounded-full text-accent-400 text-sm font-medium mb-6 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
            </span>
            Nuevo: Tutor IA disponible 24/7
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Un método innovador para aprender italiano: combina{' '}
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-400 via-green-400 to-accent-500 animate-gradient bg-[length:200%_auto]">
                IA
              </span>
            </span>
            , enseñanza personalizada y clases dinámicas en un solo lugar.
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Cursos A1, A2 y conversación con Alicia. Clases, lecturas y materiales de Italicia para aprender y usar el idioma.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link
              href="/cursos/"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent-500/25"
            >
              <span className="relative z-10">Ver los cursos</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/materiales/"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/30 transition-all hover:scale-105"
            >
              <span>Conocer los materiales</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-6 max-w-lg transition-all duration-700 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">
                A1 · A2
              </div>
              <div className="text-sm text-gray-400 mt-1">Cursos de italiano</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-white">
                Parliamo
              </div>
              <div className="text-sm text-gray-400 mt-1">Conversación</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">
                24/7
              </div>
              <div className="text-sm text-gray-400 mt-1">Tutor IA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
