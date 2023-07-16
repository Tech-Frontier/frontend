/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/recruit/list',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig
