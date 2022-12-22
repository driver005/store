import {
    Button,
    MenuButton,
    MenuItem,
    MenuList,
    Menu as ChakraMenu,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const MenuItems = [
    {
        name: 'Most Popular',
        order: 'popular',
        direction: 'asc',
    },
    {
        name: 'Best Rating',
        order: 'rating',
        direction: 'asc',
    },
    {
        name: 'Newest',
        order: 'activation_date',
        direction: 'asc',
    },
    {
        name: 'Price: High to Low',
        order: 'price',
        direction: 'desc',
    },
    {
        name: 'Price: Low to High',
        order: 'price',
        direction: 'asc',
    },
    {
        name: 'Sale',
        order: 'sale',
        direction: 'asc',
    },
]

interface SortProps {}

const Sort: React.FC<SortProps> = ({}) => {
    const router = useRouter()
    const [selected, setSelected] = useState('')

    const handelClick = (value: any) => {
        router.replace({
            query: {
                ...router.query,
                order: value.order,
                dir: value.direction,
            },
        })
    }

    useEffect(() => {
        let query: any = {}
        if (router.query.order) {
            query = {
                ...query,
                order: router.query.order,
            }
        }
        if (router.query.dir) {
            query = {
                ...query,
                dir: router.query.dir,
            }
        }
        setSelected(`${query.order}_${query.dir}`)
    }, [router.query])

    return (
        <ChakraMenu placement="bottom-end">
            {({ isOpen }) => (
                <React.Fragment>
                    <MenuButton
                        as={Button as any}
                        variant="ghost"
                        isActive={isOpen}
                        rightIcon={<IoIosArrowDown />}
                        sx={{
                            '& > span > svg': {
                                color: `${isOpen ? 'gray.700' : 'gray.400'}`,
                            },
                        }}
                    >
                        Sort
                    </MenuButton>
                    <MenuList
                        minW="min-content"
                        w="fit-content"
                        className="!shadow-2xl"
                    >
                        {MenuItems.map((value: any, index: number) => {
                            return (
                                <MenuItem
                                    key={index}
                                    value={`${value.order}_${value.direction}`}
                                    fontWeight={
                                        selected ===
                                        `${value.order}_${value.direction}`
                                            ? 'medium'
                                            : 'normal'
                                    }
                                    color={
                                        selected ===
                                        `${value.order}_${value.direction}`
                                            ? 'gray.700'
                                            : 'gray.500'
                                    }
                                    fontSize="sm"
                                    px="6"
                                    onClick={() => handelClick(value)}
                                >
                                    {value.name}
                                </MenuItem>
                            )
                        })}
                    </MenuList>
                </React.Fragment>
            )}
        </ChakraMenu>
    )
}

export default Sort
