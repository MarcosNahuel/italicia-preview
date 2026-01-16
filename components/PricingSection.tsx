'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Sparkles, Zap, Crown } from 'lucide-react'
import SchemaOrg from './SchemaOrg'
import AnimatedSection from './AnimatedSection'

const plans = [
  {
    name: 'Base',
    price: '$75.000',
    priceNumber: 75000,
    description: 'Ideal para comenzar tu viaje',
    icon: Zap,
    features: [
      'Acceso a material de estudio',
      'Clases grabadas HD',
      'Soporte por email',
      'Certificado de finalización',
    ],
    popular: false,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Intermedio',
    price: '$110.000',
    priceNumber: 110000,
    description: 'Para aprendizaje acelerado',
    icon: Sparkles,
    features: [
      '6 clases sincrónicas en vivo',
      'Biblioteca completa de recursos',
      'Soporte prioritario',
      'Acceso a Vittoria IA',
      'Práctica conversacional',
    ],
    popular: true,
    gradient: 'from-accent-400 to-emerald-500',
  },
  {
    name: 'Premium',
    price: '$150.000',
    priceNumber: 150000,
    description: 'Experiencia completa e inmersiva',
    icon: Crown,
    features: [
      '12 clases sincrónicas en vivo',
      'Acceso ilimitado a todo',
      'Soporte 24/7 prioritario',
      'Vittoria IA ilimitado',
      'Preparación certificaciones',
      'Mentorías personalizadas',
    ],
    popular: false,
    gradient: 'from-purple-500 to-pink-500',
  },
]

export default function PricingSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const offersSchema = plans.map((plan) => ({
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: `Curso Italiano A1 - Plan ${plan.name}`,
    price: plan.priceNumber,
    priceCurrency: 'ARS',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'ItalicIA' },
  }))

  return (
    <section id="precios" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2Mmgtdi0yem0xMy0yaDF2NGgtMXYtNHptLTEgMmgtMXYxaDF2LTF6bTAgMmgtMXYxaDF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <SchemaOrg schema={offersSchema} />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-accent-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Planes flexibles
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Elige tu camino al italiano
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Todos los planes incluyen acceso al material base y certificado de finalización
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const isHovered = hoveredIndex === index

            return (
              <AnimatedSection
                key={plan.name}
                animation="fade-up"
                delay={index * 100}
              >
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative group h-full rounded-2xl transition-all duration-500 ${
                    plan.popular
                      ? 'md:-mt-4 md:mb-4'
                      : ''
                  }`}
                >
                  {/* Gradient border effect */}
                  <div
                    className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-b ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
                  />
                  <div
                    className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-b ${plan.gradient} ${
                      plan.popular ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    } transition-opacity duration-500`}
                  />

                  {/* Card content */}
                  <div
                    className={`relative h-full rounded-2xl bg-primary-800/90 backdrop-blur-xl p-8 flex flex-col ${
                      plan.popular ? 'bg-primary-800/95' : ''
                    }`}
                  >
                    {/* Popular badge */}
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-accent-400 to-emerald-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-accent-500/25">
                          <Sparkles className="w-3.5 h-3.5" />
                          Más popular
                        </span>
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-6">
                      <div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.gradient} mb-4`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                      <p className="text-white/50 text-sm">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-white/40 text-sm">ARS</span>
                      </div>
                      <p className="text-white/40 text-sm mt-1">Pago único · 12 semanas</p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center mt-0.5`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-white/70 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href="/#contacto"
                      className={`relative w-full py-4 rounded-xl font-semibold text-center transition-all duration-300 overflow-hidden group/btn ${
                        plan.popular
                          ? 'bg-gradient-to-r from-accent-400 to-emerald-500 text-white shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30 hover:-translate-y-0.5'
                          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="relative z-10">
                        {plan.popular ? 'Comenzar ahora' : 'Más información'}
                      </span>
                      {plan.popular && (
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection animation="fade-up" delay={400} className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <p className="text-white/70">
              ¿Necesitas un plan personalizado para tu empresa?
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-medium transition-all hover:-translate-y-0.5"
            >
              Contactar ventas
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
