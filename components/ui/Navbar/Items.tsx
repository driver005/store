import React, { Component, useEffect } from 'react';
import PropTypes from "prop-types"
import { Box, chakra, Flex } from '@chakra-ui/react';

interface WrapperProps {
    children: React.ReactNode,
    title: string,
    index: number,
    onMouseEnter: any
}

export const Item: React.FC<WrapperProps> = ({ children, title, index, onMouseEnter }) => {

    return (
        <chakra.button
            sx={{
                'display': 'flex',
                'padding': '20px 12px',
                'justifyContent': 'center',
                'alignItems': 'center',
                '&:hover': {
                    'color': 'rgb(119, 53, 246)',
                    'transition': 'all 200ms ease',
                },
                '&::after': {
                    'width': '0',
                    'height': '0',
                    'verticalAlign': 'middle',
                    'content': '""',
                    'borderTopStyle': 'solid',
                    'borderTopWidth': '6px',
                    'borderRight': '6px solid transparent',
                    'borderBottom': '0 solid transparent',
                    'borderLeft': '6px solid transparent',
                    'marginLeft': '6px',
                    'marginTop': '2px',
                }
            }}
            onMouseEnter={() => onMouseEnter(index)}
            onFocus={() => onMouseEnter(index)}
        >

            <chakra.li position='relative'>{title}</chakra.li>
            <Box position='absolute' left='50%' transform='translateX(-50%)'>{children}</Box>
        </chakra.button>
    )
}