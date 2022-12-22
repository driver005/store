import { Image as MedusaImage } from '@medusajs/medusa'
import PlaceholderImage from '@modules/common/icons/placeholder-image'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

type ThumbnailProps = {
    thumbnail?: string | null
    images?: MedusaImage[] | null
    size?: 'small' | 'medium' | 'large' | 'full',
    rounded?: boolean
}

const Thumbnail: React.FC<ThumbnailProps> = ({
    thumbnail,
    images,
    size = 'small',
    rounded = true
}) => {
    const initialImage = thumbnail || images?.[0]?.url

    return (
        <div
            className={clsx('relative aspect-[29/34]', {
                'w-[180px]': size === 'small',
                'w-[290px]': size === 'medium',
                'w-[440px]': size === 'large',
                'w-full': size === 'full',
            })}
        >
            <ImageOrPlaceholder image={initialImage} size={size} rounded={rounded} />
        </div>
    )
}

const ImageOrPlaceholder = ({
    image,
    size,
    rounded,
}: Pick<ThumbnailProps, 'size'> & { image?: string, rounded: boolean }) => {
    return image ? (
        <Image
            src={image}
            alt="Thumbnail"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className={`absolute inset-0 ${rounded ? 'rounded-md' : ''}`}
            draggable={false}
        />
    ) : (
        <div className={`w-full h-full absolute inset-0 bg-gray-100 flex items-center justify-center ${rounded ? 'rounded-md' : ''}`}>
            <PlaceholderImage size={size === 'small' ? 16 : 24} />
        </div>
    )
}

export default Thumbnail
