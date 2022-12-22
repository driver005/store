import { Box, Flex, Grid, Heading } from '@chakra-ui/react'
import { LineItem, Region } from '@medusajs/medusa'
import { ProductItem } from '@section/store'

type ItemsProps = {
    items?: Omit<LineItem, 'beforeInsert'>[]
    region?: Region
}

const Items = ({ items, region }: ItemsProps) => {
    return (
        <Box>
            <Flex
                borderBottomWidth="1px"
                borderColor="gray.200"
                pb="3"
                alignItems="center"
            >
                <Heading fontSize="2xl" fontWeight="semibold">
                    Shopping Bag
                </Heading>
            </Flex>
            <Grid
                gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                rowGap="8"
                py="8"
            >
                {items && region
                    ? items
                          .sort((a, b) => {
                              return a.created_at > b.created_at ? -1 : 1
                          })
                          .map((item) => {
                              return (
                                  <ProductItem
                                      key={item.id}
                                      item={item}
                                      region={region}
                                  />
                              )
                          })
                    : Array.from(Array(5).keys()).map((i) => {
                          return <div key={i} />
                      })}
            </Grid>
        </Box>
    )
}

export default Items
