import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";

import { BRAND_QUERY_PARAM_KEY } from "constants/queryParam";
import React from "react";
import { useFilterSearchParams } from "hooks/useFilterSearchParams";
import { useSearchParams } from "react-router-dom";

interface FilterBrands {
    uniqueBrands: string[];
}

function FilterBrands({ uniqueBrands }: FilterBrands) {
    const [queryParams, setQueryParams] = useSearchParams();
    const { filteredBrands } = useFilterSearchParams();
    const [brandsSelected, setBrandsSelected] = React.useState<string[]>(filteredBrands);

    const handleBrandsChange = (selectedBrands: string[]) => {
        setBrandsSelected(selectedBrands);
        if (selectedBrands.length) {
            queryParams.set(BRAND_QUERY_PARAM_KEY, selectedBrands.join(","));
        } else {
            queryParams.delete(BRAND_QUERY_PARAM_KEY);
        }
        setQueryParams(queryParams);
    };

    const handleClearBrandsFilter = () => {
        setBrandsSelected([]);
        queryParams.delete(BRAND_QUERY_PARAM_KEY);
        setQueryParams(queryParams);
    };

    return (
        <div>
            <CheckboxGroup
                label={
                    <div className="flex justify-between w-11/12">
                        <div className="uppercase font-semibold text-purple-800">Brands</div>
                        {filteredBrands.length > 0 && (
                            <Button
                                size="sm"
                                className="w-2/5"
                                variant="ghost"
                                color="danger"
                                onClick={handleClearBrandsFilter}
                            >
                                Clear Filter
                            </Button>
                        )}
                    </div>
                }
                value={brandsSelected}
                onValueChange={handleBrandsChange}
            >
                {uniqueBrands.map((brand: string) => {
                    return (
                        <div key={brand}>
                            <Checkbox value={brand} color="secondary">
                                {brand}
                            </Checkbox>
                        </div>
                    );
                })}
            </CheckboxGroup>
        </div>
    );
}

export default FilterBrands;
