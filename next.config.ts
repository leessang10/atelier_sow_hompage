import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    NOTION_API_KEY: process.env.NOTION_API_KEY!,
    NOTION_PROJECT_DATABASE_ID: process.env.NOTION_PROJECT_DATABASE_ID!,
    NOTION_PRESS_DATABASE_ID: process.env.NOTION_PRESS_DATABASE_ID!,
    NOTION_CONTACT_DATABASE_ID: process.env.NOTION_CONTACT_DATABASE_ID!,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN!,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY!,
    SMTP_USER: process.env.SMTP_USER!,
    SMTP_PASS: process.env.SMTP_PASS!,
  },
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
