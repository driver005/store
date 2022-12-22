import { chakra, Skeleton, Box } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useMouse, useSetState } from 'react-use'
import { MathUtils } from 'three'
import { ButtonProps } from './utils'
import gsap from 'gsap'

const distance = (x1: number, y1: number, x2: number, y2: number) => {
    var a = x1 - x2
    var b = y1 - y2

    return Math.hypot(a, b)
}

let renderedStyles = {
    tx: { previous: 0, current: 0, amt: 0.1 },
    ty: { previous: 0, current: 0, amt: 0.1 },
    scale: { previous: 1, current: 1, amt: 0.2 },
}

export const ButtonMagnetic: React.FC<ButtonProps> = ({
    label,
    onClick,
    className,
    height = 80,
    type = 'button',
    scale = true,
    loaded = true,
}) => {
    const [hover, setHover] = useState(false)
    const button: any = useRef(null)
    const buttonDeco: any = useRef(null)
    const buttonDecoFiller: any = useRef(null)
    const buttonText: any = useRef(null)
    const buttonTextInner: any = useRef(null)
    const { docX, docY } = useMouse(button)

    const render = useCallback(() => {
        renderedStyles['tx'].current =
            (docX +
                window.scrollX -
                (button.current.getBoundingClientRect().left +
                    button.current.getBoundingClientRect().width / 2)) *
            0.3
        renderedStyles['ty'].current =
            (docY +
                window.scrollY -
                (button.current.getBoundingClientRect().top +
                    button.current.getBoundingClientRect().height / 2)) *
            0.3

        for (const key in renderedStyles) {
            renderedStyles[key as 'tx' | 'ty' | 'scale'].previous =
                MathUtils.lerp(
                    renderedStyles[key as 'tx' | 'ty' | 'scale'].previous,
                    renderedStyles[key as 'tx' | 'ty' | 'scale'].current,
                    renderedStyles[key as 'tx' | 'ty' | 'scale'].amt
                )
        }

        if (button.current && buttonText.current && buttonDeco.current) {
            button.current.style.transform = `translate3d(${renderedStyles['tx'].previous}px, ${renderedStyles['ty'].previous}px, 0)`
            buttonText.current.style.transform = `translate3d(${
                -renderedStyles['tx'].previous * 0.2
            }px, ${-renderedStyles['ty'].previous * 0.2}px, 0)`
            buttonDeco.current.style.transform = `scale(${renderedStyles['scale'].previous})`
        }

        requestAnimationFrame(render)
    }, [docX, docY])

    const onMouseEnter = useCallback(() => {
        button.current.classList.add('hover')

        renderedStyles['scale'].current = 1.3

        gsap.timeline()
            // .to(document.body, {
            //     backgroundColor: '#211c25',
            //     duration: 0.2
            // })
            .to(
                buttonDecoFiller,
                {
                    ease: 'Power3.easeOut',
                    startAt: { y: '75%' },
                    y: '0%',
                    duration: 0.5,
                },
                0
            )
            .to(buttonTextInner, {
                ease: 'Expo.easeOut',
                scale: 0.8,
                duration: 0.4,
                position: 0,
            })
        requestAnimationFrame(render)
    }, [render])

    const onMouseLeave = useCallback(() => {
        button.current.classList.remove('hover')

        renderedStyles['scale'].current = 1

        gsap.timeline()
            // .to(document.body, 0.2, { backgroundColor: bodyColor })
            .to(buttonDecoFiller, {
                ease: 'Power3.easeOut',
                y: '-75%',
                duration: 0.4,
                position: 0,
            })
            .to(buttonTextInner, {
                ease: 'Expo.easeOut',
                scale: 1,
                duration: 0.4,
                position: 0,
            })
    }, [])

    useEffect(() => {
        button.current.addEventListener('mouseenter', onMouseEnter)
        button.current.addEventListener('mouseleave', onMouseLeave)
    }, [onMouseEnter, onMouseLeave])

    return (
        <Skeleton w="fit-content" isLoaded={loaded} borderRadius="lg">
            <chakra.button
                type={type}
                onClick={onClick}
                className={className}
                ref={button}
                sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    color: '#ffffff',
                    border: '0',
                    background: 'none',
                    width: '10rem',
                    height: '10rem',
                    padding: '0',
                    margin: '1rem',
                    fontFamily: 'inherit',
                    fontSize: '1.7rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&.hover': {
                        outline: 'none',
                        borderWidth: '1px',
                        borderColor: '#ce1352',
                        color: '#ffffff',
                        background: 'transparent',
                    },
                }}
            >
                <chakra.div
                    className="button__deco"
                    sx={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        borderWidth: '1px',
                        borderColor: '#ce1352',
                        borderStyle: 'solid',
                        borderRadius: '50%',
                        background: 'transparent',
                    }}
                    ref={buttonDeco}
                >
                    <Box
                        className="button__deco-filler"
                        ref={buttonDecoFiller}
                        sx={{
                            background: '#ce1352',
                            position: 'absolute',
                            width: '150%',
                            height: '200%',
                            borderRadius: '50%',
                            top: '-50%',
                            left: '-25%',
                            transform: 'translate3d(0,75%,0)',
                        }}
                    />
                </chakra.div>
                <chakra.span
                    className="button__text"
                    sx={{
                        display: ' flex',
                        alignItems: ' center',
                        justifyContent: ' center',
                        width: ' 100%',
                        height: ' 100%',
                    }}
                    ref={buttonText}
                >
                    <chakra.span
                        className="button__text-inner"
                        sx={{
                            display: ' flex',
                            alignItems: ' center',
                            justifyContent: ' center',
                            width: ' 100%',
                            height: ' 100%',
                        }}
                        ref={buttonTextInner}
                    >
                        enter
                    </chakra.span>
                </chakra.span>
            </chakra.button>
        </Skeleton>
    )
}
