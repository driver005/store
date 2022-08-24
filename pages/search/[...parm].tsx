import { Main } from "@section/category"
import { Wrapper } from "@components/index"
import { NextPage } from "next"
import { Heading } from "@section/store"

const Search: NextPage = () => {
    return (
        <Wrapper>
            <Heading
                margin={24}
            />
            <Main />
        </Wrapper>
    )
}

export default Search