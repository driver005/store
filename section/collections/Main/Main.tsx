import { Text, chakra, useBreakpointValue, Box, Flex } from '@chakra-ui/react'
import { SkeletonProductPreview } from '@components/Skeleton'
import usePreviews from '@lib/hooks/use-previews'
import getNumberOfSkeletons from '@lib/util/get-number-of-skeletons'
import repeat from '@lib/util/repeat'
// import ProductPreview from "@modules/products/components/product-preview"
// import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { fetchCollectionProducts } from '@pages/collections/[id]'
import { Card } from '@section/store'
import { useCart } from 'medusa-react'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'

type MainProps = {
    collection: {
        id: string
        title: string
    }
}

const Main: React.FC<MainProps> = ({ collection }) => {
    const column = useBreakpointValue({
        base: 'repeat(2, minmax(0, 1fr))',
        sm: 'repeat(3, minmax(0, 1fr))',
        md: 'repeat(4, minmax(0, 1fr))',
    })
    const { cart } = useCart()
    const { ref, inView } = useInView()

    const {
        data: infiniteData,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery(
        [`get_collection_products`, collection.id, cart?.id],
        ({ pageParam }) =>
            fetchCollectionProducts({
                pageParam,
                id: collection.id,
                cartId: cart?.id,
            }),
        {
            getNextPageParam: (lastPage) => lastPage.nextPage,
        }
    )

    const previews = usePreviews({
        pages: infiniteData?.pages,
        region: cart?.region,
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, hasNextPage])

    return (
        <Box mx="12" py="6">
            <Flex w="full">
                <Text pl="2" mb="8" fontSize="4xl" fontWeight="semibold">
                    <h1>{collection.title}</h1>
                </Text>
            </Flex>
            <chakra.ul
                display="grid"
                gridTemplateColumns={column}
                columnGap="4"
                rowGap="8"
            >
                {previews.map((p) => (
                    <li key={p.id}>
                        <Card {...p} />
                    </li>
                ))}
                {isLoading &&
                    !previews.length &&
                    repeat(8).map((index) => (
                        <li key={index}>
                            <SkeletonProductPreview />
                        </li>
                    ))}
                {isFetchingNextPage &&
                    repeat(getNumberOfSkeletons(infiniteData?.pages)).map(
                        (index) => (
                            <li key={index}>
                                <SkeletonProductPreview />
                            </li>
                        )
                    )}
            </chakra.ul>
            <Flex
                py="16"
                justifyContent="center"
                alignItems="center"
                fontSize="400"
                color="gray.700"
                ref={ref}
            >
                <span ref={ref}></span>
            </Flex>
        </Box>
    )
}

export default Main
