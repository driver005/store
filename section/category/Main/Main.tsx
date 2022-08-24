import { Box, BreadcrumbItem, BreadcrumbLink, Flex, HStack, Icon, Stack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Menu, Sort, Breadcrumb, Heading } from "@section/category"
import { useRouter } from "next/router"
import { FiChevronRight } from "react-icons/fi"
import { capitalizeFirstLetter } from "@utils/index"
import { useEffectOnce } from "react-use"
import Link from "next/link"
import { LinkMetis } from "@components/index"
import { Card } from "@section/store"


const MenuItems = [
    {
        name: "Bekleidung",
        href: 'clothing',
        level: 1,
        children: [
            {
                name: 'Hose',
                href: 'trousers',
                level: 2,
                children: [
                    {
                        name: 'Hose kurz',
                        href: 'short',
                        level: 3,
                        children: null,
                    },
                    {
                        name: 'Hose lang',
                        href: 'long',
                        level: 3,
                        children: null,
                    },
                ]
            },
            {
                name: 'T-shirt',
                href: 't-shirt',
                level: 2,
                children: [
                    {
                        name: 'T-shirt basic',
                        href: 'basic',
                        level: 3,
                        children: null,
                    },
                    {
                        name: 'T-shirt print',
                        href: 'print',
                        level: 3,
                        children: null,
                    },

                ]
            },
            {
                name: 'Shorts',
                href: 'shorts',
                level: 2,
                children: [
                    {
                        name: 'Jeans Shorts',
                        href: 'jeans',
                        level: 3,
                        children: null,
                    },
                    {
                        name: 'Chino Shorts',
                        href: 'chino',
                        level: 3,
                        children: null,
                    },

                ]
            }
        ]
    }
]


interface MainProps {
}


const Main: React.FC<MainProps> = ({

}) => {
    const router = useRouter()

    return (
        <Box
            w='100%'
            h='100%'
            mx='auto'
            maxW='1260px'
        >
            <Breadcrumb
                items={MenuItems}
            />
            <Flex
                w='100%'
                justifyContent='space-between'
                alignItems='center'
                pb={6}
            >
                <Heading
                    items={MenuItems}
                />
                <Sort />
            </Flex>

            <Stack
                w='100%'
                isInline
            >
                <Box
                    w='20%'
                    h='100%'
                >
                    <Menu
                        items={MenuItems}
                    />
                </Box>
                <Box
                    w='80%'
                    h='100%'
                >
                    <Flex
                        flexWrap='wrap'
                        maxW='100%'
                    >
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </Flex>
                </Box>
            </Stack>
        </Box>
    )
}

export default Main