import { Flex, Stack, Text, SimpleGrid, Box, VStack, Icon, HStack, LinkBox, IconButton, LinkOverlay } from '@chakra-ui/react'
import { Thumbnail } from '@section/product'
import { GoVerified } from 'react-icons/go'
import { AiOutlineHeart } from 'react-icons/ai'
import { ProductPreviewType } from 'types/global'

const Card = ({
    title,
    handle,
    thumbnail,
    price,
    shadow = true
}: ProductPreviewType & { shadow?: boolean }) => {
    return (
        <LinkBox
            as='article'
            // maxW={320}
            borderWidth={shadow ? '0' : '1px'}
            rounded='md'
            overflow='hidden'
            className={shadow ? 'shadow-xl shadow-purple-400/50' : 'border-purple-400'}
            mx={1.5}
            my={2}
            draggable={false}
        >

            <Stack
                h='full'
                maxH='full'
                maxW='full'
            >
                <Flex
                    position='relative'
                >
                    <LinkOverlay
                        href={`/product/${handle}`}
                        w='full'
                        h='full'
                    >
                        <Thumbnail thumbnail={thumbnail} size="full" />
                    </LinkOverlay>
                    <IconButton
                        className='border-purple-400'
                        borderWidth='1px'
                        borderRightWidth='0px'
                        roundedRight='none'
                        position='absolute'
                        top='2'
                        right='0'
                        aria-label='Search database'
                        variant='ghost'
                        zIndex='10'
                        icon={<AiOutlineHeart />}
                    />
                </Flex>
                <LinkOverlay href={`/product/${handle}`}>
                    <Stack pb='2' px='1.5'>
                        <Stack spacing={0}>
                            <HStack>
                                <Text className='truncate' fontSize='sm' fontWeight='500'>Store Name</Text>
                                <Icon as={GoVerified} color='blue.500' />
                            </HStack>
                            <Text className='truncate' fontSize='sm' fontWeight='500'>{title}</Text>
                        </Stack>
                        {/* <Text className='truncate' fontSize='sm' fontWeight='500'>{price.calculated_price}</Text> */}
                        {price && (
                            <HStack>
                                {price.price_type === "sale" && (
                                    <span className="line-through text-gray-500">
                                        {price.original_price}
                                    </span>
                                )}
                                <Text
                                    as='p'
                                    className={`${price.price_type === "sale" && 'text-rose-600'}`}
                                    fontWeight='semibold'
                                >
                                    {price.calculated_price}
                                </Text>
                            </HStack>
                        )}
                    </Stack>
                </LinkOverlay>
            </Stack>
        </LinkBox>
    )
}

export default Card