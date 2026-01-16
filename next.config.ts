import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
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
