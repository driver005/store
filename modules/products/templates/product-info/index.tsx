import ProductActions from '@modules/products/components/product-actions'
import ProductTabs from '@modules/products/components/product-tabs'
import React from 'react'
import { Product } from '@medusajs/medusa'
import AdditionalInfo from '@modules/products/components/additional-info'

type ProductInfoProps = {
    product: Product
    type?: string
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, type = 'accordion' }) => {
    return (
        <React.Fragment>
            <div id="product-info">
                <div className="flex flex-col gap-y-12 lg:max-w-[500px] mx-auto">
                    <div>
                        <ProductActions product={product} />
                    </div>
                </div>
            </div>
            {type === 'accordion' ? <AdditionalInfo product={product} /> : type === 'tab' ? <ProductTabs product={product} /> : null}
        </React.Fragment>
    )
}

export default ProductInfo
