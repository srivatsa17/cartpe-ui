import { Divider, Skeleton } from "@nextui-org/react";

import React from "react";

function ProductDetailsSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-6 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-6 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Divider />
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Divider />
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Divider />
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Divider />
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-6 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Divider />
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-20 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Divider />
            <Skeleton className="w-full rounded-lg">
                <div className="h-24 rounded-lg bg-secondary-300"></div>
            </Skeleton>
        </div>
    );
}

export default ProductDetailsSkeleton;
