import React, { FC, useEffect } from "react";
import { chakra } from "@chakra-ui/react";

interface BackProps {
    collapseMenu: any;
}

export const Back: FC<BackProps> = ({ collapseMenu }) => {
    return (
        <chakra.button
            position='relative'
            gridArea='back'
            height='90px'
            alignSelf='start'
            marginTop='calc(5.5vh + 2rem)'
            onClick={() => collapseMenu()}
        >
            <chakra.svg
                display='block'
                fill='#000'
                height='100%'
                maxHeight='201px'
                transition='transform 0.3s'
                width="10"
                viewBox="0 0 10 121"
                preserveAspectRatio="xMidYMin meet"
                sx={{
                    '&:hover, &:focus': {
                        'transform': 'translateY(-10px)',
                    }
                }}
            >
                <path d="M5 0 .5 9h9L5 0Zm.5 120.5V8h-1v113h1v-.5Z" />
            </chakra.svg>
        </chakra.button>
    )
}
