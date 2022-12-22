import { Box, HStack, VStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Item } from './index'

interface CategoryColumnProps {}

export const CategoryColumn: FC<CategoryColumnProps> = () => {
    return (
        <Box p="12">
            <HStack spacing={10} alignItems="stretch" h="640px">
                <Item
                    src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
                    alt="Product image"
                    label="All"
                    text="Dress that feels a little fany for when pajamas aren`t cutting it"
                />
                <VStack maxW="400px" h="full" spacing={10}>
                    <Item
                        src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
                        alt="Product image"
                        label="All"
                        text="Dress that feels a little fany for when pajamas aren`t cutting it"
                    />
                    <Item
                        src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
                        alt="Product image"
                        label="All"
                        text="Dress that feels a little fany for when pajamas aren`t cutting it"
                    />
                </VStack>
            </HStack>
        </Box>
    )
}
