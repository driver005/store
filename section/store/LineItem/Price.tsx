import { Flex, HStack, Text } from "@chakra-ui/react"
import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { Region } from "@medusajs/medusa"
import clsx from "classnames"
import { formatAmount } from "medusa-react"
import { CalculatedVariant } from "types/medusa"

type LineItemPriceProps = {
    variant: CalculatedVariant
    region: Region
    quantity: number
    style?: "default" | "tight"
}

const LineItemPrice = ({
    variant,
    region,
    quantity,
    style = "default",
}: LineItemPriceProps) => {
    const hasReducedPrice = variant.calculated_price < variant.original_price

    return (
        <Flex flexDirection='column' fontSize='medium' color='green.700' textAlign='right'>
            <Text
                as='span'
                fontWeight='400'
                className={`${hasReducedPrice && 'text-rose-600'}`}
            >
                {formatAmount({
                    amount: variant.calculated_price * quantity,
                    region: region,
                    includeTaxes: false,
                })}
            </Text>
            {hasReducedPrice && (
                <HStack>
                    <Text>
                        {style === "default" && (
                            <span className="text-gray-500">Original: </span>
                        )}
                        <span className="line-through">
                            {formatAmount({
                                amount: variant.original_price * quantity,
                                region: region,
                                includeTaxes: false,
                            })}
                        </span>
                    </Text>
                    {style === "default" && (
                        <span className="text-rose-600">
                            -
                            {getPercentageDiff(
                                variant.original_price,
                                variant.calculated_price
                            )}
                            %
                        </span>
                    )}
                </HStack>
            )}
        </Flex>
    )
}

export default LineItemPrice
