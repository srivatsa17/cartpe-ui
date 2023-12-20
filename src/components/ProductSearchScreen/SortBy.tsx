import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

import React from "react";

function SortBy() {
    const sortByItems = [
        { key: "recommended", label: "Recommended" },
        { key: "whats-new", label: "What's New" },
        { key: "popularity", label: "Popularity" },
        { key: "better-discount", label: "Better Discount" },
        { key: "price-low-to-high", label: "Price: Low to High" },
        { key: "price-high-to-low", label: "Price: High to Low" },
        { key: "customer-rating", label: "Customer Rating" }
    ];

    const [, setValue] = React.useState<string>(sortByItems[0].label);
    const [, setSelectedKey] = React.useState<string | number | null>(sortByItems[0].key);

    const onSelectionChange = (key: string | number) => {
        setSelectedKey(key);
    };

    const onInputChange = (value: string) => {
        setValue(value);
    };

    return (
        <Autocomplete
            label="Sort By"
            labelPlacement="inside"
            placeholder={sortByItems[0].label}
            className="xs:max-w-[200px] sm:max-w-xs"
            variant="bordered"
            defaultItems={sortByItems}
            defaultSelectedKey={sortByItems[0].key}
            onSelectionChange={onSelectionChange}
            onInputChange={onInputChange}
        >
            {(sortByItem) => (
                <AutocompleteItem key={sortByItem.key}>{sortByItem.label}</AutocompleteItem>
            )}
        </Autocomplete>
    );
}

export default SortBy;
