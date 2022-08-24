import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Context, ContextType } from "../Provider";
import { MdChevronRight } from "react-icons/md";

export const RightButton = (props: ButtonProps) => {
    const context = useContext(Context);

    const { setTrackIsActive, activeItem, constraint, positions, setActiveItem } =
        context as ContextType;

    const handleFocus = () => setTrackIsActive(true);

    const handleIncrementClick = () => {
        setTrackIsActive(true);
        !(activeItem === positions.length - constraint) &&
            // @ts-expect-error
            setActiveItem((prev: number) => prev + 1);
    };
    return (
        <>
            <Button
                {...props}
                className='border-blue-400'
                onClick={handleIncrementClick}
                onFocus={handleFocus}
                zIndex={2}
                minW={0}
                position='absolute'
                top='50%'
                right='72'
                borderWidth='1px'
                p='1'
            >
                <Icon as={MdChevronRight} boxSize={9} />
            </Button>
        </>
    );
};