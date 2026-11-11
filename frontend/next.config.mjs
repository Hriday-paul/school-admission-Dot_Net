/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // allow all hosts over https
            },
            {
                protocol: 'http',
                hostname: '**', // allow all hosts over http
            },
        ],
    }
};

export default nextConfig;
