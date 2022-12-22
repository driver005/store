import { Box, chakra, Flex, Grid, Heading } from '@chakra-ui/react'
import {
    useFeaturedProductsQuery,
    useNavigationCollections,
} from '@lib/hooks/use-layout-data'
import repeat from '@lib/util/repeat'
import { chunk } from 'lodash'
import Link from 'next/link'
import React, { useState } from 'react'
import { Card } from '@section/store'
import { LinkMetis } from '@components/Links'

const CollectionDropdown = () => {
    const { data: collections, isLoading: loadingCollections } =
        useNavigationCollections()
    const { data: products, isLoading: loadingProducts } =
        useFeaturedProductsQuery()

    return (
        <Box position="relative" background="white" py="8">
            <Flex alignItems="start" px="20">
                <Flex flexDirection="column" flex="1 1 0%" maxW="30%">
                    <Heading
                        as="h3"
                        fontSize="medium"
                        fontWeight="semibold"
                        color="gray.900"
                        mb="4"
                    >
                        Collections
                    </Heading>
                    <Flex alignItems="start">
                        {collections &&
                            chunk(collections, 6).map((chunk, index) => {
                                return (
                                    <chakra.ul
                                        key={index}
                                        minW="152px"
                                        maxW="200px"
                                        pr="4"
                                    >
                                        {chunk.map((collection) => {
                                            return (
                                                <Box key={collection.id} pb="3">
                                                    <LinkMetis
                                                        label={collection.title}
                                                        link={`/collections/${collection.id}`}
                                                        size={12}
                                                    />
                                                </Box>
                                            )
                                        })}
                                    </chakra.ul>
                                )
                            })}
                        {loadingCollections &&
                            repeat(6).map((index) => (
                                <Box
                                    key={index}
                                    className="animate-pulse"
                                    w="12"
                                    h="4"
                                    background="gray.100"
                                />
                            ))}
                    </Flex>
                </Flex>
                <Box flex="1 1 0%">
                    <Grid
                        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                        gap="4"
                    >
                        {products?.slice(0, 3).map((product) => (
                            <Card
                                {...product}
                                key={product.id}
                                shadow={false}
                            />
                        ))}
                        {/* {loadingProducts &&
                                repeat(3).map((index) => (
                                    <SkeletonProductPreview key={index} />
                                ))} */}
                    </Grid>
                </Box>
            </Flex>
        </Box>
    )
}

export default CollectionDropdown
