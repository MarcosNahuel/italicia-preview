import { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - Recursos para Aprender Italiano',
  description:
    'Artículos, guías y recursos sobre aprender italiano con IA, cultura italiana, técnicas de aprendizaje y preparación para certificaciones.',
  keywords: [
    'blog italiano',
    'aprender italiano',
    'recursos italiano',
    'cultura italiana',
    'italiano con IA',
  ],
  alternates: {
    canonical: 'https://italicia.com/blog/',
  },
}

const categories = [
  { name: 'Todos', slug: 'all' },
  { name: 'IA y Tecnología', slug: 'ia' },
  { name: 'Cultura', slug: 'cultura' },
  { name: 'Aprendizaje', slug: 'aprendizaje' },
  { name: 'Métodos', slug: 'metodos' },
]

const posts = [
  {
    title: 'La IA revoluciona el aprendizaje de idiomas',
    category: 'IA y Tecnología',
    categorySlug: 'ia',
    excerpt:
      'Cómo el procesamiento del lenguaje natural y el aprendizaje automático personalizan rutas de estudio y dan feedback inmediato para aprender idiomas más rápido.',
    href: 'https://www.berlitz.com/blog/ai-language-learning',
    img: 'https://images.contentstack.io/v3/assets/bltacc1a01c4d280f24/blt5fb5c2c1310fe8fc/657a7730177bfafa41f8a0f2/gettyimages-707448937_300dpi.jpg?auto=webp&fit=crop&format=pjpg&height=500&quality=80&width=900',
    source: 'Berlitz',
    featured: true,
  },
  {
    title: 'Practica italiano con ChatGPT: guía completa',
    category: 'IA y Tecnología',
    categorySlug: 'ia',
    excerpt:
      'Tutorial detallado sobre cómo usar ChatGPT para practicar conversación en italiano, mejorar vocabulario y recibir correcciones gramaticales.',
    href: 'https://courses.7weekitalian.com/blog/practice-italian-with-chatgpt',
    img: '/assets/chatgpt-learning-italian.jpg',
    source: '7 Week Italian',
    featured: true,
  },
  {
    title: 'Las mejores apps de IA para aprender italiano',
    category: 'IA y Tecnología',
    categorySlug: 'ia',
    excerpt:
      'Review completo y comparativa de las mejores aplicaciones con inteligencia artificial para aprender italiano en 2025.',
    href: 'https://languatalk.com/blog/italian/learn-italian-with-ai/',
    img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    source: 'LanguaTalk',
    featured: false,
  },
  {
    title: '5 ciudades italianas para mejorar tu italiano',
    category: 'Cultura',
    categorySlug: 'cultura',
    excerpt:
      'Un recorrido por los destinos más idóneos para practicar italiano: escuelas de idiomas, intercambios culturales y vida local.',
    href: 'https://gogoitalia.com/7-best-cities-in-italy-to-learn-italian/',
    img: 'https://gogoitalia.com/wp-content/uploads/2025/04/GGI-Blog-photo-watermarking-26.png',
    source: 'GoGo Italia',
    featured: false,
  },
  {
    title: 'Cómo aprender italiano: lo que realmente funciona',
    category: 'Métodos',
    categorySlug: 'metodos',
    excerpt:
      'Análisis de las técnicas más efectivas respaldadas por la ciencia: input comprensible, spaced repetition y práctica activa.',
    href: 'https://migaku.com/blog/language-fun/how-to-learn-italian',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    source: 'Migaku',
    featured: true,
  },
  {
    title: '23 tips respaldados por la ciencia para aprender italiano rápido',
    category: 'Aprendizaje',
    categorySlug: 'aprendizaje',
    excerpt:
      'Estrategias basadas en investigación científica para acelerar tu aprendizaje del italiano de forma efectiva.',
    href: 'https://www.berlitz.com/blog/how-to-learn-italian-fast',
    img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    source: 'Berlitz',
    featured: false,
  },
  {
    title: 'Técnicas de memorización para vocabulario italiano',
    category: 'Aprendizaje',
    categorySlug: 'aprendizaje',
    excerpt:
      'Spaced repetition, palacios de la memoria y otras 10 estrategias basadas en evidencia para retener nuevas palabras.',
    href: 'https://www.parlaitaliano.co.uk/10-ways-to-improve-your-memory-while-learning-italian/',
    img: 'https://www.parlaitaliano.co.uk/wp-content/uploads/sites/18/human-brain-with-paper-colors-generative-ai-scaled.jpg',
    source: 'Parla Italiano',
    featured: false,
  },
  {
    title: 'Cómo Duolingo usa la gamificación para engancharte',
    category: 'Métodos',
    categorySlug: 'metodos',
    excerpt:
      'Análisis Octalysis de los disparadores motivacionales detrás del éxito de la app de idiomas más popular del mundo.',
    href: 'https://raw.studio/blog/how-duolingo-utilises-gamification/',
    img: 'https://raw.studio/wp-content/uploads/featured-image-duolingo.png',
    source: 'Raw Studio',
    featured: false,
  },
  {
    title: 'ChatGPT como compañero de aprendizaje de italiano',
    category: 'IA y Tecnología',
    categorySlug: 'ia',
    excerpt:
      'Cómo usar ChatGPT de forma divertida e inteligente para mejorar tu italiano con ejercicios prácticos y conversación.',
    href: 'https://www.studentessamatta.com/ai-language-learning-with-chatgpt/',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    source: 'Studentessa Matta',
    featured: false,
  },
]

export default function BlogPage() {
  const featuredPosts = posts.filter(p => p.featured)
  const regularPosts = posts.filter(p => !p.featured)

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-900 to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Blog y Recursos
            </h1>
            <p className="text-xl text-gray-300">
              Artículos seleccionados sobre aprender italiano con IA, cultura italiana
              y técnicas de aprendizaje efectivas.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat.slug === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Destacados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <a
                key={post.title}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Fuente: {post.source}</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Todos los artículos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <a
                key={post.title}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{post.category}</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-gray-500">{post.source}</span>
                    <span className="text-xs text-primary-600 font-medium flex items-center">
                      Leer <ExternalLink className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Querés contenido exclusivo?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Descargá nuestra guía gratuita con las 100 palabras esenciales,
            errores comunes y un plan de estudio de 30 días.
          </p>
          <Link href="/guia-italiano/" className="btn-primary inline-flex items-center">
            Descargar Guía Gratuita
          </Link>
        </div>
      </section>
    </>
  )
}
