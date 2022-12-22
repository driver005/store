import { Box, Center, chakra, Flex } from '@chakra-ui/react'
import { ProductView } from '@section/product'
import { Card, Heading, Intro } from '@section/store'
import { Wrapper } from '@components/index'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ButtonMagnetic } from '@components/Buttons'
import { Main } from '@section/category'
import { Main as Welcome } from '@section/welcome'

const Home: NextPage = () => {
    return (
        <Wrapper>
            {/* <Intro /> */}
            {/* <Heading
                margin={12}
            /> */}
            {/* <ProductView product={product} /> */}
            {/* <Center h='100vh'>
                <Card />
                <Card />
                <Card />
                <Main />
            </Center> */}
            <Welcome />
        </Wrapper>
    )
}

export default Home
