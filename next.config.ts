import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
