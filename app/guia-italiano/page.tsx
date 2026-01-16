import { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  AlertTriangle,
  Languages,
  Volume2,
  Bot,
  Calendar,
  CheckCircle,
  ArrowRight,
  Download,
  MessageCircle
} from 'lucide-react'
import SchemaOrg from '@/components/SchemaOrg'
import PrintButton from '@/components/PrintButton'

export const metadata: Metadata = {
  title: 'Guía Gratuita: Cómo Empezar a Aprender Italiano en 2025',
  description:
    'Guía completa y gratuita para aprender italiano desde cero. Incluye las 100 palabras más útiles, errores comunes a evitar, guía de pronunciación y plan de 30 días.',
  keywords: [
    'aprender italiano gratis',
    'guía italiano principiantes',
    'palabras básicas italiano',
    'pronunciación italiano',
    'italiano desde cero',
    'plan estudio italiano',
  ],
  alternates: {
    canonical: 'https://italicia.com/guia-italiano/',
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo empezar a aprender italiano desde cero',
  description: 'Guía paso a paso para comenzar tu viaje de aprendizaje del idioma italiano',
  totalTime: 'P30D',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Aprende las palabras básicas',
      text: 'Memoriza las 100 palabras italianas más útiles organizadas por categoría',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: 'Domina la pronunciación',
      text: 'Aprende las reglas básicas de pronunciación italiana',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'Evita los errores comunes',
      text: 'Conoce los 5 errores más frecuentes y cómo evitarlos',
      position: 3,
    },
    {
      '@type': 'HowToStep',
      name: 'Practica con IA',
      text: 'Usa el tutor virtual Vittoria para practicar conversación',
      position: 4,
    },
    {
      '@type': 'HowToStep',
      name: 'Sigue el plan de 30 días',
      text: 'Completa las actividades diarias del plan estructurado',
      position: 5,
    },
  ],
}

// Vocabulario esencial organizado por categorías
const vocabularyCategories = [
  {
    name: 'Saludos y Cortesía',
    words: [
      { italian: 'Ciao', spanish: 'Hola / Chau', pronunciation: 'chao' },
      { italian: 'Buongiorno', spanish: 'Buenos días', pronunciation: 'buon-yór-no' },
      { italian: 'Buonasera', spanish: 'Buenas tardes/noches', pronunciation: 'buo-na-sé-ra' },
      { italian: 'Buonanotte', spanish: 'Buenas noches (despedida)', pronunciation: 'buo-na-nót-te' },
      { italian: 'Arrivederci', spanish: 'Hasta luego', pronunciation: 'a-rri-ve-dér-chi' },
      { italian: 'Per favore', spanish: 'Por favor', pronunciation: 'per fa-vó-re' },
      { italian: 'Grazie', spanish: 'Gracias', pronunciation: 'grá-tsie' },
      { italian: 'Prego', spanish: 'De nada / Adelante', pronunciation: 'pré-go' },
      { italian: 'Scusa / Scusi', spanish: 'Disculpa / Disculpe', pronunciation: 'scú-sa / scú-si' },
      { italian: 'Mi dispiace', spanish: 'Lo siento', pronunciation: 'mi dis-piá-che' },
    ],
  },
  {
    name: 'Presentaciones',
    words: [
      { italian: 'Mi chiamo...', spanish: 'Me llamo...', pronunciation: 'mi quiá-mo' },
      { italian: 'Come ti chiami?', spanish: '¿Cómo te llamas?', pronunciation: 'có-me ti quiá-mi' },
      { italian: 'Piacere', spanish: 'Mucho gusto', pronunciation: 'pia-ché-re' },
      { italian: 'Sono di...', spanish: 'Soy de...', pronunciation: 'só-no di' },
      { italian: 'Abito a...', spanish: 'Vivo en...', pronunciation: 'á-bi-to a' },
      { italian: 'Ho ... anni', spanish: 'Tengo ... años', pronunciation: 'o ... án-ni' },
      { italian: 'Come stai?', spanish: '¿Cómo estás?', pronunciation: 'có-me stái' },
      { italian: 'Sto bene', spanish: 'Estoy bien', pronunciation: 'sto bé-ne' },
      { italian: 'E tu?', spanish: '¿Y tú?', pronunciation: 'e tu' },
      { italian: 'Anch\'io', spanish: 'Yo también', pronunciation: 'an-quío' },
    ],
  },
  {
    name: 'Números (0-20)',
    words: [
      { italian: 'Zero, uno, due', spanish: 'Cero, uno, dos', pronunciation: 'dsé-ro, ú-no, dú-e' },
      { italian: 'Tre, quattro, cinque', spanish: 'Tres, cuatro, cinco', pronunciation: 'tre, cuát-tro, chín-cue' },
      { italian: 'Sei, sette, otto', spanish: 'Seis, siete, ocho', pronunciation: 'séi, sét-te, ót-to' },
      { italian: 'Nove, dieci', spanish: 'Nueve, diez', pronunciation: 'nó-ve, diéchi' },
      { italian: 'Undici, dodici', spanish: 'Once, doce', pronunciation: 'ún-di-chi, dó-di-chi' },
      { italian: 'Tredici, quattordici', spanish: 'Trece, catorce', pronunciation: 'tré-di-chi, cua-tór-di-chi' },
      { italian: 'Quindici, sedici', spanish: 'Quince, dieciséis', pronunciation: 'cuín-di-chi, sé-di-chi' },
      { italian: 'Diciassette', spanish: 'Diecisiete', pronunciation: 'di-cha-sét-te' },
      { italian: 'Diciotto, diciannove', spanish: 'Dieciocho, diecinueve', pronunciation: 'di-chót-to, di-cha-nó-ve' },
      { italian: 'Venti', spanish: 'Veinte', pronunciation: 'vén-ti' },
    ],
  },
  {
    name: 'Verbos Esenciales',
    words: [
      { italian: 'Essere (sono)', spanish: 'Ser/Estar (soy/estoy)', pronunciation: 'és-se-re (só-no)' },
      { italian: 'Avere (ho)', spanish: 'Tener (tengo)', pronunciation: 'a-vé-re (o)' },
      { italian: 'Fare (faccio)', spanish: 'Hacer (hago)', pronunciation: 'fá-re (fá-cho)' },
      { italian: 'Andare (vado)', spanish: 'Ir (voy)', pronunciation: 'an-dá-re (vá-do)' },
      { italian: 'Venire (vengo)', spanish: 'Venir (vengo)', pronunciation: 've-ní-re (vén-go)' },
      { italian: 'Volere (voglio)', spanish: 'Querer (quiero)', pronunciation: 'vo-lé-re (vó-lio)' },
      { italian: 'Potere (posso)', spanish: 'Poder (puedo)', pronunciation: 'po-té-re (pós-so)' },
      { italian: 'Dovere (devo)', spanish: 'Deber (debo)', pronunciation: 'do-vé-re (dé-vo)' },
      { italian: 'Parlare (parlo)', spanish: 'Hablar (hablo)', pronunciation: 'par-lá-re (pár-lo)' },
      { italian: 'Capire (capisco)', spanish: 'Entender (entiendo)', pronunciation: 'ca-pí-re (ca-pís-co)' },
    ],
  },
  {
    name: 'Preguntas Útiles',
    words: [
      { italian: 'Che cosa?', spanish: '¿Qué?', pronunciation: 'que có-sa' },
      { italian: 'Chi?', spanish: '¿Quién?', pronunciation: 'qui' },
      { italian: 'Dove?', spanish: '¿Dónde?', pronunciation: 'dó-ve' },
      { italian: 'Quando?', spanish: '¿Cuándo?', pronunciation: 'cuán-do' },
      { italian: 'Perché?', spanish: '¿Por qué? / Porque', pronunciation: 'per-qué' },
      { italian: 'Come?', spanish: '¿Cómo?', pronunciation: 'có-me' },
      { italian: 'Quanto costa?', spanish: '¿Cuánto cuesta?', pronunciation: 'cuán-to cós-ta' },
      { italian: 'Dov\'è...?', spanish: '¿Dónde está...?', pronunciation: 'do-vé' },
      { italian: 'C\'è...?', spanish: '¿Hay...?', pronunciation: 'ché' },
      { italian: 'Che ore sono?', spanish: '¿Qué hora es?', pronunciation: 'que ó-re só-no' },
    ],
  },
  {
    name: 'Palabras Cotidianas',
    words: [
      { italian: 'Sì / No', spanish: 'Sí / No', pronunciation: 'si / no' },
      { italian: 'Bene / Male', spanish: 'Bien / Mal', pronunciation: 'bé-ne / má-le' },
      { italian: 'Grande / Piccolo', spanish: 'Grande / Pequeño', pronunciation: 'grán-de / píc-co-lo' },
      { italian: 'Molto / Poco', spanish: 'Mucho / Poco', pronunciation: 'mól-to / pó-co' },
      { italian: 'Oggi / Domani', spanish: 'Hoy / Mañana', pronunciation: 'ód-yi / do-má-ni' },
      { italian: 'Ieri', spanish: 'Ayer', pronunciation: 'ié-ri' },
      { italian: 'Sempre / Mai', spanish: 'Siempre / Nunca', pronunciation: 'sém-pre / mái' },
      { italian: 'Adesso / Dopo', spanish: 'Ahora / Después', pronunciation: 'a-dés-so / dó-po' },
      { italian: 'Qui / Là', spanish: 'Aquí / Allá', pronunciation: 'cuí / la' },
      { italian: 'Con / Senza', spanish: 'Con / Sin', pronunciation: 'con / sén-tsa' },
    ],
  },
  {
    name: 'Comida y Bebida',
    words: [
      { italian: 'Acqua', spanish: 'Agua', pronunciation: 'ác-cua' },
      { italian: 'Caffè', spanish: 'Café', pronunciation: 'caf-fé' },
      { italian: 'Vino', spanish: 'Vino', pronunciation: 'ví-no' },
      { italian: 'Birra', spanish: 'Cerveza', pronunciation: 'bír-ra' },
      { italian: 'Pane', spanish: 'Pan', pronunciation: 'pá-ne' },
      { italian: 'Pasta', spanish: 'Pasta', pronunciation: 'pás-ta' },
      { italian: 'Pizza', spanish: 'Pizza', pronunciation: 'pít-tsa' },
      { italian: 'Gelato', spanish: 'Helado', pronunciation: 'ye-lá-to' },
      { italian: 'Il conto', spanish: 'La cuenta', pronunciation: 'il cón-to' },
      { italian: 'Buon appetito!', spanish: '¡Buen provecho!', pronunciation: 'buon ap-pe-tí-to' },
    ],
  },
  {
    name: 'Lugares',
    words: [
      { italian: 'Casa', spanish: 'Casa', pronunciation: 'cá-sa' },
      { italian: 'Ristorante', spanish: 'Restaurante', pronunciation: 'ris-to-rán-te' },
      { italian: 'Hotel', spanish: 'Hotel', pronunciation: 'o-tél' },
      { italian: 'Stazione', spanish: 'Estación', pronunciation: 'sta-tsió-ne' },
      { italian: 'Aeroporto', spanish: 'Aeropuerto', pronunciation: 'a-e-ro-pór-to' },
      { italian: 'Ospedale', spanish: 'Hospital', pronunciation: 'os-pe-dá-le' },
      { italian: 'Farmacia', spanish: 'Farmacia', pronunciation: 'far-ma-chí-a' },
      { italian: 'Banca', spanish: 'Banco', pronunciation: 'bán-ca' },
      { italian: 'Supermercato', spanish: 'Supermercado', pronunciation: 'su-per-mer-cá-to' },
      { italian: 'Bagno', spanish: 'Baño', pronunciation: 'bá-nio' },
    ],
  },
  {
    name: 'Tiempo y Clima',
    words: [
      { italian: 'Che tempo fa?', spanish: '¿Qué tiempo hace?', pronunciation: 'que tém-po fa' },
      { italian: 'Fa caldo', spanish: 'Hace calor', pronunciation: 'fa cál-do' },
      { italian: 'Fa freddo', spanish: 'Hace frío', pronunciation: 'fa fréd-do' },
      { italian: 'Piove', spanish: 'Llueve', pronunciation: 'pió-ve' },
      { italian: 'C\'è il sole', spanish: 'Hay sol', pronunciation: 'ché il só-le' },
      { italian: 'Lunedì, Martedì', spanish: 'Lunes, Martes', pronunciation: 'lu-ne-dí, mar-te-dí' },
      { italian: 'Mercoledì, Giovedì', spanish: 'Miércoles, Jueves', pronunciation: 'mer-co-le-dí, yo-ve-dí' },
      { italian: 'Venerdì, Sabato', spanish: 'Viernes, Sábado', pronunciation: 've-ner-dí, sá-ba-to' },
      { italian: 'Domenica', spanish: 'Domingo', pronunciation: 'do-mé-ni-ca' },
      { italian: 'Settimana', spanish: 'Semana', pronunciation: 'set-ti-má-na' },
    ],
  },
  {
    name: 'Frases de Supervivencia',
    words: [
      { italian: 'Non capisco', spanish: 'No entiendo', pronunciation: 'non ca-pís-co' },
      { italian: 'Parla più lentamente', spanish: 'Habla más lento', pronunciation: 'pár-la piú len-ta-mén-te' },
      { italian: 'Può ripetere?', spanish: '¿Puede repetir?', pronunciation: 'puó ri-pé-te-re' },
      { italian: 'Come si dice...?', spanish: '¿Cómo se dice...?', pronunciation: 'có-me si dí-che' },
      { italian: 'Ho bisogno di...', spanish: 'Necesito...', pronunciation: 'o bi-só-nio di' },
      { italian: 'Mi può aiutare?', spanish: '¿Me puede ayudar?', pronunciation: 'mi puó a-iu-tá-re' },
      { italian: 'Sto imparando l\'italiano', spanish: 'Estoy aprendiendo italiano', pronunciation: 'sto im-pa-rán-do li-ta-liá-no' },
      { italian: 'Non parlo bene italiano', spanish: 'No hablo bien italiano', pronunciation: 'non pár-lo bé-ne i-ta-liá-no' },
      { italian: 'Va bene', spanish: 'Está bien', pronunciation: 'va bé-ne' },
      { italian: 'Perfetto!', spanish: '¡Perfecto!', pronunciation: 'per-fét-to' },
    ],
  },
]

