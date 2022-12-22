import { FC, MouseEventHandler, memo } from 'react'
import cn from 'classnames'
import s from './ProductSliderControl.module.css'

interface ProductSliderControl {
    onPrev: MouseEventHandler<HTMLButtonElement>
    onNext: MouseEventHandler<HTMLButtonElement>
    color?: string
}

const ProductSliderControl: FC<ProductSliderControl> = ({
    onPrev,
    onNext,
    color = 'purple',
}) => {
    const borderColor = `border-${color}-700`
    return (
        <div
            className={cn(s.control, 'bg-white dark:bg-black dark:text-white')}
        >
            {/* <Button
            className={cn(s.leftControl, borderColor)}
            onClick={onPrev}
            aria-label="Previous Product Image"
            >
            <ArrowLeftIcon width="24" height="24" />
            </Button>
            <Button
            className={cn(s.rightControl, borderColor)}
            onClick={onNext}
            aria-label="Next Product Image"
            >
            <ArrowRightIcon width="24" height="24" />
            </Button> */}
        </div>
    )
}

export default memo(ProductSliderControl)
