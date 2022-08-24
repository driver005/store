import React, { FC } from "react";
import { Flex, Icon, Stack } from "@chakra-ui/react";
import { LinkHelike, LinkMetis } from "@components/index";
import { BsArrowRight } from "react-icons/bs";

interface HeadingProps {
    storeLink: string;
    storeLabel: string;
    link: string;
    label: string;
}

export const Heading: FC<HeadingProps> = ({
    storeLink,
    storeLabel,
    link,
    label
}) => {
    return (
        <Stack
            spacing={6}
        >
            <LinkHelike size={50} link={storeLink} label={storeLabel} />
            <Flex>
                <LinkMetis
                    link={link}
                    label={label}
                    icon={<Icon ml={2} as={BsArrowRight} />}
                    size={20}
                    bold
                />
            </Flex>
        </Stack>
    )
}