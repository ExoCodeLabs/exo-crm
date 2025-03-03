/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  output: "export",
  reactStrictMode: true,
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://exocodelabs.github.io/exo-crm/"
      : "",
  basePath: process.env.NODE_ENV === "production" ? "/exo-crm" : "",
}

export default nextConfig
