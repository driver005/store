import React, { FC } from 'react'
import {
    Box,
    chakra,
    Grid,
    Heading,
    Stack,
    useBreakpointValue,
} from '@chakra-ui/react'
import { LinkMetis } from '@components/index'
import { Back } from './Back'

interface ContentProps {
    contentRef: any
    result: any
    collapseMenu: any
}

export const Content: FC<ContentProps> = ({
    contentRef,
    result,
    collapseMenu,
}) => {
    const row = useBreakpointValue(
        {
            base: '1fr auto',
            lg: '1fr 10vh',
        },
        { fallback: 'lg' }
    )
    const column = useBreakpointValue(
        {
            base: 'auto 1fr auto',
            lg: '5rem 10% minmax(200px,417px) 10% 5rem',
        },
        { fallback: 'lg' }
    )
    const area = useBreakpointValue(
        {
            base: "'links links back''tagline tagline tagline'",
            lg: "'... ... links back ...''tagline tagline social social social'",
        },
        { fallback: 'lg' }
    )

    return (
        <Box
            position="relative"
            gridArea="content"
            overflow="hidden"
            marginTop="-1.35rem"
        >
            <Grid
                className="content"
                overflow="hidden"
                transform="translateY(-100%)"
                px={8}
                height="100%"
                display="grid"
                justifyContent="space-between"
                background="#ee8233"
                borderRadius="0 0 2rem 2rem"
                gridTemplateRows={row}
                gridTemplateColumns={column}
                gridTemplateAreas={area}
                pb={4}
                willChange="transform"
                ref={contentRef}
            >
                <chakra.nav
                    display="flex"
                    gridArea="links"
                    flexWrap="wrap"
                    alignSelf="start"
                    marginTop="5.5vh"
                >
                    <Stack
                        margin="0 1rem"
                        minWidth="15ch"
                        width="100%"
                        alignItems="flex-start"
                        isInline
                    >
                        {result &&
                            result.map((value: any, position: number) => {
                                return (
                                    <React.Fragment key={position}>
                                        <Stack spacing={2} flexBasis="50%">
                                            <Heading as="h4" size="md" mt="7">
                                                {value.label}
                                            </Heading>
                                            {value.links.map(
                                                (data: any, i: number) => {
                                                    return (
                                                        <Box
                                                            key={i}
                                                            w="fit-content"
                                                        >
                                                            <LinkMetis
                                                                link={data.href}
                                                                label={
                                                                    data.label
                                                                }
                                                                size={14}
                                                            />
                                                        </Box>
                                                    )
                                                }
                                            )}
                                        </Stack>
                                    </React.Fragment>
                                )
                            })}
                    </Stack>
                </chakra.nav>
                <Back collapseMenu={collapseMenu} />
            </Grid>
        </Box>
    )
}
