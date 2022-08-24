import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { ButtonBestia, Modal } from "@components/index";
import { ProductReview, Stars } from "@section/product";
import { useState } from "react";




interface CommentsProps {
    open: boolean,
    setOpen: any,
}

export const Comments: React.FC<CommentsProps> = ({ open, setOpen }) => {
    return (
        <Modal open={open} setOpen={setOpen}>
            <ProductReview button={false} />
            <Divider />
            <Box my='6'>
                <Heading size='xs' mb='2'>Name</Heading>
                <Stars
                    label="Tested the product"
                    rating={3}
                    stars={5}
                />
                <Text mt='4' fontSize='md'>This is a dream. This is a dream. This is a dream. This is a dream.</Text>
            </Box>
            <Divider />
            <Box my='6'>
                <Heading size='xs' mb='2'>Name</Heading>
                <Stars
                    label="Tested the product"
                    rating={3}
                    stars={5}
                />
                <Text mt='4' fontSize='md'>This is a dream. This is a dream. This is a dream. This is a dream.</Text>
            </Box>
            <Divider />
            <Box my='6'>
                <Heading size='xs' mb='2'>Name</Heading>
                <Stars
                    label="Tested the product"
                    rating={3}
                    stars={5}
                />
                <Text mt='4' fontSize='md'>This is a dream. This is a dream. This is a dream. This is a dream.</Text>
            </Box>
            <Divider />
            <Box my='6'>
                <Heading size='xs' mb='2'>Name</Heading>
                <Stars
                    label="Tested the product"
                    rating={3}
                    stars={5}
                />
                <Text mt='4' fontSize='md'>This is a dream. This is a dream. This is a dream. This is a dream.</Text>
            </Box>
            <Divider mb='6' />
            <ButtonBestia label='See more' height={10} />
        </Modal>
    )
};
