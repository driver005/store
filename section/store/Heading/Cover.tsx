import React, { FC, useEffect } from 'react'
import { Box, chakra, Grid } from '@chakra-ui/react'
import menu from '@assets/menu.jpg'

interface CoverProps {
    wrapRef: any
    coverRef: any
    innerRef: any
}

export const Cover: FC<CoverProps> = ({ wrapRef, coverRef, innerRef }) => {
    return (
        <Grid
            position="absolute"
            pointerEvents="none"
            zIndex="100"
            willChange="transform"
            height="100%"
            width="100%"
            ref={wrapRef}
        >
            <Grid
                transform="translateY(-100%)"
                overflow="hidden"
                willChange="transform"
                ref={coverRef}
            >
                <Box
                    backgroundSize="cover"
                    transform="translateY(100%)"
                    backgroundPosition="50% 50%"
                    backgroundImage={`url(${menu.src})`}
                    willChange="transform"
                    ref={innerRef}
                />
            </Grid>
        </Grid>
    )
}
