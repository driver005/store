/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["vercel.saleor.cloud", "tailwindui.com", "demo.vercel.store", "tympanus.net"],
    },
    i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US'
    },
}

module.exports = nextConfig
