import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { Heading as ChakraHeading } from '@chakra-ui/react'

interface HeadingProps {
    items: any
}

const Heading: FC<HeadingProps> = ({ items }) => {
    const router = useRouter()
    const [heading, setHeading]: any = useState('')
    useEffect(() => {
        let header: any = null
        if (router.query.parm) {
            Array.from(router.query.parm as any).map(
                (value: any, index: number) => {
                    if (header) {
                        header = header.children.find(
                            (data: any) => data.href === value
                        )
                    } else {
                        header = items.find((data: any) => data.href === value)
                    }
                    setHeading(header?.name)
                }
            )
        }
    }, [items, router.query.parm])

    return (
        <ChakraHeading as="h2" size="3xl">
            {heading}
        </ChakraHeading>
    )
}

export default Heading
