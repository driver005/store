import {
    Box,
    Divider,
    Flex,
    Heading,
    Icon,
    Stack,
    Text,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    SimpleGrid,
    VStack,
} from '@chakra-ui/react'
import { Product } from '@medusajs/medusa'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import {
    TbRefresh,
    TbTruck,
    TbTruckDelivery,
    TbTruckReturn,
} from 'react-icons/tb'

interface AdditionalInfoProps {
    product: Product
    thirdsPartyStore?: boolean
    title?: string
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
    thirdsPartyStore = false,
    product,
    title = 'Details',
}) => {
    return (
        <Box>
            <Stack
                spacing={0}
                borderWidth="1px"
                rounded="lg"
                mb="10"
                className="border-purple-400"
            >
                {thirdsPartyStore && (
                    <>
                        <Box w="full" roundedTop="lg" py={3} px={6}>
                            <Text as="span">sold and shipped by a partner</Text>
                        </Box>
                        <Divider />
                    </>
                )}
                <Box w="full" py={3} px={6}>
                    <Icon as={TbTruck} w={6} h={6} mb="4px" />
                    <Flex w="full" justifyContent="space-between" mb="4px">
                        <Heading as="p" fontWeight="600" size="xs">
                            Premium delivery
                        </Heading>
                        {/* <Heading as='p' fontWeight='600' size='xs'>5</Heading> */}
                    </Flex>
                    <Text as="p" fontSize="xs">
                        Your package will arrive in 1-2 business days at your pick
                        up location or in the comfort of your home.
                    </Text>
                </Box>
                <Divider />
                <Box w="full" py={3} px={6}>
                    <Icon as={TbTruckDelivery} w={6} h={6} mb="4px" />
                    <Flex w="full" justifyContent="space-between" mb="4px">
                        <Heading as="p" fontWeight="600" size="xs">
                            Fast delivery
                        </Heading>
                    </Flex>
                    <Text as="p" fontSize="xs">
                        Your package will arrive in 3-5 business days at your pick
                        up location or in the comfort of your home.
                    </Text>
                </Box>
                <Divider />
                <Box w="full" py={3} px={6}>
                    <Icon as={TbRefresh} w={6} h={6} mb="4px" />
                    <Flex w="full" justifyContent="space-between" mb="4px">
                        <Heading as="p" fontWeight="600" size="xs">
                            Simple exchanges
                        </Heading>
                    </Flex>
                    <Text as="p" fontSize="xs">
                        Is the fit not quite right? No worries - we&apos;ll exchange
                        your product for a new one.
                    </Text>
                </Box>
                <Divider />
                <Box w="full" py={3} px={6}>
                    <Icon as={TbTruckReturn} w={6} h={6} mb="4px" />
                    <Flex w="full" justifyContent="space-between" mb="4px">
                        <Heading as="p" fontWeight="600" size="xs">
                            Easy returns
                        </Heading>
                    </Flex>
                    <Text as="p" fontSize="xs">
                        Just return your product and we&apos;ll refund your money.
                        No questions asked – we&apos;ll do our best to make sure
                        your return is hassle-free.
                    </Text>
                </Box>
            </Stack>
            <Box mb={6}>
                {product && (
                    <>
                        <Accordion
                            allowMultiple
                            rounded="lg"
                            className="border-purple-400"
                        >
                            <AccordionItem>
                                <h2>
                                    <AccordionButton py={3} px={6}>
                                        <Box
                                            flex="1"
                                            textAlign="left"
                                            className="font-semibold"
                                        >
                                            {title}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <SimpleGrid
                                        px={2}
                                        className="grid-cols-2 gap-x-8"
                                        paddingInline='6'
                                    >
                                        <VStack spacing={4} alignItems="flex-start">
                                            <div>
                                                <span className="font-semibold">
                                                    Material
                                                </span>
                                                <p>
                                                    {product.origin_country
                                                        ? product.origin_country
                                                        : '-'}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="font-semibold">
                                                    Country of origin
                                                </span>
                                                <p>
                                                    {product.origin_country
                                                        ? product.origin_country
                                                        : '-'}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="font-semibold">
                                                    Type
                                                </span>
                                                <p>
                                                    {product.type
                                                        ? product.type.value
                                                        : '-'}
                                                </p>
                                            </div>
                                            {product.tags.length ? (
                                                <div>
                                                    <span className="font-semibold">
                                                        Tags
                                                    </span>
                                                    {product.tags.map((tag, i) => (
                                                        <p key={i}>{tag.value}</p>
                                                    ))}
                                                </div>
                                            ) : null}
                                        </VStack>
                                        <VStack spacing={4} alignItems="flex-start">
                                            <div>
                                                <span className="font-semibold">
                                                    Weight
                                                </span>
                                                <p>
                                                    {product.weight
                                                        ? `${product.weight} g`
                                                        : '-'}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="font-semibold">
                                                    Dimensions
                                                </span>
                                                <p>
                                                    {product.length &&
                                                        product.width &&
                                                        product.height
                                                        ? `${product.length}L x ${product.width}W x ${product.height}H`
                                                        : '-'}
                                                </p>
                                            </div>
                                        </VStack>
                                    </SimpleGrid>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </>
                )}
            </Box>
        </Box>
    )
}

export default AdditionalInfo