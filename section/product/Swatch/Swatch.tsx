import cn from 'classnames'
import React from 'react'
import s from './Swatch.module.css'
interface SwatchProps {
    active?: boolean
    children?: any
    className?: string
    variant?: 'size' | 'color' | string
    color?: string
    ringColor?: string
    opt?: any
    label?: string | null
}

const Swatch: React.FC<Omit<'variant'> & SwatchProps> = React.memo(
    ({
        active,
        className = '',
        color = '',
        ringColor = 'purple',
        label = null,
        variant = 'size',
        opt,
        ...props
    }) => {
        variant = variant?.toLowerCase()

        if (label) {
            label = label?.toLowerCase()
        }

        const swatchClassName = cn(
            s.swatch,
            {
                [s.color]: color,
                [s.active]: active ? active : '',
                //[s.size]: variant === 'size',
                [s.dark]: color ? isDark(color) : false,
                [s.textLabel]: !color && label && label.length > 3,
            },
            active ? `ring-${ringColor}-600 dark:ring-offset-black` : '',
            "dark:border-0",
            className
        )

        return (
            <div>test</div>
            //@ts-ignore
            // <RadioGroup.Option
            //     aria-label="Variant Swatch"
            //     className={swatchClassName}
            //     value={opt}
            //     {...(label && color && { title: label })}
            //     style={color ? { backgroundColor: color } : {}}
            //     {...props}
            // >
            //     {color && active && (
            //         <span>
            //             <CheckIcon width="24" height="24" />
            //         </span>
            //     )}
            //     {!color ? label : null}
            // </RadioGroup.Option>
        )
    }
)

export default Swatch
