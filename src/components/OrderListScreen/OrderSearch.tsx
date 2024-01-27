import { Input } from "@nextui-org/react";
import React from "react";
import { SearchIcon } from "icons/SearchIcon";

function OrderSearch() {
    return (
        <div className="grid xl:grid-cols-3">
            <div className="xl:col-span-2 flex justify-between">
                <div className="text-3xl">Your Orders</div>
                <div>
                    <Input
                        size="sm"
                        variant="flat"
                        radius="md"
                        placeholder="Search all orders"
                        startContent={
                            <SearchIcon
                                className="text-default-400"
                                strokeWidth={2.5}
                                height={16}
                                width={16}
                            />
                        }
                        isClearable
                        classNames={{
                            inputWrapper: "h-[40px]"
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default OrderSearch;
