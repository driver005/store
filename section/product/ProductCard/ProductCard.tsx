import Link from 'next/link'
import React, { Fragment, useEffect, useRef, useState } from 'react'
// import classNames from "classnames";
// import { Button } from "@components/ui";
import { useRouter } from 'next/router'

const styles = {
    grid: `grid grid-cols-4 gap-4`,
    product: {
        name: `block text-lg text-gray-900 truncate dark:text-white`,
        category: `block text-sm font-medium text-gray-500 dark:text-gray-500`,
        price: `block text-md font-medium text-gray-900 dark:text-white`,
        details: `mt-4 flex justify-between text-base font-medium text-gray-900  mx-2 mt-2 dark:text-white`,
    },
}

interface ProductCardProps {
    product: any
}

const ProductCard: React.VFC<ProductCardProps> = ({ product }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [productData, setproductData] = useState(null)
    let priceDisplay =
        product.pricing?.priceRange?.start?.gross.localizedAmount || ''
    if (
        product.pricing?.priceRange?.start?.gross.amount !==
        product.pricing?.priceRange?.stop?.gross.amount
    ) {
        priceDisplay = 'from ' + priceDisplay
    }
    const imageStyle: React.CSSProperties = {}
    if (!!product.thumbnail?.url) {
        imageStyle.backgroundImage = `url(${product.thumbnail?.url})`
        imageStyle.backgroundSize = 'auto'
        imageStyle.backgroundRepeat = 'no-repeat'
        imageStyle.backgroundPosition = 'center'
    }

    const redirect = () => {
        if (!open) {
            router.push(`/products/${product.slug}`)
        }
    }
    // useEffect(() => {
    //     const openProduct = async () => {
    //         const data: ApolloQueryResult<ProductBySlugQuery> =
    //             await apolloClient.query({
    //                 query: ProductBySlugDocument,
    //                 variables: {
    //                     slug: product.slug,
    //                 },
    //             });
    //         return {
    //             product: data.data.product
    //         }
    //         //setOpen(true)
    //     }
    //     const result = openProduct()
    //     result.then(value => setproductData(value.product as any))
    // }, [product.slug])

    const openCheck = async () => {
        if (productData) {
            setOpen(true)
        }
        //setproductData(data.data.product)
        //setOpen(true)
    }
    // console.log(productData)
    return (
        <Fragment>
            <figure className="group relative cursor-pointer dark:bg-black">
                <a className="z-0 " onClick={() => redirect()}>
                    <div className="aspect-w-4 aspect-h-3  rounded-lg  h-60">
                        <div
                            className="flex rounded flex-col w-full h-60 bg-purple-600 max-w-full "
                            style={imageStyle}
                        >
                            {!!product.pricing?.onSale && (
                                <>
                                    <br />
                                    <div className="bg-red-600 text-white w-1/4 text-center rounded-r-xl shadow-lg">
                                        Sale
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={styles.product.details}>
                        <div>
                            <p className={styles.product.name}>
                                {product.name}
                            </p>
                            <p className={styles.product.category}>
                                {product.category?.name}
                            </p>
                        </div>
                        <p className={styles.product.price}>{priceDisplay}</p>
                    </div>
                </a>
                <figcaption className="flex items-end p-4 absolute top-2/4 left-0 w-full">
                    {/* {productData && <Button
                        className="relative z-10 w-full bg-white bg-opacity-75 !py-2 rounded-md text-sm text-gray-900 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        onClick={() => openCheck()}
                    >
                        Quick View
                    </Button>} */}
                </figcaption>
            </figure>
            {/* <QuickView product={productData} open={open} setOpen={setOpen}  /> */}
        </Fragment>
    )
}

export default ProductCard
