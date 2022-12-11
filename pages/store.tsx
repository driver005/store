import { Box, Flex, useBreakpointValue } from "@chakra-ui/react"
import { Wrapper } from "@components/index"
import { StoreGetProductsParams } from "@medusajs/medusa"
import { List } from "@section/all"
import { InfiniteProducts } from "@section/store"
import { useState } from "react"
import { NextPageWithLayout } from "types/global"

const Store: NextPageWithLayout = () => {
    const [params, setParams] = useState<StoreGetProductsParams>({})

    const direction = useBreakpointValue({
        base: 'column',
        sm: 'row',
    })

    const item = useBreakpointValue({
        sm: 'start',
    })

    return (
        <>
            {/* <Head title="Store" description="Explore all of our products." /> */}
            <Flex
                flexDirection={direction}
                py='6'
                alignItems={item}
            >
                <List refinementList={params} setRefinementList={setParams} />
                <InfiniteProducts params={params} />
            </Flex>
        </>
    )
}

Store.getLayout = (page) => <Wrapper>{page}</Wrapper>

export default Store
