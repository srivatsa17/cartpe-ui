import { Chip } from "@nextui-org/react";
import React from "react";
import { useFilterSearchParams } from "hooks/useFilterSearchParams";

function FilterAppliedChips() {
    const { filteredCategories, filteredBrands, filteredDiscount, filteredPriceRange, sortBy } =
        useFilterSearchParams();

    const filtersApplied = [];
    filtersApplied.push(...filteredCategories);
    filtersApplied.push(...filteredBrands);
    if (filteredDiscount !== "0") {
        filtersApplied.push(`${filteredDiscount}% and above`);
    }
    if (filteredPriceRange) {
        filtersApplied.push(`₹${filteredPriceRange[0]} - ₹${filteredPriceRange[1]}`);
    }
    if(sortBy) {
        filtersApplied.push(sortBy);
    }

    return (
        <div className="w-full xs:grid grid-flow-row grid-cols-2 overflow-auto my-3">
            {filtersApplied.map((filter, index) => {
                return (
                    <Chip key={index} className="my-2 mr-2 capitalize" color="secondary">
                        {filter}
                    </Chip>
                );
            })}
        </div>
    );
}

export default FilterAppliedChips;
