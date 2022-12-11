import { Box, Flex, Heading, chakra, useBreakpointValue, Checkbox } from "@chakra-ui/react"
import { StoreGetProductsParams } from "@medusajs/medusa"
import { useCollections } from "medusa-react"
import { ChangeEvent } from "react"

type ListProps = {
    refinementList: StoreGetProductsParams
    setRefinementList: (refinementList: StoreGetProductsParams) => void
}

const List = ({
    refinementList,
    setRefinementList,
}: ListProps) => {
    const { collections, isLoading } = useCollections()

    const handleCollectionChange = (
        e: ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        const { checked } = e.target

        const collectionIds = refinementList.collection_id || []

        const exists = collectionIds.includes(id)

        if (checked && !exists) {
            setRefinementList({
                ...refinementList,
                collection_id: [...collectionIds, id],
            })

            return
        }

        if (!checked && exists) {
            setRefinementList({
                ...refinementList,
                collection_id: collectionIds.filter((c) => c !== id),
            })

            return
        }

        return
    }

    const pr = useBreakpointValue({ sm: '0' })
    const pl = useBreakpointValue({ sm: '8' })
    const minW = useBreakpointValue({ sm: '250px' })
    const rowGap3 = useBreakpointValue({ sm: '3' })
    const rowGap2 = useBreakpointValue({ sm: '2' })
    const flexDirection = useBreakpointValue({ sm: 'column' })
    const display = useBreakpointValue({ base: 'flex', sm: 'grid' })
    const gridTemplateColumns = useBreakpointValue({ sm: 'repeat(2, minmax(0, 1fr))' })

    return (
        <Box>
            <Box px='8' py='4' pr={pr} pl={pl} minW={minW}>
                <Flex
                    columnGap='3'
                    flexDirection={flexDirection}
                    rowGap={rowGap3}>
                    <Heading as='h3' fontSize='medium' fontWeight='semibold' color='gray.900' mb='4'>
                        Collections
                    </Heading>
                    <chakra.ul
                        display={display}
                        fontWeight='400'
                        alignItems='center'
                        columnGap='4'
                        gridTemplateColumns={gridTemplateColumns}
                        rowGap={rowGap2}
                    >
                        {collections?.map((c) => (
                            <li key={c.id}>
                                <Checkbox
                                    defaultChecked={refinementList.collection_id?.includes(
                                        c.id
                                    )}
                                    onChange={(e) => handleCollectionChange(e, c.id)}
                                >
                                    {c.title}
                                </Checkbox>
                            </li>
                        ))}
                    </chakra.ul>
                </Flex>
            </Box>
        </Box>
    )
}

export default List
