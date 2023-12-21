import { Checkbox, CheckboxGroup, Divider } from "@nextui-org/react";

import React from "react";
import { useSearchParams } from "react-router-dom";

interface FilterBrands {
    uniqueBrands: string[];
}

function FilterBrands({ uniqueBrands }: FilterBrands) {
    const [queryParams, setQueryParams] = useSearchParams();
    const filteredBrands = queryParams.get("brands")?.split(",");
    const [brandsSelected, setBrandsSelected] = React.useState<string[]>(filteredBrands ?? []);

    const handleBrandsChange = (selectedBrands: string[]) => {
        setBrandsSelected(selectedBrands);
        if (selectedBrands.length) {
            queryParams.set("brands", selectedBrands.join(","));
        } else {
            queryParams.delete("brands");
        }
        setQueryParams(queryParams);
    };

    return (
        <div>
            <CheckboxGroup
                label="brands"
                value={brandsSelected}
                onValueChange={handleBrandsChange}
                classNames={{
                    label: "uppercase font-semibold text-purple-800"
                }}
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
            <Divider className="my-3 w-11/12 xs:w-full" />
        </div>
    );
}

export default FilterBrands;
