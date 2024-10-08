import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";

import { CATEGORY_QUERY_PARAM_KEY } from "constants/queryParam";
import React from "react";
import { useFilterSearchParams } from "hooks/useFilterSearchParams";
import { useSearchParams } from "react-router-dom";

interface FilterCategories {
    uniqueCategories: string[];
}

function FilterCategories({ uniqueCategories }: FilterCategories) {
    const [queryParams, setQueryParams] = useSearchParams();
    const { filteredCategories } = useFilterSearchParams();
    const [categorySelected, setCategorySelected] = React.useState<string[]>(filteredCategories);

    const handleCategoryChange = (selectedCategories: string[]) => {
        setCategorySelected(selectedCategories);
        if (selectedCategories.length) {
            queryParams.set(CATEGORY_QUERY_PARAM_KEY, selectedCategories.join(","));
        } else {
            queryParams.delete(CATEGORY_QUERY_PARAM_KEY);
        }
        setQueryParams(queryParams);
    };

    const handleClearCategoryFilter = () => {
        setCategorySelected([]);
        queryParams.delete(CATEGORY_QUERY_PARAM_KEY);
        setQueryParams(queryParams);
    };

    return (
        <div>
            <CheckboxGroup
                label={
                    <div className="flex justify-between w-11/12">
                        <div className="uppercase font-semibold text-purple-800">Categories</div>
                        {filteredCategories.length > 0 && (
                            <Button
                                size="sm"
                                className="w-2/5"
                                variant="ghost"
                                color="danger"
                                onPress={handleClearCategoryFilter}
                            >
                                Clear Filter
                            </Button>
                        )}
                    </div>
                }
                value={categorySelected}
                onValueChange={handleCategoryChange}
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
        </div>
    );
}

export default FilterCategories;
