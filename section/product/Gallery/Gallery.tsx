import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import { FC } from 'react'
import { ProductSlider } from '@section/product'
import Image from 'next/image'
import { Product } from '@medusajs/medusa'

interface ImageGalleryProps {
    product: Product
}

const ImageGallery: FC<ImageGalleryProps> = ({ product }) => {
    const imageW = useBreakpointValue({ lg: '800px' })
    return (
        <Flex flexDirection="column" gridColumn="span 8 / span 8" minH="500px">
            {product?.images && (
                <Flex
                    position="sticky"
                    top="0"
                    alignItems="center"
                    justifyContent="center"
                    overflowX="hidden"
                >
                    <ProductSlider key={product.id}>
                        {product.images.map((image: any, i: any) => (
                            <Box key={i} maxH={imageW}>
                                <Image
                                    src={image.url}
                                    alt={image.alt}
                                    width={600}
                                    height={800}
                                    priority={i === 0}
                                    quality="85"
                                />
                            </Box>
                        ))}
                    </ProductSlider>
                </Flex>
            )}
        </Flex>
    )
}

export default ImageGallery
