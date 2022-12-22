// import { Collapse, RichText } from '@components/ui'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    SimpleGrid,
    VStack,
} from '@chakra-ui/react'
import React, { FC } from 'react'

interface ProductDescriptionProps {
    product: any
    title: string
}

const ProductDescription: FC<ProductDescriptionProps> = ({
    product,
    title,
}) => {
    return (
        <Box mb={6}>
            {product && (
                <>
                    <Accordion
                        allowMultiple
                        rounded="lg"
                        className="border-purple-400"
                    >
                        <AccordionItem>
                            <h2>
                                <AccordionButton py={3} px={6}>
                                    <Box
                                        flex="1"
                                        textAlign="left"
                                        className="font-semibold"
                                    >
                                        {title}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <SimpleGrid
                                    px={2}
                                    className="grid-cols-2 gap-x-8"
                                >
                                    <VStack spacing={4} alignItems="flex-start">
                                        <div>
                                            <span className="font-semibold">
                                                Material
                                            </span>
                                            <p>
                                                {product.origin_country
                                                    ? product.origin_country
                                                    : '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="font-semibold">
                                                Country of origin
                                            </span>
                                            <p>
                                                {product.origin_country
                                                    ? product.origin_country
                                                    : '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="font-semibold">
                                                Type
                                            </span>
                                            <p>
                                                {product.type
                                                    ? product.type.value
                                                    : '-'}
                                            </p>
                                        </div>
                                    </VStack>
                                    <VStack spacing={4} alignItems="flex-start">
                                        <div>
                                            <span className="font-semibold">
                                                Weight
                                            </span>
                                            <p>
                                                {product.weight
                                                    ? `${product.weight} g`
                                                    : '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="font-semibold">
                                                Dimensions
                                            </span>
                                            <p>
                                                {product.length &&
                                                product.width &&
                                                product.height
                                                    ? `${product.length}L x ${product.width}W x ${product.height}H`
                                                    : '-'}
                                            </p>
                                        </div>
                                    </VStack>
                                </SimpleGrid>
                                <div className="grid grid-cols-2 gap-x-8"></div>
                                {product.tags.length ? (
                                    <div>
                                        <span className="font-semibold">
                                            Tags
                                        </span>
                                    </div>
                                ) : null}
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </>
            )}
        </Box>
    )
}

export default ProductDescription
