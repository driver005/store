import { chakra, keyframes, Skeleton } from '@chakra-ui/react'
import { ButtonProps } from '../utils'

const MoveScaleUpInitial = keyframes`
    to {
		transform: translate3d(0,-105%,0) scale3d(1,2,1);
		opacity: 0;
	}
`

const MoveScaleUpEnd = keyframes`
    from {
		transform: translate3d(0,100%,0) scale3d(1,2,1);
		opacity: 0;
	}
	to {
		transform: translate3d(0,0,0);
		opacity: 1;
	}
`

export const ButtonCalypso: React.FC<ButtonProps> = ({
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
                h={height ? height : 'full'}
                type={type}
                onClick={onClick}
                className={className}
                sx={{
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    background: '#e7e7e7',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    margin: '0',
                    position: 'relative',
                    display: 'inline-block',
                    overflow: 'hidden',
                    fontFamily: 'freight-display-pro, serif',
                    fontSize: '1.15rem',
                    borderRadius: '0.85rem',
                    color: '#fff',
                    '&:hover span': {
                        animation: `${MoveScaleUpInitial} 0.3s forwards, ${MoveScaleUpEnd} 0.3s forwards 0.3s`,
                    },
                    '&::before': {
                        content: "''",
                        background: '#000',
                        width: '120%',
                        height: '0',
                        paddingBottom: '120%',
                        top: '-70%',
                        left: '-10%',
                        borderRadius: '50%',
                        transform: 'translate3d(0,68%,0) scale3d(0,0,0)',
                        position: 'absolute',
                    },
                    '&:hover::before': {
                        transform: 'translate3d(0,0,0) scale3d(1,1,1)',
                        transition:
                            'transform 0.4s cubic-bezier(0.1, 0, 0.3, 1)',
                    },
                    '&::after': {
                        content: "''",
                        background: '#000',
                        transform: 'translate3d(0,-100%,0)',
                        transition:
                            'transform 0.4s cubic-bezier(0.1, 0, 0.3, 1)',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                    },
                    '&:hover::after': {
                        transform: 'translate3d(0,0,0)',
                        transitionDuration: '0.05s',
                        transitionDelay: '0.4s',
                        transitionTimingFunction: 'linear',
                    },
                }}
            >
                <chakra.span
                    sx={{
                        display: 'block',
                        position: 'relative',
                        mixBlendMode: 'difference',
                        zIndex: '10',
                    }}
                >
                    {label}
                </chakra.span>
            </chakra.button>
        </Skeleton>
    )
}
