'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const posts = [
  {
    title: 'La IA revoluciona el aprendizaje de idiomas',
    category: 'Tecnología',
    excerpt:
      'Cómo el procesamiento del lenguaje natural y el aprendizaje automático personalizan rutas de estudio y dan feedback inmediato.',
    href: 'https://www.berlitz.com/blog/ai-language-learning',
    img: 'https://images.contentstack.io/v3/assets/bltacc1a01c4d280f24/blt5fb5c2c1310fe8fc/657a7730177bfafa41f8a0f2/gettyimages-707448937_300dpi.jpg?auto=webp&fit=crop&format=pjpg&height=500&quality=80&width=900',
  },
  {
    title: '5 ciudades italianas para mejorar tu italiano',
    category: 'Cultura',
    excerpt:
      'Un recorrido por los destinos más idóneos para practicar italiano a pie de calle: escuelas, intercambio y vida local.',
    href: 'https://gogoitalia.com/7-best-cities-in-italy-to-learn-italian/',
    img: 'https://gogoitalia.com/wp-content/uploads/2025/04/GGI-Blog-photo-watermarking-26.png',
  },
  {
    title: 'Técnicas de memorización para vocabulario italiano',
    category: 'Aprendizaje',
    excerpt:
      'Spaced repetition, palacios de la memoria y otras estrategias basadas en evidencia para retener nuevas palabras.',
    href: 'https://www.parlaitaliano.co.uk/10-ways-to-improve-your-memory-while-learning-italian/',
    img: 'https://www.parlaitaliano.co.uk/wp-content/uploads/sites/18/human-brain-with-paper-colors-generative-ai-scaled.jpg',
  },
  {
    title: 'Practica italiano con ChatGPT: guía completa',
    category: 'IA',
    excerpt:
      'Cómo usar ChatGPT para practicar conversación, vocabulario y pronunciación en italiano nivel A1-B2.',
    href: 'https://courses.7weekitalian.com/blog/practice-italian-with-chatgpt',
    img: '/assets/chatgpt-learning-italian.jpg',
  },
  {
    title: 'Cómo aprender italiano: lo que realmente funciona en 2025',
    category: 'Métodos',
    excerpt:
      'Análisis de las técnicas más efectivas respaldadas por la ciencia: input comprensible, consistencia y práctica activa.',
    href: 'https://migaku.com/blog/language-fun/how-to-learn-italian',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Cómo Duolingo usa la gamificación para engancharte',
    category: 'Gamificación',
    excerpt:
      'Análisis Octalysis de los disparadores motivacionales detrás del éxito de la app.',
    href: 'https://raw.studio/blog/how-duolingo-utilises-gamification/',
    img: 'https://raw.studio/wp-content/uploads/featured-image-duolingo.png',
  },
]

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Blog y Recursos</h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Artículos sobre cultura italiana, inteligencia artificial en la educación y consejos para
          aprender idiomas.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.title}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg shadow-md hover:shadow-xl transition overflow-hidden bg-white"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = '/assets/chatgpt-learning-italian.jpg'
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-accent-600 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>
                <span className="text-accent-600 font-medium inline-flex items-center text-sm">
                  Leer más
                  <ExternalLink className="w-4 h-4 ml-1" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/blog/"
            className="px-6 py-3 rounded-md border-2 border-accent-600 text-accent-600 font-semibold hover:bg-accent-600 hover:text-white transition"
          >
            Ver Todos los Artículos
          </Link>
        </div>
      </div>
    </section>
  )
}
