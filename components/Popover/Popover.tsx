import {
    Button,
    Popover as ChakraPopover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Stack,
    useDisclosure
} from "@chakra-ui/react"
import React from "react"
import { IoIosArrowDown } from 'react-icons/io'

interface PopoverProps {
    label: string;
    children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({
    label,
    children
}) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)

    return (
        <ChakraPopover
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverTrigger>
                <Button
                    variant='ghost'
                    rightIcon={<IoIosArrowDown />}
                    sx={{
                        '& > span': {
                            'color': `${isOpen ? 'gray.700' : 'gray.400'}`
                        },
                    }}
                >
                    {label}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                w="full"
                className='shadow-lg'
            >
                <PopoverBody
                    px='0'
                    py='1'
                >
                    {children}
                </PopoverBody>
            </PopoverContent>
        </ChakraPopover>
    )
}

export default Popover