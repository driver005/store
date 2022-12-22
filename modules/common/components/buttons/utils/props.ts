import React from "react"

export type ButtonProps = {
    label: string | React.ReactNode
    height?: number | string
    scale?: boolean
    loaded?: boolean
    color?: string
    fillColor?: string 
} & React.ButtonHTMLAttributes<HTMLButtonElement>
