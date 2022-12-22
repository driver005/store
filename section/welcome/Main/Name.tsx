import { Box, Center, keyframes } from '@chakra-ui/react'
import { Text } from '@utils/index'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMountedState } from 'react-use'

const animate = keyframes`
    0%{
        fill:white;
        stroke:rgba(255,255,255,0)
    }
    15%{
        fill:rgba(255,255,255,0);
        stroke:white
    }
    
    100%{
        fill:white;
        stroke:rgba(255,255,255,0)
    }
`

interface NameProps {
    label: string
}

const Name: React.FC<NameProps> = ({ label }) => {
    const [playState, setPlayState] = useState('next')
    const [playing, setPlaying] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const isMounted = useMountedState()

    useEffect(() => {
        if (document.getElementById('svg-render')?.children.length == 0) {
            const text = new Text()
            text.init()
            text.render(
                label,
                200,
                false,
                true,
                true,
                true,
                'cm',
                '#000',
                '#000',
                '0.25mm',
                undefined
            )
        }
        setLoaded(true)
    }, [label, loaded])

    useEffect(() => {
        if (playState == 'over') {
            setPlaying(true)
        }
    }, [playState])

    return (
        <Center w="full" h="full">
            {/* <SvgText text='Aeeee' /> */}
            <Box
                as={motion.div}
                id="svg-render"
                onAnimationStartCapture={() => setPlaying(true)}
                onAnimationEndCapture={() => setPlaying(false)}
                // onAnimationComplete={() => setPlaying(false)}
                onMouseEnter={() => setPlayState('over')}
                onMouseLeave={() => setPlayState('next')}
                sx={{
                    '& path': {
                        animationName: `${playing ? animate : 'none'}`,
                        animationDuration: '1.2s',
                        animationTimingFunction: 'cubic-bezier(0.23,1,0.32,1)',
                        fill: 'white',
                        stroke: 'none',
                    },
                    '& svg > g > path:nth-of-type(1)': {
                        animationDelay: '35ms',
                    },
                    '& svg > g > path:nth-of-type(2)': {
                        animationDelay: '70ms',
                    },
                    '& svg > g > path:nth-of-type(3)': {
                        animationDelay: '105ms',
                    },
                    '& svg > g > path:nth-of-type(4)': {
                        animationDelay: '140ms',
                    },
                    '& svg > g > path:nth-of-type(5)': {
                        animationDelay: '175ms',
                    },
                    '& svg > g > path:nth-of-type(6)': {
                        animationDelay: '210ms',
                    },
                    '& svg > g > path:nth-of-type(7)': {
                        animationDelay: '245ms',
                    },
                    '& svg > g > path:nth-of-type(8)': {
                        animationDelay: '280ms',
                    },
                    '& svg > g > path:nth-of-type(9)': {
                        animationDelay: '315ms',
                    },
                    '& svg > g > path:nth-of-type(10)': {
                        animationDelay: '350ms',
                    },
                    '& svg > g > path:nth-of-type(11)': {
                        animationDelay: '385ms',
                    },
                    '& svg > g > path:nth-of-type(12)': {
                        animationDelay: '420ms',
                    },
                    '& svg > g > path:nth-of-type(13)': {
                        animationDelay: '455ms',
                    },
                    '& svg > g > path:nth-of-type(14)': {
                        animationDelay: '490ms',
                    },
                    '& svg > g > path:nth-of-type(15)': {
                        animationDelay: '525ms',
                    },
                    '& svg > g > path:nth-of-type(16)': {
                        animationDelay: '560ms',
                    },
                    '& svg > g > path:nth-of-type(17)': {
                        animationDelay: '595ms',
                    },
                    '& svg > g > path:nth-of-type(18)': {
                        animationDelay: '630ms',
                    },
                    '& svg > g > path:nth-of-type(19)': {
                        animationDelay: '665ms',
                    },
                    '& svg > g > path:nth-of-type(20)': {
                        animationDelay: '700ms',
                    },
                }}
            />
        </Center>
    )
}

export default Name
