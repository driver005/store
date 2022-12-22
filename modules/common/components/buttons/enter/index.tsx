import { chakra, keyframes, Skeleton } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'
import { ButtonProps } from '../utils'

const rotateIt = keyframes`
    to {
            transform: rotate(-360deg);
    }
`

const blinkHide = keyframes`
    0% {
		opacity: 0;
	}
	10% {
		opacity: 1;
	}
`

const blinkShow = keyframes`
    0% {
		opacity: 1;
	}
	10% {
		opacity: 0;
	}
`

export const ButtonTextCircle: React.FC<ButtonProps> = ({
    label,
    height,
    onClick,
    className,
    type = 'button',
    scale = true,
    loaded = true,
    color = '#000',
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
                    '-webkit-clip-path': 'circle(40% at 50% 50%)',
                    clipPath: 'circle(40% at 50% 50%)',
                    '&:hover >  .textcircle': {
                        animation: `${rotateIt} 7s linear infinite;`,
                    },
                    '&:hover > svg > .eye__lashes-up, &:hover > svg > .eye__inner, &:hover > svg > .eye__iris':
                    {
                        animation: `${blinkHide} 2s step-end infinite`,
                    },
                    '&:hover > svg > .eye__lashes-down': {
                        animation: `${blinkShow} 2s step-end infinite`,
                    },
                    '&:focus-visible': {
                        background: '#443ffc',
                    },
                }}
            >
                <chakra.svg
                    as={motion.svg}
                    position="relative"
                    display="block"
                    width="200px"
                    viewBox="0 0 500 500"
                    className="textcircle"
                    style={{ originX: '100px', originY: '100px' }}
                >
                    <chakra.title
                        fontSize="32px"
                        textTransform="uppercase"
                        fill={color}
                    >
                        {label}
                    </chakra.title>
                    <defs>
                        <path
                            id="textcircle"
                            d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
                        />
                    </defs>
                    <chakra.text
                        fontSize="32px"
                        textTransform="uppercase"
                        fill={color}
                        fontWeight="700"
                        fontFamily="acumin-pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif"
                    >
                        <chakra.textPath
                            letterSpacing="17px"
                            href="#textcircle"
                            aria-label={label}
                            textLength="900"
                        >
                            {label}
                        </chakra.textPath>
                    </chakra.text>
                </chakra.svg>
                <chakra.svg
                    aria-hidden="true"
                    viewBox="0 0 70 70"
                    xmlns="http://www.w3.org/2000/svg"
                    position="absolute"
                    zIndex="2"
                    width="60px"
                    height="60px"
                    top="calc(50% - 30px)"
                    left="calc(50% - 30px)"
                >
                    <chakra.path
                        className="eye__outer"
                        d="M10.5 35.308c5.227-7.98 14.248-13.252 24.5-13.252s19.273 5.271 24.5 13.252c-5.227 7.98-14.248 13.253-24.5 13.253s-19.273-5.272-24.5-13.253z"
                        stroke={color}
                        fill="none"
                        strokeWidth="1.5px"
                    />
                    <chakra.path
                        className="eye__lashes-up"
                        d="M35 8.802v8.836M49.537 11.383l-3.31 8.192M20.522 11.684l3.31 8.192"
                        stroke={color}
                        fill="none"
                        strokeWidth="1.5px"
                    />
                    <chakra.path
                        className="eye__lashes-down"
                        d="M35 61.818v-8.836 8.836zM49.537 59.237l-3.31-8.193 3.31 8.193zM20.522 58.936l3.31-8.193-3.31 8.193z"
                        stroke={color}
                        fill="none"
                        strokeWidth="1.5px"
                        opacity="0"
                    />
                    <circle
                        className="eye__iris"
                        cx="35"
                        cy="35.31"
                        r="5.221"
                    />
                    <chakra.circle
                        className="eye__inner"
                        cx="35"
                        cy="35.31"
                        r="10.041"
                        stroke={color}
                        fill="none"
                        strokeWidth="1.5px"
                    />
                </chakra.svg>
            </chakra.button>
        </Skeleton>
    )
}
