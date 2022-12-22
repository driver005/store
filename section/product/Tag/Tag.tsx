import { Box, Heading, HStack, chakra, Stack, Text } from '@chakra-ui/react'
import { LinkHelike } from '@components/index'
import Link from 'next/link'

interface ProductTagProps {
    className?: string
    color?: string
    name: string
    description: string
    price?: any
    collection: any
    fontSize?: number
}

const ProductTag: React.FC<ProductTagProps> = ({
    name,
    price,
    description,
    collection,
}) => {
    return (
        <Box mb="10">
            {collection && (
                <Link href={`/collections/${collection.id}`}>
                    <chakra.a
                        cursor="pointer"
                        fontSize="small"
                        color="gray.700"
                    >
                        {collection.title}
                    </chakra.a>
                </Link>
            )}
            <Stack spacing="2" mt="2">
                <LinkHelike link="/" label="Levis" />
                <Heading as="h3" size="xl">
                    {name}
                </Heading>
                <Text>{description}</Text>
            </Stack>
            {price && (
                <Stack spacing="2" mt="4">
                    <HStack alignItems="flex-end">
                        <Heading
                            as="p"
                            fontSize="2xl"
                            fontWeight="400"
                            className={`${
                                price.price_type === 'sale' && 'text-rose-600'
                            }`}
                            lineHeight="1"
                        >
                            {price.calculated_price}
                        </Heading>
                        <Heading as="p" size="xs" fontWeight="400">
                            inkl. MwSt.
                        </Heading>
                    </HStack>
                    {price.price_type === 'sale' && (
                        <HStack>
                            <Text>
                                <span className="text-gray-500">
                                    Original:{' '}
                                </span>
                                <span className="line-through">
                                    {price.original_price}
                                </span>
                            </Text>
                            <span className="text-rose-600">
                                -{price.percentage_diff}%
                            </span>
                        </HStack>
                    )}
                </Stack>
            )}
        </Box>
    )
}

export default ProductTag
