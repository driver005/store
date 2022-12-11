import { Button, ButtonGroup, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { Select } from '@components/index';
import { onlyUnique } from '@lib/util/only-unique';
import { ProductOption as StoreProductOption } from '@medusajs/medusa';
import React, { FC, useEffect } from 'react'
import { useWatch } from 'react-hook-form';

interface ProductOptionProps {
    control: any;
    title?: string
    option: StoreProductOption
    current?: string
    updateOption: (option: Record<string, string>) => void
    isSelect?: boolean
}

const ProductOption: FC<ProductOptionProps> = ({ control, option, updateOption, title, current, isSelect = false }) => {
    const column = useBreakpointValue({ base: 'repeat(3, minmax(0, 1fr));', lg: 'repeat(5, minmax(0, 1fr));' });
    const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)
    const size = useWatch({
        control,
        name: 'Size'
    })

    useEffect(() => {
        updateOption({ [option.id]: size })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size])

    return (
        <Stack spacing='3' mb='6'>
            <Text as='span'>Select {title}</Text>
            {isSelect ?
                <>
                    {option.values && (
                        <Select
                            name='Size'
                            control={control}
                            rules={{
                                required: false,
                            }}
                            values={filteredOptions}
                            label={`Select ${title}`}
                        />
                    )}
                </>
                :
                <ButtonGroup
                    display='grid'
                    spacing='0'
                    w='full'
                    gridTemplateColumns={column}
                    variant='outline'
                    gridGap='2'
                >
                    {filteredOptions.map((v) => (
                        <Button
                            _hover={{ 'background': 'none' }}
                            key={v}
                            h='12'
                            minW='20'
                            className={`${v === current && '!bg-indigo-600 border-indigo-600'}`}
                            color={v === current ? 'white' : 'black'}
                            onClick={() => updateOption({ [option.id]: v })}
                        >
                            {v}
                        </Button>
                    ))}
                </ButtonGroup>
            }
        </Stack>
    )
}

export default ProductOption
