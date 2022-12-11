import { Box, Button, chakra, Collapse, Divider, Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import { LinkMetis } from "@components/Links";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { Menu } from "./utils/Menu";
import { CartDropdown, CollectionDropdown } from '@section/store'

interface NavProps {
}

const Nav: FC<NavProps> = () => {
    const isMultiMenu = false
    const [isOpen, setIsOpen] = useState(false)
    const [isCollection, setIsCollection] = useState(false)
    const [index, setIndex] = React.useState(0)

    const [result, setResult]: any = React.useState(null)

    useEffect(() => {
        setResult(Menu[index].links)
    }, [index])

    return (
        <Box
            mb='6'
        >
            <chakra.header
                position='relative'
                bgColor='white'
            >
                <chakra.nav
                    display='flex'
                    color='gray.900'
                    alignItems='center'
                    justifyContent='center'
                    w='full'
                    fontSize='small'
                >
                    <Stack
                        w='full'
                        spacing='0'
                    >
                        <Flex alignItems='center' justifyContent='space-between' px='8' h='16'>
                            <Button
                                h='full'
                                fontSize='normal'
                                fontWeight='normal'
                                variant='ghost'
                                _hover={{
                                    background: 'transparent'
                                }}
                                _active={{
                                    background: 'transparent'
                                }}
                                onMouseEnter={() => {
                                    setIsCollection(true)
                                    setIsOpen(true)
                                }}
                            >
                                {`Collections`}
                            </Button>
                            <Link href="/">
                                <chakra.a fontSize='2xl' fontWeight='semibold' textTransform='uppercase'>Acme</chakra.a>
                            </Link>
                            <CartDropdown />
                        </Flex>
                        <Stack
                            onMouseLeave={() => setIsOpen(false)}
                            w='full'
                            spacing='0'
                            position='relative'
                        >
                            {isMultiMenu && <Flex w='full' alignItems='center' justifyContent='center' py='2'>
                                <HStack
                                    justifySelf='center'
                                    spacing={8}
                                >
                                    {Menu.map((value: any, position: number) => {
                                        return (
                                            <LinkMetis
                                                key={position}
                                                label={value.label}
                                                link='#'
                                                size={16}
                                                isHoverBold
                                                // onClick={() => setIsOpen(!isOpen)}
                                                onMouseEnter={() => {
                                                    setIsCollection(false)
                                                    setIndex(position)
                                                    setIsOpen(true)
                                                }}
                                            />
                                        )
                                    })}
                                </HStack>
                            </Flex>}
                            <Divider borderColor='gray.300' />
                            <Collapse
                                in={isOpen}
                                onMouseLeave={() => setIsOpen(false)}
                                style={{
                                    'position': 'absolute',
                                    'width': '100%',
                                    'top': '100%',
                                    'zIndex': '30',
                                    'background': 'white'
                                }}
                            >
                                <Box
                                    w='full'
                                    pb='6'
                                    minH='200px'
                                >
                                    {isCollection
                                        ? <CollectionDropdown /> :
                                        <Stack
                                            margin='0 1rem'
                                            minWidth='15ch'
                                            width='100%'
                                            alignItems='flex-start'
                                            justifyContent='space-evenly'
                                            isInline
                                        >
                                            {result && result.map((value: any, position: number) => {
                                                return (
                                                    <React.Fragment key={position}>
                                                        <Stack spacing={2}>
                                                            <Heading
                                                                as='h4'
                                                                size='md'
                                                                mt='6'
                                                            >
                                                                {value.label}
                                                            </Heading>
                                                            {value.links.map((data: any, i: number) => {
                                                                return (
                                                                    <Box
                                                                        key={i}
                                                                        w='fit-content'
                                                                    >
                                                                        <LinkMetis
                                                                            link={data.href}
                                                                            label={data.label}
                                                                            size={14}
                                                                        />
                                                                    </Box>
                                                                )
                                                            })}
                                                        </Stack>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </Stack>
                                    }
                                </Box>
                                <Divider borderColor='gray.900' />
                            </Collapse>
                        </Stack>
                    </Stack>
                </chakra.nav>
            </chakra.header>
        </Box >
    )
}

export default Nav
