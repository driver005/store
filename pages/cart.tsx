import { Wrapper } from "@components/index"
import { Main } from "@section/cart"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Cart: NextPageWithLayout = () => {
    return (
        <>
            {/* <Head title="Shopping Bag" description="View your shopping bag" /> */}
            <Main />
        </>
    )
}

Cart.getLayout = (page: ReactElement) => {
    return <Wrapper bgColor='gray.50'>{page}</Wrapper>
}

export default Cart
