import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { LinkHelike } from '@components/index'

interface ProductTagProps {
    className?: string
    color?: string
    name: string
    price: string
    fontSize?: number
    quickview?: boolean
}

const ProductTag: React.FC<ProductTagProps> = ({
    name,
    price,
}) => {
    return (
        <Stack spacing='2' mb='12'>
            <LinkHelike link='/' label='Levis' />
            <Heading as='h3' size='xl'>{name}</Heading>
            <HStack alignItems='flex-end'>
                <Heading as='p' fontSize='2xl' fontWeight='400' lineHeight='1'>{price}</Heading>
                <Heading as='p' size='xs' fontWeight='400'>inkl. MwSt.</Heading>
            </HStack>
        </Stack>
    )
}

export default ProductTag
