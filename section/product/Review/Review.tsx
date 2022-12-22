import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    Progress,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react'
import { ButtonBestia, Modal } from '@components/index'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { BsStarFill, BsStarHalf } from 'react-icons/bs'
import { Stars } from './Stars'

interface ProductReviewProps {
    product?: any
    button?: boolean
    setOpen?: any
}

const ProductReview: React.FC<ProductReviewProps> = ({
    setOpen,
    product,
    button = true,
}) => {
    return (
        <Stack
            w="full"
            mb="10"
            borderWidth={button ? '1px' : '0'}
            rounded={button ? 'md' : 'none'}
            px={button ? '6' : '0'}
            py={button ? '3' : '0'}
            className={button ? '!border-purple-400 ' : ''}
        >
            <Heading size="md">Customer Reviews</Heading>
            {/* <HStack justifyContent='space-between'>
                <Heading size='lg'>4.5/5</Heading>
                <Heading size='xl'>Stars</Heading>
            </HStack> */}
            <Stars stars={5} rating={3.5} label={'Based on 1600 reviews'} />
            <Stack spacing="0.5" pb="2">
                <HStack spacing="3" alignItems="center">
                    <HStack spacing="3">
                        <Text fontWeight="500">5</Text>
                        <Icon
                            as={BsStarFill}
                            className="!text-yellow-400"
                            w={4}
                            h={4}
                        />
                    </HStack>
                    <Progress value={20} size="md" w="full" borderRadius="md" />
                    <Text fontWeight="500">60%</Text>
                </HStack>
                <HStack spacing="3" alignItems="center">
                    <HStack spacing="3">
                        <Text fontWeight="500">4</Text>
                        <Icon
                            as={BsStarFill}
                            className="!text-yellow-400"
                            w={4}
                            h={4}
                        />
                    </HStack>
                    <Progress value={20} size="md" w="full" borderRadius="md" />
                    <Text fontWeight="500">60%</Text>
                </HStack>
                <HStack spacing="3" alignItems="center">
                    <HStack spacing="3">
                        <Text fontWeight="500">3</Text>
                        <Icon
                            as={BsStarFill}
                            className="!text-yellow-400"
                            w={4}
                            h={4}
                        />
                    </HStack>
                    <Progress value={20} size="md" w="full" borderRadius="md" />
                    <Text fontWeight="500">60%</Text>
                </HStack>
                <HStack spacing="3" alignItems="center">
                    <HStack spacing="3">
                        <Text fontWeight="500">2</Text>
                        <Icon
                            as={BsStarFill}
                            className="!text-yellow-400"
                            w={4}
                            h={4}
                        />
                    </HStack>
                    <Progress value={20} size="md" w="full" borderRadius="md" />
                    <Text fontWeight="500">60%</Text>
                </HStack>
                <HStack spacing="3" alignItems="center">
                    <HStack spacing="3">
                        <Text fontWeight="500">1</Text>
                        <Icon
                            as={BsStarFill}
                            className="!text-yellow-400"
                            w={4}
                            h={4}
                        />
                    </HStack>
                    <Progress value={20} size="md" w="full" borderRadius="md" />
                    <Text fontWeight="500">60%</Text>
                </HStack>
            </Stack>
            {button && (
                <ButtonBestia
                    label="See all"
                    height={10}
                    onClick={() => setOpen(true)}
                    scale={false}
                />
            )}
        </Stack>
    )
}

export default ProductReview
