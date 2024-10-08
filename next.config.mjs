/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.themealdb.com'],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
