import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile 3D libraries for SSR compatibility
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/rapier', 'meshline'],

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
  },

  // Enable compression
  compress: true,

  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header

  // Optimize output
  output: 'standalone', // Better for deployment

  // Experimental optimizations
  experimental: {
    optimizeCss: true, // Minify CSS
  },
};

export default nextConfig;
