import { chakra } from '@chakra-ui/react'
import { LinkProps } from './utils'

export const LinkErsa: React.FC<LinkProps> = ({ link, label }) => {
    return (
        <chakra.a
            href={link}
            sx={{
                cursor: 'pointer',
                fontSize: '18px',
                position: 'relative',
                whiteSpace: 'nowrap',
                padding: '0 10px',
                fontFamily: 'halyard-display, sans-serif',
                letterSpacing: '1px',
                textIndent: '1px',
                textTransform: 'uppercase',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    background: 'currentColor',
                    left: '0',
                    pointerEvents: 'none',
                    top: '45%',
                    height: '2px',
                    transformOrigin: '100% 50%',
                    transform: 'scale3d(0, 1, 1)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 1, 0.8, 1)',
                },
                '&:hover::before': {
                    transformOrigin: '0% 50%',
                    transform: 'scale3d(1, 1, 1)',
                },
                '&:hover span': {
                    transform: 'scale3d(1.1, 1.1, 1.1)',
                },
            }}
        >
            <chakra.span
                sx={{
                    display: 'inline-block',
                    transition: 'transform 0.3s cubic-bezier(0.4, 1, 0.8, 1)',
                }}
            >
                {label}
            </chakra.span>
        </chakra.a>
    )
}
