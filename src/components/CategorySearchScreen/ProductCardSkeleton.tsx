import { Card, Divider, Skeleton } from "@nextui-org/react";

import React from "react";

function ProductCardSkeleton() {
    return (
        <Card className="max-w-[320px] max-h-[450px] space-y-5 p-4" radius="lg">
            <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                </Skeleton>
            </div>
            <Skeleton className="rounded-lg">
                <div className="h-72 rounded-lg bg-secondary"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-full rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                </Skeleton>
            </div>
            <Divider />
            <div className="space-y-3">
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                </Skeleton>
            </div>
        </Card>
    );
}

export default ProductCardSkeleton;
