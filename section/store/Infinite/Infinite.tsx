import { fetchProductsList } from "@lib/data"
import usePreviews from "@lib/hooks/use-previews"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import { StoreGetProductsParams } from "@medusajs/medusa"
import { useCart } from "medusa-react"
import { useEffect, useMemo } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "react-query"
import { Card } from "@section/store"
import { useBreakpointValue, chakra, Box, Flex } from "@chakra-ui/react"
import { SkeletonProductPreview } from "@components/Skeleton"

type InfiniteProductsType = {
    params: StoreGetProductsParams
}

const InfiniteProducts = ({ params }: InfiniteProductsType) => {
    const column = useBreakpointValue({
        base: 'repeat(2, minmax(0, 1fr))',
        sm: 'repeat(3, minmax(0, 1fr))',
        md: 'repeat(4, minmax(0, 1fr))'
    })

    const { cart } = useCart()

    const { ref, inView } = useInView()

    const queryParams = useMemo(() => {
        const p: StoreGetProductsParams = {}

        if (cart?.id) {
            p.cart_id = cart.id
        }

        p.is_giftcard = false

        return {
            ...p,
            ...params,
        }
    }, [cart?.id, params])

    const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
        useInfiniteQuery(
            [`infinite-products-store`, queryParams, cart],
            ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
            {
                getNextPageParam: (lastPage) => lastPage.nextPage,
            }
        )

    const previews = usePreviews({ pages: data?.pages, region: cart?.region })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, hasNextPage])

    return (
        <Box flex='1 1 0%' mx='12' className="flex-1 content-container">
            <chakra.ul
                display='grid'
                gridTemplateColumns={column}
                columnGap='4'
                rowGap='8'
                flex='1 1 0%'
            >
                {previews.map((p) => (
                    <li key={p.id}>
                        <Card {...p} shadow={false} />
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
                    repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
                        <li key={index}>
                            <SkeletonProductPreview />
                        </li>
                    ))}
            </chakra.ul>
            <Flex
                py='16'
                justifyContent='center'
                alignItems='center'
                fontSize='400'
                color='gray.700'
                ref={ref}
            >
                <span ref={ref}></span>
            </Flex>
        </Box>
    )
}

export default InfiniteProducts
