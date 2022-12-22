import { chakra, Skeleton } from '@chakra-ui/react'
import cn from 'classnames'
import s from './styles/Button.module.css'
import { ButtonProps } from '../utils'

export const ButtonBestia: React.FC<ButtonProps> = ({
    label,
    height,
    onClick,
    className,
    fillColor = '#000',
    type = 'button',
    scale = false,
    loaded = true,
    ...props
}) => {
    return (
        <Skeleton w="full" isLoaded={loaded} borderRadius="lg">
            <chakra.button
                {...props}
                w="full"
                h={height ? height : 12}
                type={type}
                onClick={onClick}
                className={className}
                sx={{
                    display: 'inline-block',
                    position: 'relative',
                    cursor: 'pointer',
                    border: 'none',
                    fontFamily: 'inherit',
                    pointerEvents: 'auto',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05rem',
                    fontWeight: '500',
                    fontSize: '0.75rem',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    color: `${(fillColor === '#000' || fillColor === 'black' || fillColor === '#fff' || fillColor === 'white') ? '#fff' : '#000'}`,
                    background: '#e7e7e7',
                    '&:hover': {
                        transform: `${scale && 'scale3d(1.02,1.02,1)'}`,
                    },
                    '&:hover::before': {
                        transition:
                            'transform 0.4s cubic-bezier(0.1, 0, 0.3, 1)',
                        transform: 'translate3d(-50%,-50%,0) scale3d(1,1,1)',
                    },
                    transition: 'transform 0.4s cubic-bezier(0.1, 0, 0.3, 1)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        background: fillColor,
                        width: '110%',
                        height: '0',
                        paddingBottom: '110%',
                        top: '50%',
                        left: '50%',
                        borderRadius: '50%',
                        transform: 'translate3d(-50%,-50%,0) scale3d(0,0,1)',
                    },
                }}
            >
                <chakra.span
                    sx={{
                        display: 'block',
                        position: 'relative',
                        mixBlendMode: `${(fillColor === '#000' || fillColor === 'black' || fillColor === '#fff' || fillColor === 'white') ? 'difference' : 'normal'}`,
                        paddingX: '1.25rem',
                        paddingY: '10px',
                    }}
                >
                    {label}
                </chakra.span>
            </chakra.button>
        </Skeleton>
    )
}
