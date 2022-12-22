export interface ButtonProps {
    label: string
    className?: string
    height?: number
    type?: 'button' | 'submit' | 'reset' | undefined
    scale?: boolean
    loaded?: boolean
    onClick?: any
    color?: string
}
