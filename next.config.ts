import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: true,
  async headers() {
    return ['/api/libros/:path*', '/compra/:path*'].map(source => ({
      source,
      headers: [
        { key: 'Cache-Control', value: 'private, no-store, max-age=0' },
        { key: 'Referrer-Policy', value: 'no-referrer' },
        { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
      ],
    }))
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.contentstack.io',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
    ],
  },
}

export default nextConfig
