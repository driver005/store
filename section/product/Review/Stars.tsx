import { Box, Button, Flex, Heading, HStack, Icon, Progress, Stack, Text, VStack } from "@chakra-ui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";



interface StarsProps {
    stars: any;
    rating: number;
    label: string;
    size?: number;
}

export const Stars: React.FC<StarsProps> = ({ stars, rating, label, size = 4 }) => {
    var r = rating
    return (
        <HStack spacing='4'>
            <HStack spacing='1'>
                {[...Array(stars)].map((value, i) => {
                    if (rating - (i + 1) === -0.5) {
                        return (
                            <Box key={i} w={size} h={size} position='relative'>
                                <Box overflow='hidden' w={size / 2} h={size} position='relative' zIndex='1'>
                                    <Icon as={BsStarHalf} w={size} h={size} position='absolute' className='!text-yellow-400' />
                                </Box>
                                <Icon as={BsStarFill} position='absolute' top='0' w={size} h={size} className='!text-gray-200' />

                            </Box>
                        )
                    } else if (rating - (i + 1) < 0) {
                        return <Icon key={i} as={BsStarFill} w={size} h={size} className='!text-gray-200' />
                    } else {
                        return <Icon key={i} as={BsStarFill} w={size} h={size} className='!text-yellow-400' />
                    }

                })}
            </HStack>
            <Text size='sm' fontWeight='500'>{label}</Text>
        </HStack>
    )
};
