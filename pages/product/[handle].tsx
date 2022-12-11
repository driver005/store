import { Box } from "@chakra-ui/react"
import { Wrapper } from "@components/index"
import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import { getProductHandles } from "@lib/util/get-product-handles"
import { ProductView } from "@section/product"
import { SkeletonProductPage } from "@section/skeletons"
import { Heading, Nav } from "@section/store"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { ReactElement } from "react"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { NextPageWithLayout, PrefetchedPageProps } from "types/global"

interface Params extends ParsedUrlQuery {
    handle: string
}

const fetchProduct = async (handle: string) => {
    return await medusaClient.products
        .list({ handle })
        .then(({ products }) => products[0])
}

const ProductPage: NextPageWithLayout<PrefetchedPageProps> = ({ notFound }) => {
    const { query, isFallback, replace } = useRouter()
    const handle = typeof query.handle === "string" ? query.handle : ""

    const { data, isError, isLoading, isSuccess } = useQuery(
        [`get_product`, handle],
        () => fetchProduct(handle),
        {
            enabled: handle.length > 0,
            keepPreviousData: true,
        }
    )

    if (notFound) {
        if (IS_BROWSER) {
            replace("/404")
        }
        return <SkeletonProductPage />
    }

    if (isFallback || isLoading || !data) {
        return <SkeletonProductPage />
    }

    if (isError) {
        replace("/404")
    }

    // if (isSuccess) {
    //     return (
    //         <>
    //             <Head
    //                 description={data.description}
    //                 title={data.title}
    //                 image={data.thumbnail}
    //             />
    //             <ProductTemplate product={data} />
    //         </>
    //     )
    // }

    if (isSuccess) {
        return (
            <ProductView product={data} />
        )
    }

    return <></>
}

ProductPage.getLayout = (page: ReactElement) => {
    return <Box>
        <Nav />
        {page}
    </Box>
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const handles = await getProductHandles()
    return {
        paths: handles.map((handle) => ({ params: { handle } })),
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const handle = context.params?.handle as string

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery([`get_product`, handle], () =>
        fetchProduct(handle)
    )

    const queryData = await queryClient.getQueryData([`get_product`, handle])

    if (!queryData) {
        return {
            props: {
                notFound: true,
            },
        }
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            notFound: false,
        },
    }
}

export default ProductPage

// const Search: NextPage = () => {
//     return (
//         <Wrapper>
//             <Heading
//                 margin={24}
//             />
//             <ProductView product={product} />
//         </Wrapper>
//     )
// }

// export default Search