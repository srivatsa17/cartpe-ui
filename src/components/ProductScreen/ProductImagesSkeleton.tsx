import React from "react";
import { Skeleton } from "@nextui-org/react";

function ProductImagesSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="w-11/12 rounded-lg mb-5">
                <div className="h-96 bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-11/12 rounded-lg">
                <div className="h-32 rounded-lg bg-secondary-300"></div>
            </Skeleton>
        </div>
    );
}

export default ProductImagesSkeleton;
