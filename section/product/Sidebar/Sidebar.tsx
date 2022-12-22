import { FC, useEffect, useMemo, useState } from 'react'
import {
    ProductDescription,
    ProductOption,
    ProductInfo,
    ProductTag,
    ProductReview,
    Stars,
    Comments,
} from '@section/product'
import { useForm } from 'react-hook-form'
import { Box, Button, Flex } from '@chakra-ui/react'
import { ButtonPay } from '@components/index'
import { useProductActions } from '@lib/context/product-context'
import useProductPrice from '@lib/hooks/use-product-price'

interface ProductSidebarProps {
    product: any
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product }) => {
    const [open, setOpen] = useState(true)
    const { updateOptions, addToCart, options, inStock, variant } =
        useProductActions()

    const price = useProductPrice({ id: product.id, variantId: variant?.id })

    const selectedPrice = useMemo(() => {
        const { variantPrice, cheapestPrice } = price

        return variantPrice || cheapestPrice || null
    }, [price])

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        control,
        getValues,
        watch,
    } = useForm()

    return (
        <Flex
            w="full"
            h="full"
            maxW="80rem"
            flexDirection="column"
            px="6"
            pb="6"
            gridColumn="span 4 / span 4"
        >
            <ProductTag
                name={product.title}
                description={product.description}
                price={selectedPrice}
                collection={product.collection}
            />
            <Box mb="8">
                {product.variants.length > 1 &&
                    product.options.map((option: any) => (
                        <ProductOption
                            key={option.id}
                            control={control}
                            option={option}
                            updateOption={updateOptions}
                            current={options[option.id]}
                            title={option.title}
                        />
                    ))}
            </Box>

            <Box mb="10">
                <ButtonPay
                    label={!inStock ? 'Out of stock' : 'Add to cart'}
                    className="shadow-xl shadow-gray-400/50"
                    onClick={addToCart}
                />
            </Box>
            <ProductInfo thirdsPartyStore={true} />

            <ProductDescription product={product} title={'Details'} />

            {/* <Box mb='10'>
                <Stars
                    stars={5}
                    rating={3.5}
                    label={"1600"}
                    size={6}
                />
            </Box> */}

            {/* <ProductReview
                product={product}
                setOpen={setOpen}
            />
            <Comments
                open={open}
                setOpen={setOpen}
            /> */}
        </Flex>
    )
}

export default ProductSidebar
