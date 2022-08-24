import { Box, Grid, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import { Heading, Item } from "./index";


interface CategoryGridProps {
}

export const CategoryGrid: FC<CategoryGridProps> = () => {
    return (
        <Box
            p='12'
        >
            <VStack
                spacing={8}
            >
                <Heading />
                <Grid
                    w='full'
                    templateColumns='repeat(4, minmax(0px, 1fr))'
                    gap={8}
                >
                    <Item
                        src='https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg'
                        alt='Furniture product'
                        label='Furniture'
                    />
                    <Item
                        src='https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg'
                        alt='Furniture product'
                        label='Furniture'
                    />
                    <Item
                        src='https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg'
                        alt='Furniture product'
                        label='Furniture'
                    />
                    <Item
                        src='https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg'
                        alt='Furniture product'
                        label='Furniture'
                    />
                    <Item
                        src='https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg'
                        alt='Furniture product'
                        label='Furniture'
                    />
                    <Item
                        src='https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg'
                        alt='Furniture product'
                        label='Furniture'
                    />
                    <Item
                        src='https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg'
                        alt='Furniture product'
                        label='Furniture'
                    />
                    <Item
                        src='https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg'
                        alt='Furniture product'
                        label='Furniture'
                    />
                </Grid>
            </VStack>
        </Box>
    )
}