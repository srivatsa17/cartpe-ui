import { Divider, Skeleton, Spacer } from "@nextui-org/react";

import React from "react";

function FiltersSkeleton() {
    return (
        <div>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                    <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                        </Skeleton>
                    </div>
                    <Spacer y={3} />
                    <Divider className="w-11/12 xs:w-full mb-3" />
                </div>
            ))}
        </div>
    );
}

export default FiltersSkeleton;
