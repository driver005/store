import { Box, useBreakpointValue } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import Progress from './Progress'
import TrailImage from './Image'
import TrailText from './Text'
import gsap from 'gsap';
import { Flip } from "gsap/dist/Flip";
import { ButtonTextCircle } from '@components/Buttons'

const animationDefaults = {
    duration: 1.4,
    ease: 'power4'
};

interface IntroProps {
}


const Intro: React.FC<IntroProps> = ({

}) => {
    const imageSize = useBreakpointValue({ base: '360px', lg: '53vh' })
    const mainGab = useBreakpointValue({ lg: '5vw' })
    const mainP = useBreakpointValue({ base: '1rem', lg: '2.5rem 1rem 0' })
    const mainTemplate = useBreakpointValue({
        base: '"logo menu"25% ". ."25%" button-enter button-enter"1fr "frame frame"/1fr 250px',
        lg: '"logo.menu"". . ."50%".button-enter."1fr"frame frame frame"/30vw 1fr 30vw'
    })
    const wrapperRow = useBreakpointValue({ base: '4rem min-content min-content 1rem auto 1fr', lg: '32% 15% 35% 18%' })
    const wrapperArea = useBreakpointValue({ base: "'...' 'title-up' 'title-down' '...' 'image' '...'", lg: '"title-up" "title-down"  "image" "."' })
    const [state, setState] = useState({
        isAnimating: false,
        iscontentOpen: false
    })
    const [trailImage, setTrailImage]: any = useState(false)
    const [trailTextTop, setTrailTextTop]: any = useState(false)
    const [trailTextBottom, setTrailTextBottom]: any = useState(false)

    const image: any = useRef(null);
    const contentImage: any = useRef(null);
    const up: any = useRef(null);
    const down: any = useRef(null);
    const enter: any = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(Flip);
        }
    }, [])

    const showIntro = () => {
        if (state.isAnimating) {
            return false;
        }

        setState({
            isAnimating: true,
            iscontentOpen: state.iscontentOpen
        })

        gsap.timeline({
            defaults: animationDefaults,
            onComplete: () => {
                // Reset the trails structure on the texts and image
                setTrailImage(true)
                setTrailTextTop(true)
                setTrailTextBottom(true)

                setState({
                    isAnimating: false,
                    iscontentOpen: state.iscontentOpen
                })
            }
        })
            .addLabel('start', 0)
            .add(() => {
                // Let's use the gsap Flip plugin to animate the image into a new element (.intro-content__image)
                // Get state
                const state = Flip.getState(image.current.childNodes);
                // // Change place
                contentImage.current.appendChild(image.current);
                // Flip
                Flip.from(state, {
                    duration: animationDefaults.duration,
                    ease: animationDefaults.ease,
                    stagger: -0.03,
                    scale: true
                    //rotateY: 360,
                })
            }, 'start')
            // Hide the intro title trail elements initially and show its parents which are hidden by default (CSS)
            .set([up.current.childNodes, down.current.childNodes], {
                opacity: 0
            }, 'start')
            .set([up.current, down.current], {
                opacity: 1
            }, 'start')
            // Now translate the title elements
            .to(up.current.childNodes, {
                y: 0,
                startAt: { rotateY: 160, opacity: 0 },
                rotateY: 0,
                opacity: 1,
                stagger: -0.1
            }, 'start')
            .to(down.current.childNodes, {
                y: 0,
                opacity: 1,
                stagger: -0.08,
            }, 'start')
            // And show the intro enter button
            .to(enter.current, {
                startAt: { opacity: 0, scale: 0.8 },
                opacity: 1,
                scale: 1
            }, 'start+=0.3')
    };


    return (
        <Box
            w='full'
            h='full'
            display='grid'
            gridColumnGap={mainGab}
            p={mainP}
            gridTemplate={mainTemplate}
        >
            <Progress onProgressComplete={() => showIntro()} />
            <TrailImage perspective={1000} totalTrailElements={8} startReset={trailImage} tweenTarget={image} />
            <Box
                sx={{
                    height: '100%',
                    overflow: 'hidden',
                    gridArea: '1 / 1 / -1 / -1',
                    display: 'grid',
                    gridTemplateColumns: '100%',
                    justifyItems: 'center',
                }}
                gridTemplateRows={wrapperRow}
                gridTemplateAreas={wrapperArea}
            >
                <TrailText
                    perspective={1000}
                    totalTrailElements={2}
                    startReset={trailTextTop}
                    label='Zofia'
                    className='up'
                    tweenTarget={up}
                />
                <Box
                    gridArea='image'
                    alignSelf='end'
                    ref={contentImage}
                    sx={{
                        '& > .intro-image': {
                            '--img-height': `${imageSize}`
                        }
                    }}
                />
                <TrailText
                    totalTrailElements={2}
                    startReset={trailTextBottom}
                    label='Dab<em>ro</em>wski'
                    className='down'
                    tweenTarget={down}
                />
            </Box>
            <Box
                zIndex='200'
                gridArea='button-enter'
                alignSelf='start'
                justifySelf='center'
                alignItems='center'
                justifyItems='center'
                display='grid'
                position='relative'
                overflow='hidden'
                cursor='pointer'
                opacity='0'
                ref={enter}
            >
                <ButtonTextCircle
                    label='Enter Enter Enter Enter'
                    color='#dbb59b'
                />
            </Box>
        </Box>
    )
}

export default Intro