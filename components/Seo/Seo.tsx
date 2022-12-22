import { NextSeo } from 'next-seo'

interface SeoProps {
    title?: string
    description?: string
}

const Seo: React.FC<SeoProps> = ({ title, description }) => {
    const Title = `Saleor Tutorial`
    const Description =
        'Saleor tutorial project. Learn how to use our API and create storefront for your shop'

    const seoTitle = title || Title
    const seoDescription = description || Description

    return (
        <NextSeo
            title={seoTitle}
            description={seoDescription}
            openGraph={{
                title: seoTitle,
                description: seoDescription,
                images: [
                    {
                        url: 'https://og-image.vercel.app/Tutorial%20Storefront.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg&images=https%3A%2F%2Fsaleor.io%2Fstatic%2Flogo-ad1b99aa7c6f5acf58a61640af760cfd.svg',
                        alt: 'Saleor tutorial hero image',
                    },
                ],
                site_name: 'Saleor Tutorial',
            }}
        />
    )
}

export default Seo
