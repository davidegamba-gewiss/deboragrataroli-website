/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Enable compression
  compress: true,

  // Image optimization configuration
  images: {
    // Allow remote images from any HTTPS source
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Modern formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Responsive image sizes for different devices
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Sizes for smaller images (thumbnails, icons)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 1 year
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // Allow SVG images with security policy
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
