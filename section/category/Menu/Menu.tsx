import { Box, Button, List, ListItem, Stack } from '@chakra-ui/react'
import { LinkMetis } from '@components/index'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

interface MenuProps {
    items: any
}

const Menu: React.FC<MenuProps> = ({ items }) => {
    const router = useRouter()
    const route = `/${router.route.split('/')[1]}/`
    const [query, setQuery]: any = useState({})

    useEffect(() => {
        let queries: any = {}
        if (router.query.order) {
            queries = {
                ...queries,
                order: router.query.order,
            }
        }
        if (router.query.dir) {
            queries = {
                ...queries,
                dir: router.query.dir,
            }
        }
        setQuery(queries)
    }, [router.query])

    const Mapping = (values: any, root: string) => {
        return (
            <List mt={2} ml={4} spacing={2}>
                {values.map((value: any, index: number) => {
                    const isActive =
                        router.query.parm &&
                        Array.from(router.query.parm).find(
                            (element) => element === value.href
                        )
                            ? true
                            : false
                    return (
                        <ListItem key={index}>
                            <LinkMetis
                                label={value.name}
                                link={{
                                    pathname: `${route}${root}/${value.href}`,
                                    query: { ...query },
                                }}
                                size={14}
                                active={
                                    router.query.parm?.length === value.level &&
                                    Array.from(router.query.parm as any).find(
                                        (element) => element === value.href
                                    )
                                        ? true
                                        : false
                                }
                                bold={isActive || value.level >= 3}
                                replace={true}
                            />

                            {isActive &&
                                value.children &&
                                Mapping(
                                    value.children,
                                    `${root}/${value.href}`
                                )}
                        </ListItem>
                    )
                })}
            </List>
        )
    }

    return (
        <List spacing={2}>
            {items.map((value: any, index: number) => {
                if (value.children !== null) {
                    const isActive =
                        router.query.parm?.length === value.level &&
                        Array.from(router.query.parm as any).find(
                            (element) => element === value.href
                        )
                            ? true
                            : false
                    return (
                        <React.Fragment>
                            <ListItem key={index}>
                                <LinkMetis
                                    label={value.name}
                                    link={{
                                        pathname: `${route}${value.href}`,
                                        query: { ...query },
                                    }}
                                    size={14}
                                    active={isActive}
                                    bold={isActive}
                                    replace={true}
                                />
                            </ListItem>
                            {Mapping(value.children, value.href)}
                        </React.Fragment>
                    )
                }
            })}
        </List>
    )
}

export default Menu
