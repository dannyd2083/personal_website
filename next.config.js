/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['@xenova/transformers', 'sharp'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
}

module.exports = nextConfig
