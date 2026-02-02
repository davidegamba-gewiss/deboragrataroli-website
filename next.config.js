/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Transpile react-icons for Turbopack compatibility
  transpilePackages: ['react-icons'],

  // Enable experimental features
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },

  // Rewrites for Decap CMS admin (serve static files correctly)
  async rewrites() {
    return {
      beforeFiles: [
        {
          // Serve index.html for /admin
          source: '/admin',
          destination: '/admin/index.html',
        },
        {
          // Serve index.html for /admin/
          source: '/admin/',
          destination: '/admin/index.html',
        },
      ],
    };
  },
};

module.exports = nextConfig;
