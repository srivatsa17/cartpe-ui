import React from "react";
import { Skeleton } from "@nextui-org/react";

function OverallReviewsSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-8 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-4/6 rounded-lg">
                <div className="h-6 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-5 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-5 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-5 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-5 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-5 rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-10 rounded-lg bg-secondary-300"></div>
            </Skeleton>
        </div>
    );
}

export default OverallReviewsSkeleton;
