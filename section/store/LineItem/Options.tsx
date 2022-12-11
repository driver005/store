import { Box } from "@chakra-ui/react"
import { ProductVariant } from "@medusajs/medusa"

type LineItemOptionsProps = { variant: ProductVariant }

const LineItemOptions = ({ variant }: LineItemOptionsProps) => {
    return (
        <Box fontSize='small' color='gray.700'>
            {variant.options.map((option) => {
                const optionName =
                    variant.product.options.find((opt) => opt.id === option.option_id)
                        ?.title || "Option"
                return (
                    <div key={option.id}>
                        <span>
                            {optionName}: {option.value}
                        </span>
                    </div>
                )
            })}
        </Box>
    )
}

export default LineItemOptions
