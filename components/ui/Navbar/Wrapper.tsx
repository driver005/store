import React, { useEffect } from 'react';
import { chakra, Flex } from '@chakra-ui/react';

interface WrapperProps {
    children: React.ReactNode,
    onMouseLeave: any
}

export const Wrapper: React.FC<WrapperProps> = ({ children, onMouseLeave }) => {
    return (
        <chakra.nav position='absolute' padding='26px 3%' background='#dddddd' zIndex='1000' onMouseLeave={onMouseLeave}>
            <Flex as='ul' w='full'>

                {children}

            </Flex>
        </chakra.nav>
    );
};