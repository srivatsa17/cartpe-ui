import { Divider, Skeleton } from "@nextui-org/react";

import React from "react";

function CustomerReviewsSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-6 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-6 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-6 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Divider />
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-6 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-6 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-6 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Divider />
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-6 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-6 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-6 rounded-lg bg-secondary-300"></div>
            </Skeleton>
        </div>
    );
}

export default CustomerReviewsSkeleton;
