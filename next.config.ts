import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // ignore eslint error in build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
        protocol: 'https'
      },
      //googleimage
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https'
      },
    ]
  }
};

export default nextConfig;
