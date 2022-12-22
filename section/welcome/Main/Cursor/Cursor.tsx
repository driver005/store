/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useRef } from 'react'
import { useMeasure, useMouse } from 'react-use'
import gsap from 'gsap'
import { MathUtils } from 'three'
import { mergeRefs } from 'react-merge-refs'
import { chakra, css } from '@chakra-ui/react'

const radius = 10
const size = {
    width: 100,
    height: 100,
}
let primitiveValues = { turbulence: 0 }
let renderedStyles = {
    // With interpolation, we can achieve a smooth animation effect when moving the cursor.
    // The "previous" and "current" values are the values that will interpolate.
    // The returned value will be one between these two (previous and current) at a specific increment.
    // The "amt" is the amount to interpolate.
    // As an example, the following formula calculates the x-axis translation value to apply to the cursor element:
    // this.renderedStyles['tx'].previous = lerp(this.renderedStyles['tx'].previous, this.renderedStyles['tx'].current, this.renderedStyles['tx'].amt);

    // translation, scale and opacity values
    // The lower the amt, the slower the cursor "follows" the user gesture
    tx: { previous: 0, current: 0, amt: 0.2 },
    ty: { previous: 0, current: 0, amt: 0.2 },
    // The scale and opacity will change when hovering over any element specified in [triggerSelector]
    // Defaults are 1 for both properties
    //scale: {previous: 1, current: 1, amt: 0.2},
    radius: { previous: radius, current: radius, amt: 0.2 },
    opacity: { previous: 1, current: 1, amt: 0.2 },
}

interface CursorProps {
    triger: string
}

const Cursor: React.FC<CursorProps> = ({ triger }) => {
    const cursorRef: any = useRef(null)
    const cursorInnerRef: any = useRef(null)
    const feTurbulence: any = useRef(null)
    const { docX, docY } = useMouse(cursorRef)

    const tl = useRef(
        gsap.timeline({
            paused: true,
            onStart: () => {
                if (cursorInnerRef.current) {
                    cursorInnerRef.current.style.filter = `url(#cursor-filter)`
                }
            },
            onUpdate: () => {
                if (feTurbulence.current) {
                    feTurbulence.current.setAttribute(
                        'baseFrequency',
                        primitiveValues.turbulence
                    )
                }
            },
            onComplete: () => {
                if (cursorInnerRef.current) {
                    cursorInnerRef.current.style.filter = 'none'
                }
            },
        })
    )

    const render = useCallback(() => {
        renderedStyles['tx'].current = docX - size.width / 2
        renderedStyles['ty'].current = docY - size.height / 2

        for (const key in renderedStyles) {
            renderedStyles[key as 'tx' | 'ty' | 'radius'].previous =
                MathUtils.lerp(
                    renderedStyles[key as 'tx' | 'ty' | 'radius'].previous,
                    renderedStyles[key as 'tx' | 'ty' | 'radius'].current,
                    renderedStyles[key as 'tx' | 'ty' | 'radius'].amt
                )
        }

        if (cursorRef.current && cursorInnerRef.current) {
            cursorRef.current.style.transform = `translateX(${renderedStyles['tx'].previous}px) translateY(${renderedStyles['ty'].previous}px)`
            cursorInnerRef.current.setAttribute(
                'r',
                renderedStyles['radius'].previous
            )
            cursorRef.current.style.opacity = renderedStyles['opacity'].previous
        }

        requestAnimationFrame(render)
    }, [cursorRef, cursorInnerRef, docX, docY])

    const onMouseEnter = useCallback(() => {
        renderedStyles['radius'].current = 30
        renderedStyles['opacity'].current = 1
        tl.current.restart()
    }, [tl])

    const onMouseLeave = useCallback(() => {
        renderedStyles['radius'].current = radius
        renderedStyles['opacity'].current = 1
        tl.current.progress(1).kill()
    }, [tl])

    const onMouseMove = useCallback(() => {
        renderedStyles['tx'].previous = renderedStyles['tx'].current =
            docX - size.width / 2
        renderedStyles['ty'].previous = renderedStyles['ty'].previous =
            docY - size.height / 2

        gsap.to(cursorRef.current, {
            duration: 0.8,
            ease: 'Power3.easeOut',
            opacity: 1,
        })

        requestAnimationFrame(render)
    }, [render, cursorRef, docX, docY])

    useEffect(() => {
        tl.current.to(primitiveValues, {
            duration: 3,
            ease: 'none',
            repeat: -1,
            yoyo: true,
            startAt: { turbulence: 0.15 },
            turbulence: 0.13,
        })

        window.addEventListener('mousemove', onMouseMove)

        Array.from(document.querySelectorAll(triger)).forEach((link) => {
            link.addEventListener('mouseenter', onMouseEnter)
            link.addEventListener('mouseleave', onMouseLeave)
        })

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
        }
    }, [onMouseMove, onMouseEnter, onMouseLeave, triger])

    return (
        <svg
            width={`${size.width}`}
            height={`${size.height}`}
            viewBox={`0 0 ${size.width} ${size.height}`}
            css={css({
                pointerEvents: 'none',
                zIndex: '10000',
                display: 'block',
                position: 'fixed',
                top: '0',
                left: '0',
            })}
            ref={cursorRef}
        >
            <defs>
                <filter
                    id="cursor-filter"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                    filterUnits="objectBoundingBox"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0"
                        numOctaves="1"
                        result="warp"
                        ref={feTurbulence}
                    />
                    <feOffset dx="0" result="warpOffset" />
                    <feDisplacementMap
                        xChannelSelector="R"
                        yChannelSelector="G"
                        scale="40"
                        in="SourceGraphic"
                        in2="warpOffset"
                    />
                </filter>
            </defs>
            <chakra.circle
                cx={`${size.width / 2}`}
                cy={`${size.height / 2}`}
                r={`${radius}`}
                fill="none"
                stroke="#c11"
                strokeWidth="1.3px"
                ref={cursorInnerRef}
            />
        </svg>
    )
}

export default Cursor
