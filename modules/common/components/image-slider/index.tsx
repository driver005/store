import { useKeenSlider } from 'keen-slider/react'
import React, {
    Children,
    isValidElement,
    useState,
    useRef,
    useEffect,
} from 'react'
import cn from 'classnames'
import s from './index.module.css'
import "keen-slider/keen-slider.min.css"
import { Box, Flex } from '@chakra-ui/react'

interface ImageSliderProps {
    children: React.ReactNode[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({
    children,
}) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isMounted, setIsMounted] = useState(false)
    const sliderContainerRef = useRef<HTMLDivElement>(null)
    const thumbsContainerRef = useRef<HTMLDivElement>(null)


    const [ref, slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: { perView: 1 },
        created: () => setIsMounted(true),
        slideChanged(s) {
            const slideNumber = s.track.details.rel
            setCurrentSlide(slideNumber)

            if (thumbsContainerRef.current) {
                const $el = document.getElementById(`thumb-${slideNumber}`)
                if (slideNumber >= 3) {
                    thumbsContainerRef.current.scrollLeft = $el!.offsetLeft
                } else {
                    thumbsContainerRef.current.scrollLeft = 0
                }
            }
        },
    })

    // Stop the history navigation gesture on touch devices
    useEffect(() => {
        const preventNavigation = (event: TouchEvent) => {
            // Center point of the touch area
            const touchXPosition = event.touches[0].pageX
            // Size of the touch area
            const touchXRadius = event.touches[0].radiusX || 0

            // We set a threshold (10px) on both sizes of the screen,
            // if the touch area overlaps with the screen edges
            // it's likely to trigger the navigation. We prevent the
            // touchstart event in that case.
            if (
                touchXPosition - touchXRadius < 10 ||
                touchXPosition + touchXRadius > window.innerWidth - 10
            )
                event.preventDefault()
        }

        const slider = sliderContainerRef.current!

        slider.addEventListener('touchstart', preventNavigation)

        return () => {
            if (slider) {
                slider.removeEventListener('touchstart', preventNavigation)
            }
        }
    }, [])

    const onPrev = React.useCallback(() => slider.current?.prev(), [slider])
    const onNext = React.useCallback(() => slider.current?.next(), [slider])
    return (
        <Flex
            position="relative"
            w="full"
            h="full"
            userSelect="none"
            justifyContent="center"
            overflow="hidden"
            ref={sliderContainerRef}
        >
            <Box width="10%" className='hidden lg:block'>
                <Flex
                    w="full"
                    h="full"
                    flexDirection="column"
                    boxSizing="content-box"
                    whiteSpace="nowrap"
                    ref={thumbsContainerRef}
                    css={{
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    {slider &&
                        Children.map(children, (child, idx) => {
                            if (isValidElement(child)) {
                                return {
                                    ...child,
                                    props: {
                                        ...child.props,

                                        className: cn(
                                            child.props.className,
                                            s.thumb,
                                            {
                                                [s.selected]:
                                                    currentSlide === idx,
                                            }
                                        ),
                                        id: `thumb-${idx}`,
                                        onClick: () => {
                                            slider.current?.moveToIdx(idx)
                                        },
                                    },
                                }
                            }
                            return child
                        })}
                </Flex>
            </Box>
            <Box width="90%">
                <Box
                    opacity={isMounted ? 1 : 0}
                    position="relative"
                    h="full"
                    rounded="lg"
                    ref={ref}
                    className={cn(s.slider, 'keen-slider')}
                >
                    {/* {slider && (
                        <ImageSliderControl onPrev={onPrev} onNext={onNext} />
                    )} */}
                    {Children.map(children, (child) => {
                        // Add the keen-slider__slide className to children
                        if (isValidElement(child)) {
                            return {
                                ...child,
                                props: {
                                    ...child.props,
                                    className: `${child.props.className
                                        ? `${child.props.className} `
                                        : ''
                                        }keen-slider__slide`,
                                },
                            }
                        }
                        return child
                    })}
                </Box>
            </Box>
        </Flex>
    )
}

export default ImageSlider