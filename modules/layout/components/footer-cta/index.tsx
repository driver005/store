import UnderlineLink from '@modules/common/components/underline-link'
import Image from 'next/image'

const FooterCTA = () => {
    return (
        <div className="bg-amber-100 w-full">
            <div className="content-container flex flex-col-reverse gap-y-8 sm:flex-row sm:items-center justify-between py-16 relative">
                <div>
                    <h3 className="text-2xl-semi">Shop the latest styles</h3>
                    <div className="mt-6">
                        <UnderlineLink href="/store">
                            Explore products
                        </UnderlineLink>
                    </div>
                </div>

                <div className="relative w-full aspect-square sm:w-[35%] sm:aspect-[28/36]">
                    <Image
                        src="/cta_three.jpg"
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0"
                    />
                </div>
            </div>
        </div>
    )
}

export default FooterCTA
