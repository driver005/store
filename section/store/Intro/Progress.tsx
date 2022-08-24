import { Flex, Text, Box } from '@chakra-ui/react'
import { Background, Name, Cursor } from '@section/welcome'
import { useRef } from 'react';
import { useEffectOnce } from 'react-use';

import gsap from 'gsap';


interface ProgressProps {
    onProgressComplete: any
}


const Progress: React.FC<ProgressProps> = ({
    onProgressComplete

}) => {
    let progressVal = { value: 0 };
    const tweenTarget: any = useRef(null);

    const onComplete = (onProgressComplete: any) => {
        return gsap.timeline().to(progressVal, {
            duration: 1.5,
            ease: 'steps(14)',
            value: 100,
            onUpdate: () => {
                if (tweenTarget.current) {
                    tweenTarget.current.innerHTML = Math.floor(progressVal.value) + '%'
                }
            },
            onComplete: onProgressComplete
        })
            // then hide it
            .to(tweenTarget.current, {
                duration: 0.7,
                ease: 'power3.inOut',
                opacity: 0
            });
    }

    useEffectOnce(() => {
        onComplete(onProgressComplete)
    })


    return (
        <Text
            as='span'
            sx={{
                gridArea: 'logo',
                justifySelf: 'start',
                alignSelf: 'start',
                fontSize: '10vw',
                width: '5ch',
                lineHeight: '0.5',
                fontWeight: '400',
                color: '#dbb59b',
            }}
            ref={tweenTarget}
        >
            0%
        </Text>
    )
}

export default Progress