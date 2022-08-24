import React, { FC, useEffect } from "react";
import { chakra, Grid, Heading, HStack, useBreakpointValue } from "@chakra-ui/react";
import { LinkMetis } from "@components/index";
import Link from "next/link";

interface BarProps {
    items: any;
    setIndex: any;
    expandMenu: any;
}

export const Bar: FC<BarProps> = ({ items, setIndex, expandMenu }) => {
    const columns = useBreakpointValue(
        {
            base: 'auto 1fr auto',
            lg: '5rem 10% minmax(200px,417px) 10% 5rem'
        }, { fallback: 'lg' }
    )
    const area = useBreakpointValue(
        {
            base: "'title nav search'",
            lg: "'title ... nav ... search'"
        }, { fallback: 'lg' }
    )

    return (
        <Grid
            pointerEvents='auto'
            zIndex='100'
            px={8}
            gridArea='top'
            alignItems='center'
            justifyContent='space-between'
            background='#ee8233'
            borderRadius='2rem'
            templateColumns={columns}
            templateAreas={area}
        >

            <Link href={'/'} passHref>
                <Heading
                    as='a'
                    size='lg'
                    gridArea='title'
                    fontWeight='300'
                    position='relative'
                    alignSelf='center'
                    justifySelf='start'
                    textTransform='uppercase'
                    lineHeight='1'
                >
                    Alibay
                </Heading>
            </Link>
            <HStack
                gridArea='nav'
                overflow='hidden'
                height='2rem'
                justifySelf='center'
                spacing={8}
            >
                {items.map((value: any, position: number) => {
                    return (
                        <LinkMetis
                            key={position}
                            label={value.label}
                            link='#'
                            onClick={() => {
                                setIndex(position)
                                expandMenu()
                            }}
                            size={16}
                        />
                    )
                })}
            </HStack>
        </Grid>
    )
}
