import {
    AspectRatio,
    Box,
    Image,
    LinkBox,
    LinkOverlay,
    Text
} from "@chakra-ui/react";
import React, { FC } from "react";

interface ItemProps {
    src: string;
    alt: string;
    label: string;
}

export const Item: FC<ItemProps> = ({
    src,
    alt,
    label
}) => {
    return (
        <LinkBox
            as='article'
            position='relative'
            borderRadius='xl'
            overflow='hidden'
        >
            <LinkOverlay
                transitionProperty='all'
                transitionDuration='fast'
                transitionTimingFunction='ease-out'
                cursor='pointer'
                textDecoration='none'
                outline='transparent solid 2px'
                outlineOffset='2px'
                href='#'
            >
                <AspectRatio maxW='560px' ratio={1}>
                    <Image
                        src={src}
                        alt={alt}
                    />
                </AspectRatio>
                <Box
                    position='absolute'
                    inset='0px'
                    bgGradient='linear(to-b, transparent 60%, gray.900)'
                    w='full'
                    h='full'
                />
                <Box
                    position='absolute'
                    textAlign='center'
                    bottom='6'
                    w='full'
                >
                    <Text
                        color='white'
                        fontSize='lg'
                        fontWeight='semibold'
                    >
                        {label}
                    </Text>
                </Box>
            </LinkOverlay>
        </LinkBox>
    )
}