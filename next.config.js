const url = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
    domains: [url],
  },
}

module.exports = nextConfig