// Errores comunes
const commonMistakes = [
  {
    title: 'Traducir palabra por palabra del español',
    description: 'Aunque el italiano y el español son similares, hay diferencias importantes.',
    wrong: '"Io sono 25 anni" (calco del español "Yo tengo 25 años")',
    correct: '"Ho 25 anni" (en italiano se usa "avere" para la edad)',
    tip: 'En italiano se "tiene" la edad, no se "es" la edad. También se "tiene" hambre, sed, frío, calor, miedo, etc.',
  },
  {
    title: 'Ignorar las consonantes dobles',
    description: 'Las consonantes dobles cambian el significado y la pronunciación.',
    wrong: '"Pena" (pena, tristeza) vs "Penna" (bolígrafo)',
    correct: 'Pronunciar cada consonante doble alargando el sonido',
    tip: 'Practica con pares mínimos: casa/cassa, caro/carro, pala/palla, nono/nonno.',
  },
  {
    title: 'Confundir "essere" y "stare"',
    description: 'Ambos se traducen como "estar" pero se usan diferente.',
    wrong: '"Sto italiano" para decir "Soy italiano"',
    correct: '"Sono italiano" (caratteristica permanente) vs "Sto bene" (estado temporal)',
    tip: '"Essere" para características permanentes, "stare" para estados temporales y con el gerundio.',
  },
  {
    title: 'No usar los artículos correctamente',
    description: 'El italiano tiene más artículos que el español y se usan más.',
    wrong: '"Vado a casa" sin artículo cuando se necesita',
    correct: '"Vado a casa" (mi casa) vs "Vado alla casa di Marco" (la casa de Marco)',
    tip: 'Los artículos cambian según el género y si la palabra empieza con vocal, s+consonante, o z.',
  },
  {
    title: 'Pronunciar "gli", "gn" y "sc" incorrectamente',
    description: 'Estos sonidos no existen en español y requieren práctica.',
    wrong: 'Pronunciar "famiglia" como "familia" o "gnocchi" con g dura',
    correct: '"gli" = ll (como en millón), "gn" = ñ, "sci/sce" = sh',
    tip: 'Practica con: figlio, moglie, bagno, lasagne, pesce, uscire.',
  },
]

