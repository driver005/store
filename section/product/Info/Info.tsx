import { Box, Divider, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { TbRefresh, TbTruck, TbTruckDelivery, TbTruckReturn } from "react-icons/tb";



interface ProductInfoProps {
    thirdsPartyStore?: boolean;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ thirdsPartyStore = false }) => {
    return (
        <Stack spacing={0} borderWidth='1px' rounded='lg' mb='10' className='border-purple-400'>
            {thirdsPartyStore && (
                <>
                    <Box w='full' roundedTop='lg' py={3} px={6}>
                        <Text as='span'>sold and shipped by a partner</Text>
                    </Box>
                    <Divider />
                </>
            )}
            <Box w='full' py={3} px={6}>
                <Icon as={TbTruck} w={6} h={6} mb='4px' />
                <Flex w='full' justifyContent='space-between' mb='4px'>
                    <Heading as='p' fontWeight='600' size='xs'>Premium delivery</Heading>
                    {/* <Heading as='p' fontWeight='600' size='xs'>5</Heading> */}
                </Flex>
                <Text as='p' fontSize='xs'>
                    Your package will arrive in 1-2 business days at your pick up
                    location or in the comfort of your home.
                </Text>
            </Box>
            <Divider />
            <Box w='full' py={3} px={6}>
                <Icon as={TbTruckDelivery} w={6} h={6} mb='4px' />
                <Flex w='full' justifyContent='space-between' mb='4px'>
                    <Heading as='p' fontWeight='600' size='xs'>Fast delivery</Heading>
                </Flex>
                <Text as='p' fontSize='xs'>
                    Your package will arrive in 3-5 business days at your pick up
                    location or in the comfort of your home.
                </Text>
            </Box>
            <Divider />
            <Box w='full' py={3} px={6}>
                <Icon as={TbRefresh} w={6} h={6} mb='4px' />
                <Flex w='full' justifyContent='space-between' mb='4px'>
                    <Heading as='p' fontWeight='600' size='xs'>Simple exchanges</Heading>
                </Flex>
                <Text as='p' fontSize='xs'>
                    Is the fit not quite right? No worries - we&apos;ll exchange your
                    product for a new one.
                </Text>
            </Box>
            <Divider />
            <Box w='full' py={3} px={6}>
                <Icon as={TbTruckReturn} w={6} h={6} mb='4px' />
                <Flex w='full' justifyContent='space-between' mb='4px'>
                    <Heading as='p' fontWeight='600' size='xs'>Easy returns</Heading>
                </Flex>
                <Text as='p' fontSize='xs'>
                    Just return your product and we&apos;ll refund your money. No
                    questions asked – we&apos;ll do our best to make sure your return
                    is hassle-free.
                </Text>
            </Box>
        </Stack>

    )
};

export default ProductInfo