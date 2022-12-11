import { Box, Button, Flex, Grid, Icon, Select } from "@chakra-ui/react"
import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import { Thumbnail } from "@section/product"
import { LineItemOptions, LineItemPrice } from "@section/store"
import { CgTrash } from "react-icons/cg"
import { CalculatedVariant } from "types/medusa"

type ItemProps = {
    item: Omit<LineItem, "beforeInsert">
    region: Region
}

const ProductItem = ({ item, region }: ItemProps) => {
    const { updateItem, deleteItem } = useStore()

    console.log(item.variant.inventory_quantity)

    return (
        <Grid
            gridTemplateColumns='122px 1fr'
            columnGap='4'
        >
            <Box w='122px'>
                <Thumbnail thumbnail={item.thumbnail} size="full" />
            </Box>
            <Flex
                fontWeight='400'
                flexDirection='column'
                rowGap='8'
            >
                <Flex
                    alignItems='start'
                    justifyContent='space-between'
                >
                    <Flex
                        flexDirection='column'
                        fontSize='medium'
                    >
                        <span>{item.title}</span>
                        <LineItemOptions variant={item.variant} />
                    </Flex>
                    <Select
                        value={item.quantity}
                        onChange={(value: any) =>
                            updateItem({
                                lineId: item.id,
                                quantity: parseInt(value.target.value),
                            })
                        }
                        maxH='35px'
                        w='75px'
                    >
                        {Array.from([...Array(item.variant.inventory_quantity)].keys())
                            .slice(0, 10)
                            .map((i) => {
                                const value = i + 1
                                return (
                                    <option value={value} key={i}>
                                        {value}
                                    </option>
                                )
                            })}
                    </Select>
                </Flex>
                <Flex
                    alignItems='end'
                    justifyContent='space-between'
                    fontSize='small'
                    flex='1 1 0%'
                >
                    <Box>
                        <Button
                            leftIcon={<Icon as={CgTrash} size={14} />}
                            _hover={{
                                background: 'transparent'
                            }}
                            _active={{
                                background: 'transparent'
                            }}
                            variant='ghost'
                            fontSize='small'
                            p='0'
                            paddingInline='0'
                            height='none'
                            onClick={() => deleteItem(item.id)}
                        >
                            <span>Remove</span>
                        </Button>
                    </Box>
                    <div>
                        <LineItemPrice
                            variant={item.variant as CalculatedVariant}
                            quantity={item.quantity}
                            region={region}
                        />
                    </div>
                </Flex>
            </Flex>
        </Grid>
    )
}

export default ProductItem