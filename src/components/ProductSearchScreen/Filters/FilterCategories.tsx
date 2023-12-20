import { Checkbox, CheckboxGroup, Divider } from "@nextui-org/react";

import React from "react";
import { useSearchParams } from "react-router-dom";

interface FilterCategories {
    uniqueCategories: string[];
}

function FilterCategories({ uniqueCategories }: FilterCategories) {
    const [queryParams, setQueryParams] = useSearchParams();
    const filteredCategories = queryParams.get("categories")?.split(",");
    const [categorySelected, setCategorySelected] = React.useState<string[]>(
        filteredCategories ?? []
    );

    const handleCategoryChange = (selectedCategories: string[]) => {
        setCategorySelected(selectedCategories);
        if (selectedCategories.length) {
            queryParams.set("categories", selectedCategories.join(","));
        } else {
            queryParams.delete("categories");
        }
        setQueryParams(queryParams);
    };

    return (
        <div>
            <CheckboxGroup
                label="Categories"
                value={categorySelected}
                onValueChange={handleCategoryChange}
                classNames={{
                    label: "uppercase font-semibold text-purple-800"
                }}
            >
                {uniqueCategories.map((category: string) => {
                    return (
                        <div key={category}>
                            <Checkbox value={category} color="secondary">
                                {category}
                            </Checkbox>
                        </div>
                    );
                })}
            </CheckboxGroup>
            <Divider className="my-3 w-11/12 xs:w-full" />
        </div>
    );
}

export default FilterCategories;
