import { chakra, Text, useBreakpointValue } from '@chakra-ui/react'
import { ButtonBestia } from '@components/Buttons'
import { SkeletonProductPreview } from '@components/Skeleton'
import { fetchProductsList } from '@lib/data'
import usePreviews from '@lib/hooks/use-previews'
import getNumberOfSkeletons from '@lib/util/get-number-of-skeletons'
import repeat from '@lib/util/repeat'
import { Product, StoreGetProductsParams } from '@medusajs/medusa'
import { Card } from '@section/store'
import { useCart } from 'medusa-react'
import { useMemo } from 'react'
import { useInfiniteQuery } from 'react-query'

type RelatedProductsProps = {
    product: Product
}

const RelatedProducts = ({ product }: RelatedProductsProps) => {
    const column = useBreakpointValue({
        base: 'repeat(2, minmax(0, 1fr));',
        sm: 'repeat(3, minmax(0, 1fr));',
        md: 'repeat(4, minmax(0, 1fr));',
    })

    const { cart } = useCart()

    const queryParams: StoreGetProductsParams = useMemo(() => {
        const params: StoreGetProductsParams = {}

        if (cart?.id) {
            params.cart_id = cart.id
        }

        if (product.collection_id) {
            params.collection_id = [product.collection_id]
        }

        if (product.type) {
            //@ts-ignore
            params.type = product.type.id
        }

        if (product.tags) {
            params.tags = product.tags.map((t) => t.value)
        }

        params.is_giftcard = false

        return params
    }, [product, cart?.id])

    const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
        useInfiniteQuery(
            [`infinite-products-${product.id}`, queryParams, cart],
            ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
            {
                getNextPageParam: (lastPage) => lastPage.nextPage,
            }
        )

    const previews = usePreviews({ pages: data?.pages, region: cart?.region })

    return (
        <div>
            <div className="flex flex-col items-center text-center mb-16">
                <Text as="span" color="green.600" mb="6">
                    Related products
                </Text>
                <Text maxW="lg" fontSize="3xl">
                    You might also want to check out these products.
                </Text>
            </div>
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
                    repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
                        <li key={index}>
                            <SkeletonProductPreview />
                        </li>
                    ))}
            </chakra.ul>
            {hasNextPage && (
                <div className="flex items-center justify-center mt-8">
                    <ButtonBestia
                        loaded={isLoading}
                        onClick={() => fetchNextPage()}
                        className="w-72"
                        label="Load more"
                    />
                </div>
            )}
        </div>
    )
}

export default RelatedProducts
