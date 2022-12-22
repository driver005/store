import { Box, Flex, Grid, useBreakpointValue } from '@chakra-ui/react'
import useEnrichedLineItems from '@lib/hooks/use-enrich-line-items'
import { useCart, useMeCustomer } from 'medusa-react'
import { Items, Summary } from '@section/cart'
import { SkeletonCartPage } from '@section/skeletons'

const Main = () => {
    const column = useBreakpointValue({
        base: 'repeat(1, minmax(0, 1fr))',
        sm: '1fr 360px',
    })

    const { cart } = useCart()
    const { customer, isLoading } = useMeCustomer()
    const items = useEnrichedLineItems()

    if (!cart || !cart?.id?.length || isLoading) {
        return <SkeletonCartPage />
    }

    return (
        <Box py="12">
            <Box mx="12">
                {cart.items.length ? (
                    <Grid gridTemplateColumns={column} columnGap="8">
                        <Flex
                            flexDirection="column"
                            bgColor="white"
                            p="6"
                            rowGap="6"
                            borderRadius="md"
                        >
                            {/* {!customer && <SignInPrompt />} */}
                            <Items region={cart?.region} items={items} />
                        </Flex>
                        <Box position="relative">
                            <Flex
                                flexDirection="column"
                                rowGap="8"
                                position="sticky"
                                top="12"
                            >
                                {cart && cart.region && (
                                    <>
                                        <Box
                                            bgColor="white"
                                            p="6"
                                            borderRadius="md"
                                        >
                                            <Summary cart={cart} />
                                        </Box>
                                        {/* <div className="bg-white p-6">
                                            <DiscountCode cart={cart} />
                                        </div> */}
                                    </>
                                )}
                            </Flex>
                        </Box>
                    </Grid>
                ) : (
                    <div>
                        {/* {!customer && <SignInPrompt />} */}
                        {/* <EmptyCartMessage /> */}
                    </div>
                )}
            </Box>
        </Box>
    )
}

export default Main
