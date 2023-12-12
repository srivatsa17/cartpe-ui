import { Autocomplete, AutocompleteItem, Link } from "@nextui-org/react";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import { Category } from "utils/types";
import React from "react";
import { SearchIcon } from "icons/SearchIcon";
import { debounce } from "lodash";
import { getSearchedCategories } from "redux/ProductService/searchedCategorySlice";

type FieldState = {
    selectedKey: string | number | null;
    inputValue: string;
    items: Array<Category> | [];
};

function SearchBar() {
    const dispatch = useReduxDispatch();
    const categoryList = useReduxSelector((state) => state.searchedCategories);
    const { categories, isLoading } = categoryList;

    const [fieldState, setFieldState] = React.useState<FieldState>({
        selectedKey: null,
        inputValue: "",
        items: categories
    });

    const debouncedSendRequest = React.useMemo(() => {
        const sendRequest = (searchText: string) => {
            dispatch(getSearchedCategories(searchText));
        };

        return debounce(sendRequest, 500);
    }, []);

    const onInputChange = (value: string) => {
        setFieldState((prevState) => ({
            inputValue: value,
            selectedKey: value === "" ? null : prevState.selectedKey,
            items: value.trim().length > 2 ? categories : []
        }));

        if (value.trim().length > 2) {
            debouncedSendRequest(value.trim());
        }
    };

    const onSelectionChange = (key: string | number | null) => {
        setFieldState((prevState) => {
            const selectedItem = prevState.items?.find((option) => option.name === key);
            return {
                inputValue: selectedItem?.name || "",
                selectedKey: key,
                items: categories
            };
        });
    };

    React.useEffect(() => {
        setFieldState((prevState) => ({
            ...prevState,
            items: categories
        }));
    }, [categories, fieldState.inputValue]);

    return (
        <Autocomplete
            classNames={{
                base: "max-w-sm",
                listboxWrapper: "max-h-[320px]"
            }}
            menuTrigger="input"
            aria-label="Search a product"
            placeholder="Type to search..."
            inputValue={fieldState.inputValue}
            items={fieldState.items || []}
            selectedKey={fieldState.selectedKey}
            isLoading={isLoading}
            onInputChange={onInputChange}
            onSelectionChange={onSelectionChange}
            inputProps={{
                classNames: {
                    input: "ml-1",
                    inputWrapper: "h-[40px]"
                }
            }}
            listboxProps={{
                hideSelectedIcon: false,
                itemClasses: {
                    base: [
                        "rounded-medium",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[hover=true]:bg-default-200",
                        "data-[selectable=true]:focus:bg-default-100",
                        "data-[focus-visible=true]:ring-default-500"
                    ]
                },
                hideEmptyContent: false
            }}
            popoverProps={{
                offset: 10,
                classNames: {
                    base: "rounded-large",
                    content: "p-1 border-small border-default-100 bg-background"
                }
            }}
            startContent={
                <SearchIcon
                    className="text-default-400"
                    strokeWidth={2.5}
                    size={20}
                    width={24}
                    height={24}
                />
            }
            variant="flat"
        >
            {(category) => (
                <AutocompleteItem
                    key={category.name ?? ""}
                    value={category.name}
                    className="capitalize"
                    as={Link}
                    href={`/${category.slug}?rawQuery=${category.name}`}
                >
                    {category.name}
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
}

export default SearchBar;
