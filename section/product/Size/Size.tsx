import { Select } from '@components/index';
import cn from 'classnames'
import React, { FC } from 'react'
import s from './ProductSize.module.css'

interface ProductSizeProps {
    product: any;
    control: any;
}

const ProductSize: FC<ProductSizeProps> = ({ product, control }) => {
    return (
        <>
            {product != null && product[0].name != "" ? (
                <Select
                    name='Size'
                    control={control}
                    rules={{
                        required: false,
                    }}
                    values={['XXS', 'XS', 'S']}
                    label={'Select size'}
                />
            ) : (
                <p className="text-lg- text-yellow-600">Sold out!</p>
            )}
        </>
    )
}

export default ProductSize
