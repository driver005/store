import {
    Carousel,
    LeftButton,
    Provider,
    RightButton,
} from '@components/Carousel'
import React, { FC } from 'react'
import { Card } from '@section/store'

interface ProductsProps { }

export const Products: FC<ProductsProps> = () => {
    return (
        <Provider>
            <Carousel gap={0}>
                {/* <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card /> */}
            </Carousel>
            <LeftButton />
            <RightButton />
        </Provider>
    )
}
