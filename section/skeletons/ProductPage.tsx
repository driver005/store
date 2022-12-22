import { SkeletonButton, SkeletonProductTabs } from '@components/Skeleton'
import repeat from '@lib/util/repeat'

const SkeletonProductPage = () => {
    return (
        <div>
            <div className="content-container flex flex-col sm:flex-row sm:items-start py-6 relative">
                <div className="flex flex-col gap-y-8 w-full">
                    <div className="flex items-start relative">
                        <div className="hidden sm:flex flex-col gap-y-4 sticky top-20">
                            {repeat(2).map((index) => {
                                return (
                                    <div
                                        key={index}
                                        className="h-14 w-12 bg-gray-100"
                                    ></div>
                                )
                            })}
                        </div>
                        <div className="flex flex-col flex-1 sm:mx-16 gap-y-4">
                            {repeat(2).map((index) => {
                                return (
                                    <div
                                        key={index}
                                        className="relative aspect-[29/34] w-full bg-gray-100"
                                    ></div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="sm:sticky sm:top-20 w-full py-8 sm:py-0 sm:max-w-[344px] medium:max-w-[400px] flex flex-col gap-y-12">
                    <div>
                        <div className="flex flex-col gap-y-12 lg:max-w-[500px] mx-auto">
                            <div>
                                <div className="flex flex-col gap-y-2">
                                    <div className="h-4 w-32 bg-gray-100"></div>
                                    <div className="h-12 w-52 bg-gray-100"></div>

                                    <div className="flex flex-col gap-y-2 mt-4">
                                        {repeat(4).map((index) => (
                                            <div
                                                key={index}
                                                className="h-4 w-62 bg-gray-100"
                                            ></div>
                                        ))}
                                    </div>

                                    <div className="my-8 flex flex-col gap-y-6">
                                        <div className="bg-gray-100 h-6 w-16"></div>
                                        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                                            {repeat(4).map((v) => {
                                                return (
                                                    <div
                                                        key={v}
                                                        className="bg-gray-100 w-[50px] h-[50px]"
                                                    ></div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="bg-gray-100 h-9 w-20"></div>
                                    </div>

                                    <SkeletonButton />
                                </div>
                            </div>
                        </div>
                    </div>
                    <SkeletonProductTabs />
                </div>
            </div>
        </div>
    )
}

export default SkeletonProductPage
