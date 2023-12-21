import FilterBrands from "./FilterBrands";
import FilterCategories from "./FilterCategories";
import FilterDiscounts from "./FilterDiscounts";
import FilterPrice from "./FilterPrice";
import React from "react";

interface Filters {
    uniqueCategories: string[];
    uniqueBrands: string[];
    discountRanges: string[];
    priceRange: { maxPrice: number; minPrice: number };
}

function Filters({ uniqueCategories, uniqueBrands, discountRanges, priceRange }: Filters) {
    return (
        <React.Fragment>
            <FilterCategories uniqueCategories={uniqueCategories} />
            <FilterBrands uniqueBrands={uniqueBrands} />
            <FilterDiscounts discountRanges={discountRanges} />
            <FilterPrice priceRange={priceRange} />
        </React.Fragment>
    );
}

export default Filters;
