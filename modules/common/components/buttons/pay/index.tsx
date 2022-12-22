import { chakra, Skeleton } from '@chakra-ui/react'
import { ButtonProps } from '../utils'

export const ButtonPay: React.FC<ButtonProps> = ({
    label,
    height,
    onClick,
    className,
    type = 'button',
    scale = true,
    loaded = true,
}) => {
    return (
        <Skeleton w="full" isLoaded={loaded} borderRadius="lg" mt="3">
            <chakra.button
                w="full"
                h={height ? height : '12'}
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
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    color: '#fff',
                    background: '#e7e7e7',
                    transition: 'all 0.2s ease',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '0',
                        height: '100%',
                        background: 'gray.900',
                        width: '120%',
                        left: '-10%',
                        transform: 'skew(30deg)',
                        transition:
                            'transform 0.4s cubic-bezier(0.3, 1, 0.8, 1)',
                    },
                    '&:hover::before': {
                        transform: 'translate3d(100%, 0, 0)',
                    },
                    '&:active': {
                        transform: `${scale ? 'scale(0.98)' : 'scale(1)'}`,
                    },
                }}
            >
                <chakra.span
                    sx={{
                        position: 'relative',
                        mixBlendMode: 'difference',
                    }}
                >
                    {label}
                </chakra.span>
            </chakra.button>
        </Skeleton>
    )
}
