import { ProductProvider } from '@lib/context/product-context'
import { useIntersection } from '@lib/hooks/use-in-view'
import { Product } from '@medusajs/medusa'
import RelatedProducts from '@modules/products/components/related-products'
import ProductInfo from '@modules/products/templates/product-info'
import React, { useRef } from 'react'
import ImageGallery from '../components/image-gallary'
import MobileActions from '../components/mobile-actions'

type ProductTemplateProps = {
    product: Product
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
    const info = useRef<HTMLDivElement>(null)

    const inView = useIntersection(info, '0px')

    return (
        <ProductProvider product={product}>
            <div className="content-container flex flex-col sm:flex-row sm:items-start py-6 relative">

                <div className="flex flex-col gap-y-8 w-full lg:w-[75%]">
                    <ImageGallery images={product.images} />
                </div>
                <div
                    className="sm:sticky sm:top-20 md:w-[25%] py-8 pl-4 sm:py-0 hidden flex-col gap-y-12 lg:flex"
                    ref={info}
                >
                    <ProductInfo product={product} />
                </div>
            </div>
            <div className="content-container my-16 px-6 sm:px-8 sm:my-32">
                <RelatedProducts product={product} />
            </div>
            <MobileActions product={product} show={!inView} />
        </ProductProvider>
    )
}

export default ProductTemplate
