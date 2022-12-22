import { Box, Flex } from '@chakra-ui/react'
import { Cart } from '@medusajs/medusa'
import { formatAmount } from 'medusa-react'
import React from 'react'

type CartTotalsProps = {
    cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>
}

const CartTotals: React.FC<CartTotalsProps> = ({ cart }) => {
    const {
        subtotal,
        discount_total,
        gift_card_total,
        tax_total,
        shipping_total,
        total,
    } = cart

    const getAmount = (amount: number | null | undefined) => {
        return formatAmount({
            amount: amount || 0,
            region: cart.region,
            includeTaxes: false,
        })
    }

    return (
        <Box>
            <Box fontWeight="400" fontSize="small">
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    fontWeight="400"
                    fontSize="md"
                    color="gray.900"
                    mb="2"
                >
                    <span>Subtotal</span>
                    <span>{getAmount(subtotal)}</span>
                </Flex>
                <Flex flexDirection="column" rowGap="1">
                    {!!discount_total && (
                        <Flex
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <span>Discount</span>
                            <span>- {getAmount(discount_total)}</span>
                        </Flex>
                    )}
                    {!!gift_card_total && (
                        <Flex
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <span>Gift card</span>
                            <span>- {getAmount(gift_card_total)}</span>
                        </Flex>
                    )}
                    <Flex alignItems="center" justifyContent="space-between">
                        <span>Shipping</span>
                        <span>{getAmount(shipping_total)}</span>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                        <span>Taxes</span>
                        <span>{getAmount(tax_total)}</span>
                    </Flex>
                </Flex>
                <Box
                    h="1px"
                    w="full"
                    borderBottomWidth="1px"
                    borderColor="gray.200"
                    borderStyle="dashed"
                    my="4"
                />
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    fontWeight="400"
                    color="gray.900"
                    fontSize="md"
                    mb="2"
                >
                    <span>Total</span>
                    <span>{getAmount(total)}</span>
                </Flex>
            </Box>
        </Box>
    )
}

export default CartTotals
