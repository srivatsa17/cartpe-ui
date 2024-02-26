import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import ProductImagesSkeleton from "./ProductImagesSkeleton";
import React from "react";

function ProductScreenSkeleton() {
    return (
        <div className="container mx-auto px-6 py-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                <div>
                    <ProductImagesSkeleton />
                </div>
                <div>
                    <ProductDetailsSkeleton />
                </div>
            </div>
        </div>
    );
}

export default ProductScreenSkeleton;
