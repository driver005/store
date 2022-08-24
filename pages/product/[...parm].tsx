import { Wrapper } from "@components/index"
import { ProductView } from "@section/product"
import { Heading } from "@section/store"
import { NextPage } from "next"

const product = {
    "name": "Basic Tee 6-Pack",
    "price": "$192",
    "href": "#",
    "breadcrumbs": [
        {
            "id": 1,
            "name": "Men",
            "href": "#"
        },
        {
            "id": 2,
            "name": "Clothing",
            "href": "#"
        }
    ],
    "media": [
        {
            "src": "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
            "alt": "Two each of gray, white, and black shirts laying flat."
        },
        {
            "src": "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
            "alt": "Model wearing plain black basic tee."
        },
        {
            "src": "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
            "alt": "Model wearing plain gray basic tee."
        },
        {
            "src": "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
            "alt": "Model wearing plain white basic tee."
        }
    ],
    "options": [
        {
            "id": "option-color",
            "displayName": "Color",
            "values": [
                {
                    "label": "color",
                    "hexColors": [
                        "#222"
                    ]
                }
            ]
        },
        {
            "id": "option-size",
            "displayName": "Size",
            "values": [
                {
                    "label": "S"
                },
                {
                    "label": "M"
                },
                {
                    "label": "L"
                }
            ]
        }
    ],
    "variants": [
        {
            "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjAss=",
            "options": [
                {
                    "__typename": "MultipleChoiceOption",
                    "id": "asd",
                    "displayName": "Size",
                    "values": [
                        {
                            "label": "XL"
                        }
                    ]
                }
            ]
        }
    ],
    "sizes": [
        {
            "name": "XXS",
            "inStock": false
        },
        {
            "name": "XS",
            "inStock": true
        },
        {
            "name": "S",
            "inStock": true
        },
        {
            "name": "M",
            "inStock": true
        },
        {
            "name": "L",
            "inStock": true
        },
        {
            "name": "XL",
            "inStock": true
        },
        {
            "name": "2XL",
            "inStock": true
        },
        {
            "name": "3XL",
            "inStock": true
        }
    ],
    "description": "The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: \"Black\". Need to add an extra pop of color to your outfit? Our white tee has you covered.",
    "highlights": [
        "Hand cut and sewn locally",
        "Dyed with our proprietary colors",
        "Pre-washed & pre-shrunk",
        "Ultra-soft 100% cotton"
    ],
    "details": "The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming \"Charcoal Gray\" limited release."
}


const Search: NextPage = () => {
    return (
        <Wrapper>
            <Heading
                margin={24}
            />
            <ProductView product={product} />
        </Wrapper>
    )
}

export default Search