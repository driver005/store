import { Box } from "@chakra-ui/react";
import {
    Heading,
    Divider,
    Products
} from './index';
import React, { FC } from "react";

interface SectionProps {
    storeLink: string;
    storeLabel: string;
    link: string;
    label: string;
}

export const Section: FC<SectionProps> = ({
    storeLink,
    storeLabel,
    link,
    label
}) => {
    return (
        <Box
            p='12'
        >
            <Heading
                storeLink={storeLink}
                storeLabel={storeLabel}
                link={link}
                label={label}
            />
            <Divider />
            <Products />
        </Box>
    )
}