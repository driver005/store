import { Flex, Text, Box } from '@chakra-ui/react'
import { Background, Name, Cursor } from '@section/welcome'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEffectOnce } from 'react-use';


interface TrailImageProps {
    perspective: number;
    totalTrailElements: number;
    startReset: boolean;
    tweenTarget: any;
}


const TrailImage: React.FC<TrailImageProps> = ({
    perspective,
    totalTrailElements,
    startReset,
    tweenTarget
}) => {
    const [bgImage, setBgImage] = useState('')

    const layout = useCallback(() => {
        // Remove the background image from the main element
        tweenTarget.current.style.backgroundImage = 'none';

        let innerHTML = '';
        for (let i = 0; i <= totalTrailElements - 1; ++i) {
            const opacityVal = i === totalTrailElements - 1 ? 1 : 0.8;//1/totalTrailElements * i + 1/totalTrailElements
            innerHTML += `<img class="trail__img" src="${bgImage}" style="opacity: ${opacityVal}"/>`;
        }
        // Append to the main element
        tweenTarget.current.innerHTML = innerHTML;

        // Get inner .trail__img elements
        // this.DOM.trailElems = tweenTarget.current.querySelectorAll('.trail__img');

        tweenTarget.current.classList.add('trail');
    }, [bgImage, totalTrailElements, tweenTarget])

    const reset = useCallback(() => {
        tweenTarget.current.classList.remove('trail');
        tweenTarget.current.style.backgroundImage = `url(${bgImage})`;
        tweenTarget.current.innerHTML = '';
        if (perspective) {
            tweenTarget.current.style.perspective = 'none';
        }
    }, [bgImage, perspective, tweenTarget])

    useEffectOnce(() => {
        if (tweenTarget.current.style.backgroundImage !== 'none') {
            setBgImage(/(?:\(['"]?)(.*?)(?:['"]?\))/.exec(tweenTarget.current.style.backgroundImage)![1])
        }
    })

    useEffect(() => {
        layout()
    }, [bgImage, layout])

    useEffect(() => {
        if (tweenTarget.current && perspective) {
            tweenTarget.current.style.perspective = `${perspective}px`;
        }
    }, [tweenTarget, perspective])


    useEffect(() => {
        if (startReset) {
            reset()
        }

    }, [reset, startReset])

    return (
        <Box
            className='intro-image'
            sx={{
                position: 'relative',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                gridArea: '1 / 1 / -1 / -1',
                justifySelf: 'end',
                '--img-height': '260px',
                height: 'var(--img-height)',
                width: 'calc( 1 / 1.5 * var(--img-height))',
                '& > .trail__img': {
                    width: 'full',
                    height: 'full',
                    position: 'relative',
                    willChange: 'transform',
                    gridArea: '1 / 1 / 2 / 2',
                },
                '&.trail': {
                    position: 'relative',
                    display: 'grid',
                    placeItems: 'center',
                }
            }}
            style={{ backgroundImage: 'url(1.jpg)' }}
            ref={tweenTarget}
        />
    )
}

export default TrailImage