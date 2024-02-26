import React from "react";
import { Skeleton } from "@nextui-org/react";

function OrderDetailsSkeleton() {
    return (
        <div className="container mx-auto px-6 py-7">
            <div className="space-y-6">
                <Skeleton className="w-1/3 rounded-lg">
                    <div className="h-6 rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="w-1/3 rounded-lg">
                    <div className="h-10 rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="w-1/3 rounded-lg">
                    <div className="h-6 rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg mb-5">
                    <div className="h-96 bg-default-300"></div>
                </Skeleton>
            </div>
        </div>
    );
}

export default OrderDetailsSkeleton;
