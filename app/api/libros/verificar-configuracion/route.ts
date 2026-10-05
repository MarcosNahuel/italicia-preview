import { configurationIssues, paymentMode, required } from '@/lib/commerce/config'
import { equalSecret } from '@/lib/commerce/security'
import { verifyProviderConfiguration } from '@/lib/commerce/providers'
import { privatePdf } from '@/lib/commerce/store'
import { json } from '@/lib/commerce/http'

export const runtime = 'nodejs'
export const maxDuration = 60
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || !equalSecret(request.headers.get('authorization') ?? '', `Bearer ${secret}`)) return json({ error: 'Unauthorized' }, 401)
  try {
    const [providers, files] = await Promise.all([
      verifyProviderConfiguration(),
      Promise.all(['BOOK_PDF_MANUAL_A1', 'BOOK_PDF_LECTURA_A1'].map(async name => {
        const pdf = await privatePdf(required(name))
        const available = pdf?.statusCode === 200 && pdf.blob.contentType === 'application/pdf'
        if (pdf?.stream) await pdf.stream.cancel()
        return available
      })),
    ])
    return json({ mode: paymentMode(), ...providers, privatePdfsAvailable: files.every(Boolean), issues: ['manual-a1', 'lectura-a1'].flatMap(product => ['mercadoPago', 'paypal'].flatMap(provider => configurationIssues(product, provider as 'mercadoPago' | 'paypal'))) })
  } catch { return json({ error: 'Configuration check unavailable' }, 503) }
}