// Plan de 30 días
const thirtyDayPlan = [
  { week: 'Semana 1', theme: 'Bases y Saludos', days: [
    'Aprende los saludos básicos (Ciao, Buongiorno, etc.)',
    'Practica las presentaciones (Mi chiamo, Sono di...)',
    'Memoriza los números del 0 al 10',
    'Estudia los pronombres personales (io, tu, lui/lei)',
    'Practica con Vittoria: conversación de presentación',
    'Repaso de lo aprendido',
    'Descanso activo: escucha música italiana',
  ]},
  { week: 'Semana 2', theme: 'Verbos y Preguntas', days: [
    'Aprende "essere" (ser/estar) en presente',
    'Aprende "avere" (tener) en presente',
    'Memoriza los números del 11 al 20',
    'Estudia las preguntas básicas (Chi?, Dove?, Quando?)',
    'Practica con Vittoria: preguntas y respuestas',
    'Repaso de verbos',
    'Descanso activo: mira un video corto en italiano',
  ]},
  { week: 'Semana 3', theme: 'Vocabulario Cotidiano', days: [
    'Aprende vocabulario de comida y bebida',
    'Aprende vocabulario de lugares',
    'Memoriza los días de la semana',
    'Estudia los artículos (il, la, lo, i, le, gli)',
    'Practica con Vittoria: pedir en un restaurante',
    'Repaso de vocabulario',
    'Descanso activo: lee un menú italiano online',
  ]},
  { week: 'Semana 4', theme: 'Consolidación', days: [
    'Aprende verbos regulares -are (parlare, mangiare)',
    'Practica frases de supervivencia',
    'Memoriza expresiones de tiempo (oggi, domani, ieri)',
    'Estudia adjetivos básicos (grande, piccolo, bello)',
    'Practica con Vittoria: conversación completa',
    'Repaso general de las 4 semanas',
    'Evaluación: ¿Qué aprendiste? ¿Qué necesitas reforzar?',
  ]},
]

