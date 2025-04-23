import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 'i.ytimg.com',
      },
      {
        hostname: 'zkmpkeilkhigsc2f.public.blob.vercel-storage.com',
      },
      {
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
