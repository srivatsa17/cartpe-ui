import { Divider, Radio, RadioGroup } from "@nextui-org/react";

import React from "react";
import { useSearchParams } from "react-router-dom";

interface FilterDiscounts {
    discountRanges: string[];
}

function FilterDiscounts({ discountRanges }: FilterDiscounts) {
    const [queryParams, setQueryParams] = useSearchParams();
    const filteredDiscount = queryParams.get("discount");
    const [discountSelected, setDiscountSelected] = React.useState<string>(filteredDiscount ?? "0");

    const handleCategoryChange = (selectedDiscount: string) => {
        setDiscountSelected(selectedDiscount);
        if (selectedDiscount) {
            queryParams.set("discount", selectedDiscount);
        } else {
            queryParams.delete("discount");
        }
        setQueryParams(queryParams);
    };

    return (
        <div>
            <RadioGroup
                label="Discount Range"
                value={discountSelected}
                onValueChange={handleCategoryChange}
                classNames={{
                    label: "uppercase font-semibold text-purple-800"
                }}
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
            <Divider className="my-3 w-11/12 xs:w-full" />
        </div>
    );
}

export default FilterDiscounts;
