import { Button } from "@chakra-ui/react"
import { Cart } from "@medusajs/medusa"
import { CartTotals } from "@section/store"
import Link from "next/link"

type SummaryProps = {
    cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const Summary = ({ cart }: SummaryProps) => {
    return (
        <div className="grid grid-cols-1 gap-y-6">
            <CartTotals cart={cart} />
            <Link href="/checkout">
                <a>
                    <Button>Go to checkout</Button>
                </a>
            </Link>
        </div>
    )
}

export default Summary
