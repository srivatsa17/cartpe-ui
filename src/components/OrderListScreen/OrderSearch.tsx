import { Input } from "@nextui-org/react";
import { ORDER_SEARCH } from "constants/queryParam";
import React from "react";
import { SearchIcon } from "icons/SearchIcon";
import { debounce } from "lodash";
import { useSearchParams } from "react-router-dom";

function OrderSearch() {
    const [queryParams, setQueryParams] = useSearchParams();
    const [searchedOrder, setSearchedOrder] = React.useState<string>(
        queryParams.get(ORDER_SEARCH) || ""
    );

    // Search after 500ms of user typing.
    const debouncedSearch = React.useMemo(() => {
        const performSearch = (value: string) => {
            if (value === "") {
                queryParams.delete(ORDER_SEARCH);
            } else {
                queryParams.set(ORDER_SEARCH, value);
            }
            setQueryParams(queryParams);
        };

        return debounce(performSearch, 500);
    }, []);

    const handleSearchValueChange = (value: string) => {
        setSearchedOrder(value);
        debouncedSearch(value);
    };

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
                        value={searchedOrder}
                        onValueChange={handleSearchValueChange}
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
