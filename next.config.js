/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  outDir: ".next",
  experimental: { appDir: true },
};

module.exports = nextConfig;