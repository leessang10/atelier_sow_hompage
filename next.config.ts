import {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'i.ytimg.com'
            },
            {
                hostname: 'zkmpkeilkhigsc2f.public.blob.vercel-storage.com'
            },
            {
                hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com'
            }
        ]
    }
}

module.exports = nextConfig 