/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/content',
                permanent: true,
            },
            {
                source: '/management',
                destination: '/management/product-category',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
