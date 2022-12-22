import { chakra, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { ButtonProps } from '../utils'

export const ButtonFenrir: React.FC<ButtonProps> = ({
    label,
    onClick,
    className,
    height = 80,
    type = 'button',
    scale = true,
    loaded = true,
}) => {
    return (
        <Skeleton w="fit-content" isLoaded={loaded} borderRadius="lg">
            <chakra.button
                type={type}
                onClick={onClick}
                className={className}
                sx={{
                    display: 'inline-block',
                    position: 'relative',
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    border: 'none',
                    margin: '0',
                    padding: '0',
                    background: 'none',
                    '-webkit-clip-path': 'circle(50% at 50% 50%)',
                    clipPath: 'circle(50% at 50% 50%)',
                    width: `${height + 40}px`,
                    height: `${height + 40}px`,
                    fontFamily: 'aktiv-grotesk-extended, sans-serif',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                    '&:hover > .progress': {
                        transform: 'scale3d(1.2, 1.2, 1)',
                    },
                    '&:focus-visible > svg > .progress__circle': {
                        fill: 'rgba(252,196,63,0.4)',
                    },
                    '&:hover > svg > .progress__path': {
                        strokeDashoffset: '0',
                    },
                }}
            >
                <chakra.svg
                    className="progress"
                    aria-hidden="true"
                    viewBox="0 0 70 70"
                    position="absolute"
                    width={`${height}px`}
                    height={`${height}px`}
                    top={`calc(50% - ${height / 2}px)`}
                    left={`calc(50% - ${height / 2}px)`}
                    transition="transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)"
                >
                    <chakra.path
                        className="progress__circle"
                        d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
                        fill="none"
                        stroke="#f0f0f0"
                        strokeWidth="1px"
                    />
                    <chakra.path
                        className="progress__path"
                        d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
                        pathLength="1"
                        fill="none"
                        strokeWidth="1px"
                        stroke="#a6a6a6"
                        strokeDasharray="1"
                        strokeDashoffset="1"
                        transition="stroke-dashoffset 0.4s cubic-bezier(0.7, 0, 0.3, 1)"
                    />
                </chakra.svg>
                <chakra.span>{label}</chakra.span>
            </chakra.button>
        </Skeleton>
    )
}
