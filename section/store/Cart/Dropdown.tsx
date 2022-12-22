import {
    Box,
    Button,
    chakra,
    Flex,
    Grid,
    Icon,
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    VisuallyHidden,
} from '@chakra-ui/react'
import { useCartDropdown } from '@lib/context/cart-dropdown-context'
import { useStore } from '@lib/context/store-context'
import useEnrichedLineItems from '@lib/hooks/use-enrich-line-items'
import { Thumbnail } from '@section/product'
import { LineItemOptions, LineItemPrice } from '@section/store'
import { formatAmount, useCart } from 'medusa-react'
import Link from 'next/link'
import { CalculatedVariant } from 'types/medusa'
import { CgTrash } from 'react-icons/cg'
import { ButtonBestia } from '@components/Buttons'

const CartDropdown = () => {
    const { cart, totalItems } = useCart()
    const items = useEnrichedLineItems()
    const { deleteItem } = useStore()
    const { state, open, close } = useCartDropdown()

    return (
        <Box h="full" zIndex="50" onMouseEnter={open} onMouseLeave={close}>
            <Popover>
                <Link href="/cart" passHref>
                    <PopoverTrigger>
                        <Button
                            h="full"
                            fontSize="small"
                            fontWeight="normal"
                            variant="ghost"
                            _hover={{
                                background: 'transparent',
                            }}
                            _active={{
                                background: 'transparent',
                            }}
                        >
                            {`My Bag (${totalItems})`}
                        </Button>
                    </PopoverTrigger>
                </Link>
                <PopoverContent minW="xs" w="none">
                    <Flex alignItems="center" justifyContent="center" p="4">
                        <Text as="h3" fontSize="medium" fontWeight="semibold">
                            Shopping Bag
                        </Text>
                    </Flex>
                    {cart && items?.length ? (
                        <>
                            <Grid
                                overflowY="auto"
                                maxH="402px"
                                px="4"
                                gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                                rowGap="8"
                            >
                                {items
                                    .sort((a, b) => {
                                        return a.created_at > b.created_at
                                            ? -1
                                            : 1
                                    })
                                    .map((item) => (
                                        <Grid
                                            gridTemplateColumns="122px 1fr"
                                            columnGap="4"
                                            key={item.id}
                                        >
                                            <Box w="122px">
                                                <Thumbnail
                                                    thumbnail={item.thumbnail}
                                                    size="full"
                                                />
                                            </Box>
                                            <Flex
                                                flexDirection="column"
                                                justifyContent="space-between"
                                                flex="1 1 0%"
                                            >
                                                <Flex
                                                    flexDirection="column"
                                                    flex="1 1 0%"
                                                >
                                                    <Flex
                                                        alignItems="start"
                                                        justifyContent="space-between"
                                                    >
                                                        <Box>
                                                            <Text
                                                                as="h3"
                                                                textOverflow="ellipsis"
                                                                overflow="hidden"
                                                                whiteSpace="nowrap"
                                                                mr="4"
                                                                w="130px"
                                                                fontSize="medium"
                                                            >
                                                                <Link
                                                                    href={`/product/${item.variant.product.handle}`}
                                                                >
                                                                    <a>
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </a>
                                                                </Link>
                                                            </Text>
                                                            <LineItemOptions
                                                                variant={
                                                                    item.variant
                                                                }
                                                            />
                                                            <span>
                                                                Quantity:{' '}
                                                                {item.quantity}
                                                            </span>
                                                        </Box>
                                                        <Flex justifyContent="end">
                                                            <LineItemPrice
                                                                region={
                                                                    cart.region
                                                                }
                                                                variant={
                                                                    item.variant as CalculatedVariant
                                                                }
                                                                quantity={
                                                                    item.quantity
                                                                }
                                                                style="tight"
                                                            />
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                                <Flex
                                                    alignItems="end"
                                                    justifyContent="space-between"
                                                    fontSize="small"
                                                    flex="1 1 0%"
                                                >
                                                    <Box>
                                                        <Button
                                                            leftIcon={
                                                                <Icon
                                                                    as={CgTrash}
                                                                    size={14}
                                                                />
                                                            }
                                                            _hover={{
                                                                background:
                                                                    'transparent',
                                                            }}
                                                            _active={{
                                                                background:
                                                                    'transparent',
                                                            }}
                                                            variant="ghost"
                                                            fontSize="small"
                                                            p="0"
                                                            paddingInline="0"
                                                            height="none"
                                                            onClick={() =>
                                                                deleteItem(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            <span>Remove</span>
                                                        </Button>
                                                    </Box>
                                                </Flex>
                                            </Flex>
                                        </Grid>
                                    ))}
                            </Grid>
                            <Flex
                                flexDirection="column"
                                rowGap="4"
                                fontSize="small"
                                m="4"
                            >
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <chakra.span
                                        color="gray.700"
                                        fontWeight="semibold"
                                    >
                                        Subtotal{' '}
                                        <chakra.span fontWeight="400">
                                            (incl. taxes)
                                        </chakra.span>
                                    </chakra.span>
                                    <chakra.span fontWeight="600" fontSize="md">
                                        {formatAmount({
                                            amount: cart.subtotal || 0,
                                            region: cart.region,
                                            includeTaxes: false,
                                        })}
                                    </chakra.span>
                                </Flex>
                                <Link href="/cart" passHref>
                                    <a>
                                        <ButtonBestia
                                            label="Go to bag"
                                            height={10}
                                        />
                                    </a>
                                </Link>
                            </Flex>
                        </>
                    ) : (
                        <Box>
                            <Flex
                                flexDirection="column"
                                py="16"
                                rowGap="4"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Flex
                                    bgColor="gray.900"
                                    fontSize="small"
                                    alignItems="center"
                                    justifyContent="center"
                                    w="8"
                                    h="8"
                                    borderRadius="full"
                                    color="white"
                                >
                                    <span>0</span>
                                </Flex>
                                <span>Your shopping bag is empty.</span>
                                <div>
                                    <Link href="/">
                                        <a>
                                            <VisuallyHidden>
                                                Go to all products page
                                            </VisuallyHidden>
                                            <Button onClick={close}>
                                                Explore products
                                            </Button>
                                        </a>
                                    </Link>
                                </div>
                            </Flex>
                        </Box>
                    )}
                </PopoverContent>
            </Popover>
        </Box>
    )
}

export default CartDropdown
