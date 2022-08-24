import { Flex, Stack, Text, SimpleGrid, Box, VStack, Icon, HStack, LinkBox, IconButton, LinkOverlay } from '@chakra-ui/react'
import { Background, Name, Cursor } from '@section/welcome'
import { GoVerified } from 'react-icons/go'
import { AiOutlineHeart } from 'react-icons/ai'
import Image from 'next/image'


interface CardProps {
}


const Card: React.FC<CardProps> = ({

}) => {
    return (
        <LinkBox
            as='article'
            maxW={320}
            borderWidth='0'
            rounded='md'
            overflow='hidden'
            className='shadow-xl shadow-purple-400/50'
            mx={1.5}
            my={2}
        >
            <LinkOverlay href={'/product/test'}>
                <Stack
                    h='full'
                    maxH='full'
                    maxW='full'
                >
                    <Flex
                        position='relative'
                    >
                        <Image
                            src='https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg'
                            alt='Product image'
                            width={320}
                            height={425}
                            quality="100"
                            draggable='false'
                        />
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
                            icon={<AiOutlineHeart />}
                        />
                    </Flex>
                    <Stack pb='2' px='1.5'>
                        <Stack spacing={0}>
                            <HStack>
                                <Text className='truncate' fontSize='sm' fontWeight='500'>Test - 8435946589374589346389654674890976490674779</Text>
                                <Icon as={GoVerified} color='blue.500' />
                            </HStack>
                            <Text className='truncate' fontSize='sm' fontWeight='500'>BOXY SUIT TROUSERS - 8435946589374589346389654674890976490674</Text>
                        </Stack>
                        <Text className='truncate' fontSize='sm' fontWeight='500'>249,95 €</Text>
                    </Stack>
                </Stack>
            </LinkOverlay>
        </LinkBox>
    )
}

export default Card