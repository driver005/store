import { chakra } from '@chakra-ui/react';
import cn from 'classnames';
import s from './styles/Link.module.css'
import { LinkProps } from './utils';

export const LinkHelike: React.FC<LinkProps> = ({ link, label, size = 20 }) => {
    return (
        <chakra.a fontSize={`${size}px`} href={link} className={cn(s.linkhelike, s.link)}><span>{label}</span></chakra.a>
    )
};