// import { Collapse, RichText } from '@components/ui'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import React, { FC } from 'react'


interface ProductDescriptionProps {
    description: any;
    title: string;
}

const ProductDescription: FC<ProductDescriptionProps> = ({ description, title }) => {
    return (
        <>
            {description && (
                <>
                    <Accordion allowMultiple borderColor='gray.300'>
                        <AccordionItem>
                            <h2>
                                <AccordionButton py={3} px={6}>
                                    <Box flex='1' textAlign='left'>
                                        {title}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                {description}
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <h2>
                                <AccordionButton py={3} px={6}>
                                    <Box flex='1' textAlign='left'>
                                        {title}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                {description}
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <h2>
                                <AccordionButton py={3} px={6}>
                                    <Box flex='1' textAlign='left'>
                                        {title}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                {description}
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </>
            )}
        </>
    )
}

export default ProductDescription
