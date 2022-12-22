import React, { Children, createRef, useEffect } from 'react'
import { Box, BoxProps, chakra, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Flipped } from 'react-flip-toolkit'

//@ts-ignore
const MotionFlex = motion<BoxProps>(Flex)

interface ContainerProps {
    children: React.ReactNode
    animate: boolean
    duration: number
}

type OneOrTheOther = any | null

interface EL {
    el?: OneOrTheOther
}

const getFirstDropdownSectionHeight = ({ el }: EL) => {
    console.log(el)
    if (
        !el ||
        !el.querySelector ||
        !el.querySelector('*[data-first-dropdown-section]')
    )
        return 0
    return el.querySelector('*[data-first-dropdown-section]').offsetHeight
}

const updateAltBackground = ({
    altBackground,
    prevDropdown,
    currentDropdown,
}: {
    altBackground: any
    prevDropdown: any
    currentDropdown: any
}) => {
    const prevHeight = getFirstDropdownSectionHeight(prevDropdown || {})
    const currentHeight = getFirstDropdownSectionHeight(currentDropdown || {})

    const immediateSetTranslateY = (
        el: any,
        translateY: number,
    ) => {
        el.style.transform = `translateY(${translateY}px)`
        el.style.transition = 'transform 0s'
        requestAnimationFrame(() => (el.style.transitionDuration = ''))
    }

    if (prevHeight) {
        // transition the grey ("alt") background from its previous height to its current height
        immediateSetTranslateY(altBackground, prevHeight)
        requestAnimationFrame(() => {
            altBackground.style.transform = `translateY(${currentHeight}px)`
        })
    } else {
        // just immediately set the background to the appropriate height
        // since we don't have a stored value
        immediateSetTranslateY(altBackground, currentHeight)
    }
}

export const Container: React.FC<ContainerProps> = ({
    children,
    animate,
    duration,
}) => {
    const [currentDropdown, prevDropdown] = Children.toArray(children)
    let altBackgroundEl = React.useRef()
    let prevDropdownEl = React.useRef()
    let currentDropdownEl = React.useRef()

    useEffect(() => {
        updateAltBackground({
            altBackground: altBackgroundEl,
            prevDropdown: prevDropdownEl.current,
            currentDropdown: currentDropdownEl.current,
        })
    }, [])

    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = React.useRef()
    const previousRef = React.useRef()
    const currentRef = React.useRef()

    const Animation = {
        inital: {
            transform: 'rotateX(-15deg)',
            opacity: 0,
        },
        animate: {
            transform: 'rotateX(0deg)',
            opacity: 1,
            transition: {
                duration: duration,
            },
        },
        exit: {
            transform: 'rotateX(0)',
            opacity: 0,
        },
    }

    return (
        <MotionFlex
            variants={Animation}
            initial="inital"
            animate={animate ? 'animate' : 'inital'}
            sx={{ animationFillMode: 'forwards' }}
            flexDirection="column"
            top="-20px"
        >
            <Flipped flipId="dropdown-caret">
                <Box
                    borderWidth="10px"
                    borderStyle="solid"
                    borderColor="transparent transparent #181a1b"
                    zIndex="1"
                    position="relative"
                    top="1px"
                />
            </Flipped>
            <Flipped flipId="dropdown">
                <Box
                    backgroundColor="#181a1b"
                    borderRadius="4px"
                    overflow="hidden"
                    display="flex"
                    minWidth="122%"
                    position="relative"
                    left="120px"
                    boxShadow="0 50px 100px rgba(50, 50, 93, 0.1)"
                    willChange="transform"
                >
                    <Flipped inverseFlipId="dropdown">
                        <Box
                            position="relative"
                            top="0"
                            left="0"
                            sx={{
                                '&:first-of-type': {
                                    zIndex: '1',
                                },
                                '&:not(:first-of-type)': {
                                    zIndex: '-1',
                                },
                            }}
                            willChange="transform"
                        >
                            <Box
                                ref={(el: any) => (altBackgroundEl = el)}
                                backgroundColor="#181a1b"
                                width="300%"
                                height="100%"
                                position="absolute"
                                top="0"
                                left="-100%"
                                transformOrigin="0 0"
                                zIndex="0"
                                transition={`transform ${duration}m`}
                            />
                            {currentDropdown}
                        </Box>
                    </Flipped>

                    <Flipped inverseFlipId="dropdown" scale>
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            sx={{
                                '&:first-of-type': {
                                    zIndex: '1',
                                },
                                '&:not(:first-of-type)': {
                                    zIndex: '-1',
                                },
                            }}
                            willChange="transform"
                        >
                            {prevDropdown}
                        </Box>
                    </Flipped>
                </Box>
            </Flipped>
        </MotionFlex>
    )
}
