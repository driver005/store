import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FC } from 'react'
import { ProductSlider, ProductCard, ProductSidebar } from '@section/product'
import { useRouter } from 'next/router'
import { Box, Flex, SimpleGrid, useBreakpointValue } from '@chakra-ui/react'

interface ProductViewProps {
    product: any
    productData?: any
    relatedProducts?: any[]
    quickview?: boolean
}

const reviews = { href: '#', average: 4, totalCount: 117 }

const productinfo = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

const ProductView: FC<ProductViewProps> = ({ product, productData, relatedProducts, quickview = false }) => {
    const router = useRouter();

    // if (!product?.id) {
    //     return <Custom404 />;
    // }

    // We have to check if code is run on the browser
    // before we can use the router
    const queryVariant = process.browser
        ? router.query.variant?.toString()
        : undefined;
    const selectedVariantID = queryVariant || product?.variants![0]!.id!;

    // setSelectedVariant({product?.variants?.find(
    //   (v) => v?.id === selectedVariantID
    // )})

    const color = 'purple';
    const imageW = useBreakpointValue({ lg: '800px' });
    return (
        <>
            <Box w='full' maxW='none'>
                <SimpleGrid spacing='0.5' gridTemplateColumns='repeat(12, minmax(0, 1fr))'>
                    <Flex flexDirection='column' gridColumn='span 8 / span 8' minH='500px'>
                        {product.media && !quickview && (
                            <Flex alignItems='center' justifyContent='center' overflowX='hidden'>
                                <ProductSlider key={product.id}>
                                    {product.media.map((image: any, i: any) => (
                                        <Box key={i} maxH={imageW}>
                                            <Image
                                                src={image.url || 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg'}
                                                alt={image.alt || 'Product Image'}
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
                        {quickview && product.media && (
                            <Image src={product.media[0].url || ""} alt={product.media[0].alt || ""} width={600} height={600} quality="100" />
                        )}
                        {/* {product.variants && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )} */}
                    </Flex>

                    <ProductSidebar key={product.id} product={product} variantId={selectedVariantID} color={color} quickview={quickview} />
                </SimpleGrid>
                {/* <hr className="mt-7 border-accent-2" /> */}
                {/* <section className="py-12 px-6 mb-10">
          <Text variant="sectionHeading">Related Products</Text>
          <div className={s.relatedProductsGrid}>
            {relatedProducts.map((p) => (
              <div
                key={p.path}
                className="animated fadeIn bg-accent-0 border border-accent-2"
              >
                <ProductCard
                  noNameTag
                  product={p}
                  key={p.path}
                  variant="simple"
                  className="animated fadeIn"
                  imgProps={{
                    width: 300,
                    height: 300,
                  }}
                />
              </div>
            ))}
          </div>
        </section> */}
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
        </>
    )
}

export default ProductView
