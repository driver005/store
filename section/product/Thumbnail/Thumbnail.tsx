import { PlaceholderImage } from "@components/Icons"
import { Image as StoreImage } from "@medusajs/medusa"
import classnames from "classnames"
import Image from "next/image"
import React from "react"

type ThumbnailProps = {
    thumbnail?: string | null
    images?: StoreImage[] | null
    size?: "small" | "medium" | "large" | "full"
}

const Thumbnail: React.FC<ThumbnailProps> = ({
    thumbnail,
    images,
    size = "small",
}) => {
    const initialImage = thumbnail || images?.[0]?.url

    return (
        <div
            className={classnames("relative aspect-[29/34]", {
                "w-[180px]": size === "small",
                "w-[290px]": size === "medium",
                "w-[440px]": size === "large",
                "w-full": size === "full",
            })}
        >
            {initialImage ? (
                <Image
                    src={initialImage}
                    alt="thumbnail"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="absolute inset-0"
                    draggable={false}
                />
            ) : (
                <div className="w-full h-full absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <PlaceholderImage size={size === "small" ? 16 : 24} />
                </div>
            )}
        </div>
    )
}

export default Thumbnail
