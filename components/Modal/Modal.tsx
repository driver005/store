import {
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Modal as ChakraModal
} from "@chakra-ui/react";

import React from "react";



interface ModalProps {
    children: React.ReactNode,
    open: boolean,
    setOpen: any,
}

const Modal: React.FC<ModalProps> = ({ children, open, setOpen }) => {
    return (
        <ChakraModal closeOnOverlayClick={false} isOpen={open} size='xl' onClose={() => setOpen(false)}>
            <ModalOverlay background='rgba(255,255,255,0.5)' backdropFilter='blur(20px)' />
            <ModalContent>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {children}
                </ModalBody>
            </ModalContent>
        </ChakraModal>
    )
};

export default Modal