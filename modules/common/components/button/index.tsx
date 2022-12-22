import { ButtonBestia } from '@modules/common/components/buttons'
import Spinner from '@modules/common/icons/spinner'
import clsx from 'clsx'
import React from 'react'

type ButtonProps = {
    isLoading?: boolean
    variant?: 'primary' | 'secondary'
    fillColor?: string
    height?: number | string
    scale?: boolean
    loaded?: boolean
    color?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
    children,
    className,
    onClick,
    height = 12,
    isLoading = false,
    variant = 'primary',
    fillColor = '#000',
    scale = false,
    loaded = true,
    ...props
}: ButtonProps) => {
    return (
        // <button
        //     {...props}
        //     className={clsx(
        //         'w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-small-regular border transition-colors duration-200 disabled:opacity-50',
        //         {
        //             'text-white bg-gray-900 border-gray-900 hover:bg-white hover:text-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white':
        //                 variant === 'primary',
        //             'text-gray-900 bg-transparent border-gray-920 hover:bg-gray-100':
        //                 variant === 'secondary',
        //         },
        //         className
        //     )}
        // >
        //     {isLoading ? <Spinner /> : children}
        // </button>
        <ButtonBestia
            {...props}
            onClick={onClick}
            scale={scale}
            className={className}
            loaded={!isLoading}
            height={height}
            fillColor={fillColor}
            label={isLoading ? <Spinner /> : children}
        />
    )
}

export default Button
