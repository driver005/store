import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Context, ContextType } from "../Provider";
import { MdChevronLeft } from "react-icons/md";

export const LeftButton = (props: ButtonProps) => {
    const context = useContext(Context);

    const { setTrackIsActive, activeItem, positions, setActiveItem } =
        context as ContextType;

    const handleFocus = () => setTrackIsActive(true);

    const handleDecrementClick = () => {
        setTrackIsActive(true);
        !(activeItem === positions.length - positions.length) &&
            // @ts-expect-error
            setActiveItem((prev: number) => prev - 1);
    };
    return (
        <>
            <Button
                {...props}
                className='border-blue-400'
                onClick={handleDecrementClick}
                onFocus={handleFocus}
                zIndex={2}
                minW={0}
                position='absolute'
                top='50%'
                left='72'
                borderWidth='1px'
                p='1'
            >
                <Icon as={MdChevronLeft} boxSize={9} />
            </Button>
        </>
    );
};