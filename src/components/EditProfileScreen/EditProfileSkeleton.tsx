import { Divider, Skeleton } from "@nextui-org/react";

import React from "react";

function EditProfileSkeleton() {
    return (
        <div className="grid md:grid-flow-col md:grid-cols-2 grid-flow-row items-center">
            <div className="space-y-6">
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-6 rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-8 rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Divider className="max-w-lg" />
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-10 rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-10 rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-10 rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-10 rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-10 rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-10 rounded-lg bg-secondary-300"></div>
                </Skeleton>
            </div>
            <div>
                <Skeleton className="w-full rounded-lg">
                    <div className="h-96 rounded-lg bg-secondary-300"></div>
                </Skeleton>
            </div>
        </div>
    );
}

export default EditProfileSkeleton;
