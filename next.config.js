/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Enable compression
  compress: true,

  // Remove X-Powered-By: Next.js header for security
  poweredByHeader: false,

  // Ensure canonical URLs without trailing slash
  trailingSlash: false,

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
    // Quality presets used in the app
    qualities: [75, 80, 85],
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

  // Security and SEO headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      // Ensure /admin always has trailing slash for Decap CMS
      {
        source: '/admin',
        destination: '/admin/',
        permanent: true,
      },
      // www → non-www redirect is handled by Vercel via domain settings,
      // but documented here for reference:
      // { source: '/(.*)', has: [{ type: 'host', value: 'www.deboragrataroli.it' }],
      //   destination: 'https://deboragrataroli.it/:path*', permanent: true }
    ];
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
