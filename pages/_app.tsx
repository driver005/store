import '../styles/globals.css'
import 'keen-slider/keen-slider.min.css'

import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider, MedusaProvider } from 'medusa-react'
import { MEDUSA_BACKEND_URL, queryClient } from '@lib/config'
import { StoreProvider } from '@lib/context/store-context'
import { CartDropdownProvider } from '@lib/context/cart-dropdown-context'
import { AppPropsWithLayout } from 'types/global'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <MedusaProvider
            baseUrl={MEDUSA_BACKEND_URL}
            queryClientProviderProps={{
                client: queryClient,
            }}
        >
            <CartDropdownProvider>
                <CartProvider>
                    <StoreProvider>
                        <ChakraProvider>
                            {getLayout(<Component {...pageProps} />)}
                        </ChakraProvider>
                    </StoreProvider>
                </CartProvider>
            </CartDropdownProvider>
        </MedusaProvider>
    )
}
export default MyApp
