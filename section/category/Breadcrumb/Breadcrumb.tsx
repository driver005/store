import {
    Breadcrumb as ChakraBreadcrumb,
    BreadcrumbItem,
    Icon
} from '@chakra-ui/react'
import { LinkMetis } from '@components/index'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'


interface BreadcrumbProps {
    items: any;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
    const router = useRouter()
    const [query, setQuery]: any = useState({})
    let item: any = null;

    useEffect(() => {
        let queries: any = {};
        if (router.query.order) {
            queries = {
                ...queries,
                order: router.query.order
            }
        }
        if (router.query.dir) {
            queries = {
                ...queries,
                dir: router.query.dir
            }
        }
        setQuery(queries)
    }, [router.query])


    return (
        <ChakraBreadcrumb spacing='8px' separator={<Icon as={FiChevronRight} color='gray.500' />}>
            {router.query.parm && Array.from(router.query.parm as any).map((value: any, index: number) => {
                if (item) {
                    item = item.children.find((data: any) => data.href === value)
                } else {
                    item = items.find((data: any) => data.href === value)
                }
                return (
                    <BreadcrumbItem key={index} isCurrentPage={router.query.parm?.length === (index + 1)} >
                        <LinkMetis
                            label={item?.name}
                            link={{
                                pathname: `${router.asPath.slice(0, router.asPath.indexOf(value))}${value}`,
                                query: { ...query },
                            }}
                            size={16}
                            bold
                            replace={true}
                        />
                    </BreadcrumbItem>
                )
            })}
        </ChakraBreadcrumb>

    )
}

export default Breadcrumb