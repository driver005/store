import React from "react";
import Link from "next/link";
import { Seo } from "@components/index";

const Custom404: React.VFC = () => {
    return (
        <>
            <Seo title="Not Found" description="Product not found" />
            <div className="min-h-screen bg-gray-100">

                <div className="py-10">
                    <header className="mb-4">
                        <div className="max-w-7xl mx-auto px-8">Page not found</div>
                    </header>
                    <main>
                        <div className="max-w-7xl mx-auto px-8">
                            <Link href="/">
                                <a>Go back home</a>
                            </Link>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Custom404;