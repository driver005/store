import { NextSeo } from 'next-seo'
import { FC, useRef } from 'react'
import { ImageGallery, ProductSidebar, RelatedProducts } from '@section/product'
import { Box, Flex, SimpleGrid, useBreakpointValue } from '@chakra-ui/react'
import { ProductProvider } from '@lib/context/product-context'
import { useIntersection } from '@lib/hooks/use-in-view'

interface ProductViewProps {
    product: any
    productData?: any
    relatedProducts?: any[]
    quickview?: boolean
}

const ProductView: FC<ProductViewProps> = ({ product, productData, relatedProducts, quickview = false }) => {
    const info = useRef<HTMLDivElement>(null)
    const inView = useIntersection(info, "0px")
    const marginY = useBreakpointValue({ base: '16', lg: '32' });
    const paddingX = useBreakpointValue({ base: '6', lg: '8' });
    return (
        <ProductProvider product={product}>
            <Box w='full' maxW='none'>
                <SimpleGrid spacing='0.5' gridTemplateColumns='repeat(12, minmax(0, 1fr))'>
                    <ImageGallery
                        product={product}
                    />
                    <ProductSidebar
                        product={product}
                    />
                </SimpleGrid>
            </Box>
            <Box ref={info} my={marginY} px={paddingX} width='full'>
                <RelatedProducts product={product} />
            </Box>
            <NextSeo
                title={product.name}
                description={product.description}
                openGraph={{
                    type: 'website',
                    title: product.name,
                    description: product.description,
                    images: [
                        {
                            url: product.thumbnail?.url!,
                            width: 800,
                            height: 600,
                            alt: product.name,
                        },
                    ],
                }}
            />
        </ProductProvider>
    )
}

export default ProductView
