import { Box, chakra, Grid, useBreakpointValue } from '@chakra-ui/react'
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { Menu } from './utils/Menu'
import { Cover } from '@section/store'
import { Bar } from './Bar'
import { Content } from './Content'
import ReactDOM from 'react-dom'

interface HeadingProps {
    margin?: number
}

const Heading: FC<HeadingProps> = ({ margin = 16 }) => {
    const [index, setIndex] = React.useState(0)
    const [result, setResult]: any = React.useState(null)

    const menuRef: any = useRef(null)
    const contentRef: any = useRef(null)
    const wrapRef: any = useRef(null)
    const coverRef: any = useRef(null)
    const innerRef: any = useRef(null)
    const top = useBreakpointValue(
        { base: '1rem', lg: '2rem' },
        { fallback: 'lg' }
    )
    const left = useBreakpointValue(
        { base: '1rem', lg: '3rem' },
        { fallback: 'lg' }
    )
    const right = useBreakpointValue(
        { base: '1rem', lg: '3rem' },
        { fallback: 'lg' }
    )
    const bottom = useBreakpointValue(
        { base: '1rem', lg: '2rem' },
        { fallback: 'lg' }
    )
    let tl: any = null

    const menuStatus = useMemo(
        () => ({
            isOpen: false,
            isAnimating: false,
        }),
        []
    )

    useEffect(() => {
        setResult(Menu[index].links)
    }, [index])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        tl = gsap
            .timeline({
                paused: true,
                // reversed: true,
                onComplete: () => {
                    menuStatus.isAnimating = false
                },
                onReverseComplete: () => {
                    menuStatus.isAnimating = false
                },
                defaults: {
                    duration: 1.2,
                    ease: 'power4.inOut',
                },
            })
            .addLabel('start', 0)
            .add(() => {
                if (menuStatus.isOpen) {
                    menuRef.current.classList.add('menu--open')
                } else {
                    menuRef.current.classList.remove('menu--open')
                }
            }, 'start')
            .to(
                wrapRef.current,
                {
                    duration: 1.6,
                    startAt: { scale: '1.1' },
                    ease: 'power3.inOut',
                    scale: 1,
                },
                'start'
            )
            .to(
                coverRef.current,
                {
                    startAt: { y: '-100%' },
                    y: '0%',
                },
                'start'
            )
            .to(
                innerRef.current,
                {
                    startAt: { y: '100%' },
                    y: '0%',
                },
                'start'
            )
            .addLabel('menu', 0.5)
            .to(
                contentRef.current,
                {
                    duration: 1,
                    startAt: { y: '-100%' },
                    y: '0%',
                },
                'menu'
            )
            .addLabel('extra', 'menu+=0.6')
    }, [])

    // Menu expand
    const expandMenu = useCallback(() => {
        if (menuStatus.isAnimating || menuStatus.isOpen) return
        // eslint-disable-next-line react/no-find-dom-node
        var node = ReactDOM.findDOMNode(
            document.querySelector('.wrapper')
        ) as HTMLInputElement
        node.classList.add('!overflow-hidden')
        menuStatus.isAnimating = true
        menuStatus.isOpen = true
        tl.play()
    }, [menuStatus, tl])

    // Menu collapse
    const collapseMenu = useCallback(() => {
        if (menuStatus.isAnimating || !menuStatus.isOpen) return
        // eslint-disable-next-line react/no-find-dom-node
        var node = ReactDOM.findDOMNode(
            document.querySelector('.wrapper')
        ) as HTMLInputElement
        node.classList.remove('!overflow-hidden')
        menuStatus.isAnimating = true
        menuStatus.isOpen = false
        tl.reverse(0)
    }, [menuStatus, tl])

    return (
        <React.Fragment>
            <chakra.header
                position="absolute"
                overflow="hidden"
                w="100vw"
                h="100vh"
            >
                <Cover
                    coverRef={coverRef}
                    innerRef={innerRef}
                    wrapRef={wrapRef}
                />
                <Grid
                    className="menu"
                    position="absolute"
                    top={top}
                    left={left}
                    right={right}
                    bottom={bottom}
                    zIndex="100"
                    color="black"
                    templateRows="3rem 1fr"
                    templateAreas="'top' 'content'"
                    pointerEvents="none"
                    opacity="0.9"
                    ref={menuRef}
                    sx={{
                        '&.menu--open': {
                            pointerEvents: 'auto',
                        },
                    }}
                >
                    <Bar
                        expandMenu={expandMenu}
                        items={Menu}
                        setIndex={setIndex}
                    />
                    <Content
                        collapseMenu={collapseMenu}
                        contentRef={contentRef}
                        result={result}
                    />
                </Grid>
            </chakra.header>
            <Box mt="8" pb={margin} />
        </React.Fragment>
    )
}

export default Heading
