import { Box } from "@chakra-ui/react"



interface WrapperProps {
    children: React.ReactNode
}


const Wrapper: React.FC<WrapperProps> = ({
    children
}) => {

    return (
        <Box
            className='wrapper'
            w='100vw'
            h='100vh'
            overflowX='hidden'
            position='relative'
        >
            {children}
        </Box>
    )
}

export default Wrapper