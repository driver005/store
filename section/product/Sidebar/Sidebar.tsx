import { FC, useEffect, useState } from 'react'
import { ProductDescription, ProductSize, ProductInfo, ProductTag, ProductReview, Stars, Comments } from '@section/product'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Box, Button, Flex } from '@chakra-ui/react'
import { ButtonPay } from '@components/index'


interface ProductSidebarProps {
    product: any
    color?: string
    variantId: string;
    quickview?: boolean;
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, variantId, color = 'purple', quickview = false }) => {
    const router = useRouter();
    //const addItem = useAddItem()
    //const { openSidebar } = useUI()
    // setLoadingAddToCheckout(false);
    const [open, setOpen] = useState(true)

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        control,
        getValues,
        watch
    } = useForm()

    return (
        <Flex
            w='full'
            h='full'
            maxW='80rem'
            flexDirection='column'
            px='6'
            py='6'
            gridColumn='span 4 / span 4'
        >
            <ProductTag
                name={product.name}
                price={`${product.price}`}
                color={color}
                quickview={quickview}
            />
            <Box mb='10'>
                <Stars
                    stars={5}
                    rating={3.5}
                    label={"1600"}
                    size={6}
                />
            </Box>
            <ProductInfo product={product} />
            <ProductSize
                product={product.variants}
                control={control}
            />
            <Box mb='10'>
                <ButtonPay label='Pay' className='shadow-xl shadow-gray-400/50' />
            </Box>

            <ProductReview
                product={product}
                setOpen={setOpen}
            />
            <Comments
                open={open}
                setOpen={setOpen}
            />

            <div className="mt-6">
                <ProductDescription
                    description={product.description}
                    title={"Details"}
                />
            </div>

        </Flex>
    )
}

export default ProductSidebar
