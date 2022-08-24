import { Flex, Text, Box } from '@chakra-ui/react'
import { Background, Name, Cursor } from '@section/welcome'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEffectOnce } from 'react-use';


interface TrailTextProps {
    perspective?: number;
    totalTrailElements: number;
    startReset: boolean;
    className: 'up' | 'down';
    label: string;
    tweenTarget: any;
}


const TrailText: React.FC<TrailTextProps> = ({
    perspective,
    totalTrailElements,
    startReset,
    className,
    label,
    tweenTarget,
}) => {

    const layout = useCallback(() => {
        let innerHTML = '';
        for (let i = 0; i <= totalTrailElements - 1; ++i) {
            const opacityVal = i === totalTrailElements - 1 ? 1 : 1 / totalTrailElements * i + 1 / totalTrailElements
            innerHTML += `<span class="trail__text" style="opacity: ${opacityVal}">${label}</span>`;
        }
        // Append to the main element
        tweenTarget.current.innerHTML = innerHTML;

        tweenTarget.current.classList.add('trail');
    }, [totalTrailElements, tweenTarget, label])

    const reset = useCallback(() => {
        tweenTarget.current.classList.remove('trail');
        tweenTarget.current.innerHTML = label;
        if (perspective) {
            tweenTarget.current.style.perspective = 'none';
        }

    }, [perspective, tweenTarget, label])

    useEffectOnce(() => {
        if (tweenTarget.current) {
            layout()
        }
    })

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
            className={className}
            sx={{
                fontSize: 'clamp(1.5rem,22vh,14vw)',
                lineHeight: '0.9',
                position: 'relative',
                color: '#dbb59b',
                whiteSpace: 'nowrap',
                willChange: 'transform',
                '&.up': {
                    fontFamily: 'kudryashev-d-excontrast-sans, sans-serif',
                    fontWeight: '300',
                    gridArea: 'title-up',
                    alignSelf: 'end',
                    opacity: 0,
                },
                '&.down': {
                    textTransform: 'uppercase',
                    gridArea: 'title-down',
                    opacity: '0',
                },
                '& > .trail__text': {
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
                },
                '&.up > .trail__text': {
                    transform: 'translateY(-14vh)',
                },
                '&.down > .trail__text': {
                    transform: 'translateY(18vh)',
                },
            }}
            ref={tweenTarget}
        >
            {label}
        </Box>

    )
}

export default TrailText