export default function GuiaItalianoPage() {
  return (
    <>
      <SchemaOrg schema={howToSchema} />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-primary-900 to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-accent-500/20 text-accent-400 rounded-full text-sm font-semibold mb-6">
              GUÍA GRATUITA
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cómo Empezar a Aprender Italiano en 2025
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Guía completa con las 100 palabras esenciales, errores a evitar, pronunciación y un plan de estudio de 30 días.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrintButton />
              <a
                href="https://t.me/ItaliciaBot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center no-print"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Practicar con Vittoria
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Índice */}
      <section className="py-12 bg-gray-50 no-print">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-accent-600" />
              Contenido de la Guía
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: BookOpen, title: 'Introducción al Italiano', href: '#introduccion' },
                { icon: AlertTriangle, title: '5 Errores Comunes a Evitar', href: '#errores' },
                { icon: Languages, title: '100 Palabras Esenciales', href: '#vocabulario' },
                { icon: Volume2, title: 'Guía de Pronunciación', href: '#pronunciacion' },
                { icon: Bot, title: 'Cómo Usar Vittoria (IA)', href: '#vittoria' },
                { icon: Calendar, title: 'Plan de Estudio 30 Días', href: '#plan' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <item.icon className="w-5 h-5 text-accent-600 mr-3" />
                  <span className="font-medium text-gray-900">{item.title}</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introducción */}
      <section id="introduccion" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              <span className="text-accent-600">1.</span> Introducción: ¿Por qué aprender italiano?
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                El italiano es uno de los idiomas más hermosos y musicales del mundo. Con <strong>más de 85 millones de hablantes</strong>,
                es el idioma oficial de Italia, Suiza, San Marino y el Vaticano. Pero más allá de los números,
                aprender italiano te abre las puertas a:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🎨 Cultura y Arte</h3>
                  <p className="text-gray-700">
                    Italia es cuna del Renacimiento. Entender italiano te permite apreciar a Da Vinci,
                    Miguel Ángel y la ópera en su idioma original.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🍝 Gastronomía</h3>
                  <p className="text-gray-700">
                    La cocina italiana es patrimonio de la humanidad. Saber italiano te permite
                    entender recetas auténticas y la cultura del "slow food".
                  </p>
                </div>
                <div className="bg-amber-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">💼 Oportunidades</h3>
                  <p className="text-gray-700">
                    Italia es la 8va economía mundial. Moda, diseño, automotriz y turismo
                    ofrecen oportunidades laborales para quienes hablan italiano.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🇦🇷 Conexión Argentina</h3>
                  <p className="text-gray-700">
                    Más del 60% de los argentinos tienen ascendencia italiana.
                    Aprender italiano es reconectar con tus raíces y obtener ciudadanía.
                  </p>
                </div>
              </div>

              <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-2">¿Qué esperar de esta guía?</h3>
                <p className="text-gray-700">
                  En las próximas secciones encontrarás todo lo necesario para dar tus primeros pasos:
                  vocabulario esencial, errores comunes a evitar, guía de pronunciación y un plan
                  estructurado de 30 días. Todo diseñado para que puedas empezar a comunicarte
                  en italiano lo antes posible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Errores Comunes */}
      <section id="errores" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              <span className="text-accent-600">2.</span> Los 5 Errores Más Comunes (y cómo evitarlos)
            </h2>

            <p className="text-gray-700 text-lg mb-8">
              Como hispanohablante, tienes una ventaja enorme: el italiano y el español comparten raíces latinas.
              Pero esta similitud también puede ser una trampa. Estos son los errores más frecuentes:
            </p>

            <div className="space-y-6">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 text-red-600 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{mistake.title}</h3>
                      <p className="text-gray-600 mb-4">{mistake.description}</p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-red-50 p-4 rounded-lg">
                          <p className="text-sm font-semibold text-red-700 mb-1">❌ Incorrecto:</p>
                          <p className="text-gray-700 italic">{mistake.wrong}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm font-semibold text-green-700 mb-1">✅ Correcto:</p>
                          <p className="text-gray-700 italic">{mistake.correct}</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 mb-1">💡 Consejo:</p>
                        <p className="text-gray-700">{mistake.tip}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vocabulario */}
      <section id="vocabulario" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              <span className="text-accent-600">3.</span> Las 100 Palabras Italianas Más Útiles
            </h2>

            <p className="text-gray-700 text-lg mb-8">
              Con estas 100 palabras podrás desenvolverte en situaciones cotidianas básicas.
              Incluimos la pronunciación aproximada para hispanohablantes.
            </p>

            <div className="space-y-8">
              {vocabularyCategories.map((category, catIndex) => (
                <div key={catIndex} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="bg-accent-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                      {catIndex + 1}
                    </span>
                    {category.name}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 text-sm font-semibold text-gray-600">Italiano</th>
                          <th className="text-left py-2 px-3 text-sm font-semibold text-gray-600">Español</th>
                          <th className="text-left py-2 px-3 text-sm font-semibold text-gray-600">Pronunciación</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.words.map((word, wordIndex) => (
                          <tr key={wordIndex} className="border-b border-gray-100 last:border-0">
                            <td className="py-2 px-3 font-medium text-primary-700">{word.italian}</td>
                            <td className="py-2 px-3 text-gray-700">{word.spanish}</td>
                            <td className="py-2 px-3 text-gray-500 italic text-sm">[{word.pronunciation}]</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pronunciación */}
      <section id="pronunciacion" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              <span className="text-accent-600">4.</span> Guía de Pronunciación Italiana
            </h2>

            <p className="text-gray-700 text-lg mb-8">
              La buena noticia: el italiano se pronuncia casi exactamente como se escribe.
              Una vez que aprendas estas reglas básicas, podrás leer cualquier palabra italiana.
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📌 Reglas Básicas</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Todas las letras se pronuncian</strong> - No hay letras mudas como en español (h) o francés</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3 mt-1 flex-shrink-0" />
                    <span><strong>El acento suele caer en la penúltima sílaba</strong> - Como en español: ca-SA, a-MI-co</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Las consonantes dobles se alargan</strong> - "pizza" suena "pit-tsa", no "piza"</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔤 Sonidos Especiales</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold">Letra(s)</th>
                        <th className="text-left py-3 px-4 font-semibold">Sonido</th>
                        <th className="text-left py-3 px-4 font-semibold">Ejemplo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 px-4 font-mono bg-gray-50">C + e/i</td>
                        <td className="py-3 px-4">como "ch" en español</td>
                        <td className="py-3 px-4"><em>ciao</em> [chao], <em>cena</em> [chena]</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono bg-gray-50">C + a/o/u</td>
                        <td className="py-3 px-4">como "k"</td>
                        <td className="py-3 px-4"><em>casa</em> [kasa], <em>come</em> [kome]</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono bg-gray-50">CH</td>
                        <td className="py-3 px-4">como "k" (antes de e/i)</td>
                        <td className="py-3 px-4"><em>che</em> [ke], <em>chi</em> [ki]</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono bg-gray-50">G + e/i</td>
                        <td className="py-3 px-4">como "y" argentina o "j" inglesa</td>
                        <td className="py-3 px-4"><em>gelato</em> [yelato], <em>giro</em> [yiro]</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono bg-gray-50">G + a/o/u</td>
                        <td className="py-3 px-4">como "g" en gato</td>
                        <td className="py-3 px-4"><em>gatto</em> [gato], <em>gusto</em> [gusto]</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono bg-gray-50">GH</td>
                        <td className="py-3 px-4">como "g" en gato (antes de e/i)</td>
                        <td className="py-3 px-4"><em>ghetto</em> [gueto], <em>laghi</em> [lagui]</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono bg-gray-50">GLI</td>
                        <td className="py-3 px-4">como "ll" en millón</td>
                        <td className="py-3 px-4"><em>figlio</em> [filio], <em>famiglia</em> [familia]</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono bg-gray-50">GN</td>
                        <td className="py-3 px-4">como "ñ" en español</td>
                        <td className="py-3 px-4"><em>gnocchi</em> [ñoki], <em>bagno</em> [baño]</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono bg-gray-50">SC + e/i</td>
                        <td className="py-3 px-4">como "sh" en inglés</td>
                        <td className="py-3 px-4"><em>pesce</em> [peshe], <em>uscire</em> [ushíre]</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono bg-gray-50">Z / ZZ</td>
                        <td className="py-3 px-4">como "ts" o "ds"</td>
                        <td className="py-3 px-4"><em>pizza</em> [pittsa], <em>zero</em> [dsero]</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-2">💡 Consejo Práctico</h3>
                <p className="text-gray-700">
                  La mejor manera de mejorar tu pronunciación es <strong>escuchar y repetir</strong>.
                  Usa el bot Vittoria para practicar: te corregirá y te dará feedback en tiempo real.
                  También puedes escuchar música italiana, podcasts o ver series con subtítulos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo usar Vittoria */}
      <section id="vittoria" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              <span className="text-accent-600">5.</span> Cómo Usar Vittoria (Tu Tutor IA)
            </h2>

            <p className="text-gray-700 text-lg mb-8">
              Vittoria es tu compañera de aprendizaje disponible 24/7 en Telegram.
              Es una inteligencia artificial diseñada específicamente para ayudarte a aprender italiano.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">¿Qué puede hacer Vittoria?</h3>
                <ul className="space-y-3">
                  {[
                    'Conversar contigo en italiano (adaptándose a tu nivel)',
                    'Corregir tus errores de gramática y ortografía',
                    'Explicarte reglas gramaticales con ejemplos',
                    'Enseñarte vocabulario nuevo con contexto',
                    'Proponerte ejercicios personalizados',
                    'Prepararte para certificaciones oficiales',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#e6ebee] rounded-xl p-4">
                <div className="bg-[#0088cc] text-white p-3 rounded-t-lg -mx-4 -mt-4 mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <span className="font-bold">V</span>
                  </div>
                  <div>
                    <p className="font-bold">VittorIA</p>
                    <p className="text-xs opacity-80">bot</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg max-w-[85%]">
                    <p className="text-sm">Ciao! 👋 Sono Vittoria. Come posso aiutarti oggi?</p>
                  </div>
                  <div className="bg-[#effdde] p-3 rounded-lg max-w-[85%] ml-auto">
                    <p className="text-sm">Voglio practicare italiano basico</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg max-w-[85%]">
                    <p className="text-sm">Perfetto! 📚 Piccola correzione: si dice "praticare" non "practicare". Iniziamo! Come ti chiami?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cómo empezar con Vittoria</h3>
              <ol className="space-y-4">
                {[
                  { step: 'Abrí Telegram y buscá @ItaliciaBot', detail: 'O hacé click en el botón de abajo' },
                  { step: 'Iniciá la conversación con /start', detail: 'Vittoria te saludará y te preguntará tu nivel' },
                  { step: 'Indicale que sos principiante', detail: 'Escribí "Sono principiante" o "Estoy empezando"' },
                  { step: 'Empezá a practicar', detail: 'Podés pedirle ejercicios, vocabulario o simplemente conversar' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-accent-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{item.step}</p>
                      <p className="text-gray-600 text-sm">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 text-center">
                <a
                  href="https://t.me/ItaliciaBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-[#0088cc] text-white font-bold rounded-full hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Comenzar con Vittoria
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan de 30 días */}
      <section id="plan" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              <span className="text-accent-600">6.</span> Plan de Estudio de 30 Días
            </h2>

            <p className="text-gray-700 text-lg mb-8">
              Este plan está diseñado para dedicar 20-30 minutos diarios. Es flexible: si un día no podés,
              recuperalo al siguiente. Lo importante es la consistencia, no la perfección.
            </p>

            <div className="space-y-8">
              {thirtyDayPlan.map((week, weekIndex) => (
                <div key={weekIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-primary-900 text-white p-4">
                    <h3 className="text-xl font-bold">{week.week}: {week.theme}</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-3">
                      {week.days.map((day, dayIndex) => (
                        <div key={dayIndex} className="flex items-start">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                            dayIndex === 6 ? 'bg-amber-100 text-amber-600' : 'bg-accent-100 text-accent-600'
                          }`}>
                            {weekIndex * 7 + dayIndex + 1}
                          </div>
                          <div className="flex-grow">
                            <p className={`${dayIndex === 6 ? 'text-amber-700 italic' : 'text-gray-700'}`}>
                              {day}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-accent-50 border-l-4 border-accent-500 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">🎯 Después del día 30</h3>
              <p className="text-gray-700 mb-4">
                Al completar este plan tendrás una base sólida del italiano. El siguiente paso es
                profundizar con nuestros cursos estructurados donde Alicia te guiará personalmente
                y podrás usar Vittoria de forma ilimitada.
              </p>
              <Link
                href="/#precios"
                className="inline-flex items-center text-accent-600 font-semibold hover:text-accent-700"
              >
                Ver planes de cursos <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary-900 text-white no-print">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para empezar tu viaje con el italiano?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ya tenés todo lo necesario para dar tus primeros pasos.
            Ahora es momento de practicar con Vittoria y explorar nuestros cursos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/ItaliciaBot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Practicar con Vittoria
            </a>
            <Link href="/#precios" className="btn-secondary inline-flex items-center justify-center">
              Ver Cursos
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
