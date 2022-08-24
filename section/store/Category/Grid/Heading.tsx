import {
    Flex,
    Heading as ChakraHeading,
    Icon
} from "@chakra-ui/react";
import { LinkMetis } from "@components/Links";
import React, { FC } from "react";
import { BsArrowRight } from "react-icons/bs";

interface HeadingProps {
}

export const Heading: FC<HeadingProps> = () => {
    return (
        <Flex
            justifyContent='space-between'
            alignItems='center'
            w='full'
        >
            <ChakraHeading
                as='h2'
                size='lg'
            >
                Shop by Categories
            </ChakraHeading>
            <LinkMetis
                link={'/'}
                label={'Start shopping'}
                icon={<Icon ml={2} as={BsArrowRight} />}
                size={20}
                bold
            />
        </Flex>
    )
}