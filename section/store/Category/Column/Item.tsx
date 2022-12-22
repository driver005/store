import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { ButtonCalypso } from '@components/index'
import React, { FC } from 'react'

interface ItemProps {
    src: string
    alt: string
    label: string
    text: string
}

export const Item: FC<ItemProps> = ({ src, alt, label, text }) => {
    return (
        <Box
            borderRadius="xl"
            overflow="hidden"
            position="relative"
            width="full"
            flex="1 1 0%"
        >
            <Image
                src={src}
                alt={alt}
                objectFit="cover"
                objectPosition="center top"
                width="full"
                height="full"
                maxHeight="full"
            />
            <Stack
                position="absolute"
                inset="0px"
                bgGradient="linear(to-t, blackAlpha.300 20%, blackAlpha.700)"
                width="full"
                height="full"
                p="10"
                spacing={4}
            >
                <Heading as="h2" size="lg" color="white">
                    {label}
                </Heading>
                <Text fontSize="lg" color="white" maxW="2xs">
                    {text}
                </Text>
                <ButtonCalypso label="Shop" />
            </Stack>
        </Box>
    )
}
