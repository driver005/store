import React, { FC } from 'react'
import { Stack, Divider as ChakraDivider, Text } from '@chakra-ui/react'

interface DividerProps {}

export const Divider: FC<DividerProps> = () => {
    return (
        <Stack
            direction="row"
            w="100%"
            justifyContent="center"
            alignItems="center"
            my="4"
            spacing={4}
        >
            <ChakraDivider orientation="horizontal" />
            <Text whiteSpace="nowrap">Products</Text>
            <ChakraDivider orientation="horizontal" />
        </Stack>
    )
}
