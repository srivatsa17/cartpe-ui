import { Button, Radio, RadioGroup } from "@nextui-org/react";

import { DISCOUNT_QUERY_PARAM_KEY } from "constants/queryParam";
import React from "react";
import { useFilterSearchParams } from "hooks/useFilterSearchParams";
import { useSearchParams } from "react-router-dom";

interface FilterDiscounts {
    discountRanges: string[];
}

function FilterDiscounts({ discountRanges }: FilterDiscounts) {
    const [queryParams, setQueryParams] = useSearchParams();
    const { filteredDiscount } = useFilterSearchParams();
    const [discountSelected, setDiscountSelected] = React.useState<string>(filteredDiscount);

    const handleCategoryChange = (selectedDiscount: string) => {
        setDiscountSelected(selectedDiscount);
        if (selectedDiscount) {
            queryParams.set(DISCOUNT_QUERY_PARAM_KEY, selectedDiscount);
        } else {
            queryParams.delete(DISCOUNT_QUERY_PARAM_KEY);
        }
        setQueryParams(queryParams);
    };

    const handleClearDiscountFilter = () => {
        setDiscountSelected("0");
        queryParams.delete(DISCOUNT_QUERY_PARAM_KEY);
        setQueryParams(queryParams);
    };

    return (
        <div>
            <RadioGroup
                label={
                    <div className="flex justify-between w-11/12">
                        <div className="uppercase font-semibold text-purple-800">
                            Discount Range
                        </div>
                        {filteredDiscount !== "0" && (
                            <Button
                                size="sm"
                                className="w-2/5"
                                variant="ghost"
                                color="danger"
                                onPress={handleClearDiscountFilter}
                            >
                                Clear Filter
                            </Button>
                        )}
                    </div>
                }
                value={discountSelected}
                onValueChange={handleCategoryChange}
            >
                {discountRanges.map((discount: string) => {
                    return (
                        <div key={discount}>
                            <Radio value={discount} color="secondary">
                                {discount}% and above
                            </Radio>
                        </div>
                    );
                })}
            </RadioGroup>
        </div>
    );
}

export default FilterDiscounts;
