import { AspectRatio, Box, Center, Divider, Flex, Grid, Heading, HStack, Icon, Image, LinkBox, LinkOverlay, Stack, Text, VStack } from '@chakra-ui/react'
import { ButtonCalypso } from '@components/Buttons';
import { Carousel, Provider, LeftButton, RightButton } from '@components/Carousel';
import { LinkHelike, LinkMetis } from '@components/Links';
import { Card, CategoryGrid, CategoryColumn, Section } from '@section/store';
import { Background, Name, Cursor } from '@section/welcome'
import { BsArrowRight } from 'react-icons/bs';

interface MainProps {
}

const Main: React.FC<MainProps> = ({ }) => {
    return (
        <Box mx='12'>
            <Section
                storeLink={'/'}
                storeLabel={'Nike'}
                link={'/'}
                label={'Start shopping'}
            />
            <CategoryColumn />
            <CategoryGrid />
        </Box >
    )
}

export default Main