module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_IMAGES_HOSTNAME,
            },
        ],
    },
}
