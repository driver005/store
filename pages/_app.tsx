import '../styles/globals.css'
import 'keen-slider/keen-slider.min.css'

import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}
export default MyApp
