import { chakra } from "@chakra-ui/react";
import Link from "next/link";
import { LinkProps } from "./utils";

export const LinkMetis: React.FC<LinkProps> = ({ link, label, icon, size = 18, active = false, bold = false, isHoverBold = false, replace = false, onClick, onMouseEnter }) => {
    return (
        <Link
            href={link}
            replace={replace}
            passHref
        >
            <chakra.a
                className={`${active && 'text-blue-700'}`}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                sx={{
                    'fontFamily': 'halyard-display, sans-serif',
                    'cursor': 'pointer',
                    'fontSize': `${size}px`,
                    'fontWeight': `${bold ? '600' : '400'}`,
                    'position': 'relative',
                    'whiteSpace': 'nowrap',
                    '&::before': {
                        'content': '""',
                        'position': 'absolute',
                        'width': '100%',
                        'height': `${(bold || isHoverBold) ? '2px' : '1px'}`,
                        'background': 'currentColor',
                        'top': '100%',
                        'left': '0',
                        'pointerEvents': 'none',
                        'transformOrigin': '100% 50%',
                        'transform': 'scale3d(0, 1, 1)',
                        'transition': `${!active && 'transform 0.3s'}`,
                    },
                    '&:hover::before': {
                        'transformOrigin': '0% 50%',
                        'transform': `${!active && 'scale3d(1, 1, 1)'}`,
                    }
                }}
            >
                {label}
                {icon}
            </chakra.a>
        </Link>
    )
};