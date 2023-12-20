import FilterCategories from "./FilterCategories";
import React from "react";

interface Filters {
    uniqueCategories: string[];
}

function Filters({ uniqueCategories }: Filters) {
    return (
        <React.Fragment>
            <FilterCategories uniqueCategories={uniqueCategories} />
        </React.Fragment>
    );
}

export default Filters;
