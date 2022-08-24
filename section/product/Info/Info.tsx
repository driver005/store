import { Box, Divider, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { TbTruck, TbTruckDelivery } from "react-icons/tb";



interface ProductInfoProps {
    product: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    return (
        <Stack spacing={0} borderWidth='1px' rounded='lg' mb='10' className='border-purple-400'>
            <Box w='full' roundedTop='lg' py={3} px={6}>
                <Text as='span'>sold and shipped by a partner</Text>
            </Box>
            <Divider />
            <Box w='full' py={3} px={6}>
                <Icon as={TbTruckDelivery} w={6} h={6} mb='4px' />
                <Flex w='full' justifyContent='space-between' mb='4px'>
                    <Heading as='p' fontWeight='600' size='xs'>1-2 days</Heading>
                    <Heading as='p' fontWeight='600' size='xs'>5</Heading>
                </Flex>
                <Text as='p' fontSize='xs'>Premium-Lieferung</Text>
            </Box>
            <Divider />
            <Box w='full' py={3} px={6}>
                <Icon as={TbTruck} w={6} h={6} mb='4px' />
                <Flex w='full' justifyContent='space-between' mb='4px'>
                    <Heading as='p' fontWeight='600' size='xs'>3-4 days</Heading>
                    <Heading as='p' fontWeight='600' size='xs'>for free</Heading>
                </Flex>
                <Text as='p' fontSize='xs'>Premium-Lieferung</Text>
            </Box>
        </Stack>

    )
};

export default ProductInfo