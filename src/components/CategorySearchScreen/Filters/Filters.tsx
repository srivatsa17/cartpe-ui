import { Divider } from "@nextui-org/react";
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
            <Divider className="my-3 w-11/12 xs:w-full" />
            <FilterBrands uniqueBrands={uniqueBrands} />
            <Divider className="my-3 w-11/12 xs:w-full" />
            <FilterDiscounts discountRanges={discountRanges} />
            <Divider className="my-3 w-11/12 xs:w-full" />
            <FilterPrice priceRange={priceRange} />
            <Divider className="my-5 w-11/12 xs:w-full" />
        </React.Fragment>
    );
}

export default Filters;
