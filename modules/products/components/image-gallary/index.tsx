import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import { Image as MedusaImage } from '@medusajs/medusa'
import ImageSlider from '@modules/common/components/image-slider'
import Image from 'next/image'
import React, { useRef } from 'react'
import { useMeasure } from 'react-use'

type ImageGalleryProps = {
    images: MedusaImage[]
}

const ImageGalleryVertical = ({ images }: ImageGalleryProps) => {
    const imageRefs = useRef<(HTMLDivElement | null)[]>([])

    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            })
        }
    }

    return (
        <div className="flex items-start relative">
            <div className="hidden sm:flex flex-col gap-y-4 sticky top-20">
                {images.map((image, index) => {
                    return (
                        <button
                            key={image.id}
                            className="h-14 w-12 relative border border-white"
                            onClick={() => {
                                handleScrollTo(image.id)
                            }}
                        >
                            <span className="sr-only">
                                Go to image {index + 1}
                            </span>
                            <Image
                                src={image.url}
                                layout="fill"
                                objectFit="cover"
                                className="absolute inset-0"
                                alt="Thumbnail"
                            />
                        </button>
                    )
                })}
            </div>
            <div className="flex flex-col flex-1 sm:mx-16 gap-y-4">
                {images.map((image, index) => {
                    return (
                        <div
                            ref={(image) => imageRefs.current.push(image)}
                            key={image.id}
                            className="relative aspect-[29/34] w-full"
                            id={image.id}
                        >
                            <Image
                                src={image.url}
                                layout="fill"
                                objectFit="cover"
                                priority={index <= 2 ? true : false}
                                className="absolute inset-0"
                                alt={`Product image ${index + 1}`}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


const ImageGalleryHorizontal = ({ images }: ImageGalleryProps) => {

    return (
        <div className="flex items-start relative">
            {images && (

                <ImageSlider>
                    {images.map((image: MedusaImage, i: any) => (
                        <div
                            key={image.id}
                            className="aspect-[4/3] w-full !max-w-full"
                            id={image.id}
                        >
                            <Image
                                src={image.url}
                                alt={`Product image ${i + 1}`}
                                width={1600}
                                height={1200}
                                priority={i === 0}
                                quality="85"
                            />
                        </div>
                    ))}
                </ImageSlider>

            )}
        </div>
    )
}

const ImageGallery = ({ images, direction = 'horizontal' }: { images: MedusaImage[], direction?: string }) => {
    return (
        <React.Fragment>
            {
                direction === 'horizontal' ?
                    <ImageGalleryHorizontal images={images} /> :
                    direction === 'vertical' ?
                        <ImageGalleryVertical images={images} /> :
                        null
            }
        </React.Fragment >
    )
}

export default ImageGallery
