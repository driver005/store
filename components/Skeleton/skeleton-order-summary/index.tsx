import { SkeletonButton, SkeletonCartTotals } from "@components/Skeleton"

const SkeletonOrderSummary = () => {
    return (
        <div className="grid-cols-1">
            <SkeletonCartTotals header={false} />
            <div className="mt-4">
                <SkeletonButton />
            </div>
        </div>
    )
}

export default SkeletonOrderSummary
