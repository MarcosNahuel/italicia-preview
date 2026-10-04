export const privateHeaders = { 'Cache-Control': 'private, no-store, max-age=0', 'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow' }
export const json = (value: unknown, status = 200) => Response.json(value, { status, headers: privateHeaders })
export function sameOrigin(request: Request) {
  return request.headers.get('origin') === new URL(request.url).origin
}
export async function smallJson(request: Request): Promise<Record<string, unknown>> {
  if (Number(request.headers.get('content-length') ?? 0) > 32_768) throw new Error('Request too large')
  const text = await request.text()
  if (text.length > 32_768) throw new Error('Request too large')
  const value = JSON.parse(text)
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid request')
  return value
}
