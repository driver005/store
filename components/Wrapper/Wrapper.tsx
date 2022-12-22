import { Box, chakra } from '@chakra-ui/react'
import { Nav } from '@section/store'

interface WrapperProps {
    children: React.ReactNode
    bgColor?: string
}

const Wrapper: React.FC<WrapperProps> = ({ children, bgColor = 'white' }) => {
    return (
        <Box
            className="wrapper"
            w="100vw"
            h="100vh"
            overflowX="hidden"
            bgColor={bgColor}
        >
            <Nav />
            <chakra.main position="relative">{children}</chakra.main>
        </Box>
    )
}

export default Wrapper
