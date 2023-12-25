import { BreadcrumbItem, Breadcrumbs, Divider, Spacer } from "@nextui-org/react";
import { CATEGORY_SCREEN, HOME_SCREEN } from "constants/routes";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import FilterAppliedChips from "components/CategorySearchScreen/Filters/FilterAppliedChips";
import Filters from "components/CategorySearchScreen/Filters/Filters";
import { Product } from "utils/types";
import ProductCard from "components/CategorySearchScreen/ProductCard";
import React from "react";
import SortBy from "components/CategorySearchScreen/SortBy";
import { getProducts } from "redux/ProductService/productsSlice";
import { getUniqueFilterValues } from "utils/getUniqueFilterValues";
import { parseISO } from "date-fns";
import { useFilterSearchParams } from "hooks/useFilterSearchParams";

function CategorySearchScreen() {
    const dispatch = useReduxDispatch();
    const productList = useReduxSelector((state) => state.productList);
    const { products } = productList;

    const { uniqueCategories, uniqueBrands, discountRanges, priceRange } = getUniqueFilterValues(
        products ?? []
    );
    const {
        searchedCategory,
        filteredCategories,
        filteredBrands,
        filteredDiscount,
        filteredPriceRange,
        sortBy
    } = useFilterSearchParams();

    React.useEffect(() => {
        dispatch(getProducts(searchedCategory));
    }, [dispatch, searchedCategory]);

    const handleFilterCategories = (product: Product) => {
        return filteredCategories.length > 0 ? filteredCategories.includes(product.category) : true;
    };

    const handleFilterBrands = (product: Product) => {
        return filteredBrands.length > 0 ? filteredBrands.includes(product.brand) : true;
    };

    const handleFilterDiscount = (product: Product) => {
        if (product.discount !== undefined && typeof product.discount === "number") {
            return filteredDiscount ? product.discount >= +filteredDiscount : true;
        }
        return false;
    };

    const handleFilterPriceRanges = (product: Product) => {
        if (product.selling_price !== undefined && typeof product.selling_price === "number") {
            return filteredPriceRange
                ? product.selling_price >= +filteredPriceRange[0] &&
                      product.selling_price <= +filteredPriceRange[1]
                : true;
        }
        return false;
    };

    const getLocalDateString = (dateTimeISO: string) => {
        // Convert 2023-05-15T19:34:16.420932+05:30 -> 15/5/2023 -> [15, 5, 2023] -> [2023, 5, 15] -> 2023515
        return parseISO(dateTimeISO).toLocaleDateString().split("/").reverse().join("");
    };

    const handleSort = (a: Product, b: Product) => {
        switch (sortBy) {
            // Add cases for customer-rating, popularity
            case "whats-new":
                if (getLocalDateString(b.created_at) > getLocalDateString(a.created_at)) return 1;
                else if (getLocalDateString(b.created_at) < getLocalDateString(a.created_at))
                    return -1;
                else return 0;
            case "better-discount":
                return b.discount - a.discount;
            case "price-high-to-low":
                return b.selling_price - a.selling_price;
            case "price-low-to-high":
                return a.selling_price - b.selling_price;
            default:
                return a.name.localeCompare(b.name);
        }
    };

    const filteredAndSortedProducts = products
        ?.filter(handleFilterCategories)
        .filter(handleFilterBrands)
        .filter(handleFilterDiscount)
        .filter(handleFilterPriceRanges)
        .sort(handleSort);

    return (
        <div className="container mx-auto px-6 py-7">
            <Breadcrumbs className="mb-3" size="lg">
                <BreadcrumbItem href={HOME_SCREEN}>Home</BreadcrumbItem>
                <BreadcrumbItem href={CATEGORY_SCREEN}>Categories</BreadcrumbItem>
                <BreadcrumbItem isCurrent isLast>
                    {searchedCategory}
                </BreadcrumbItem>
            </Breadcrumbs>
            <div className="capitalize font-semibold text-lg">
                {searchedCategory} - {filteredAndSortedProducts.length} items
            </div>
            <Spacer y={3} />
            <div className="grid grid-cols-3">
                <div className="sm:col-span-2 col-span-1">
                    <div className="uppercase font-semibold text-lg">Filters</div>
                </div>
                <div className="xs:col-span-2 justify-self-end">
                    <SortBy />
                </div>
            </div>
            <FilterAppliedChips />
            <Spacer y={4} />
            <Divider />
            <div className="flex flex-wrap">
                <div className="xs:w-full sm:w-2/5 md:w-2/5 lg:w-1/4 py-5">
                    <Filters
                        uniqueCategories={uniqueCategories}
                        uniqueBrands={uniqueBrands}
                        discountRanges={discountRanges}
                        priceRange={priceRange}
                    />
                </div>
                <div className="py-5 xs:w-full sm:w-3/5 md:w-3/5 lg:w-3/4 grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7">
                    {filteredAndSortedProducts?.map((product, index) => {
                        return (
                            <div key={index}>
                                <ProductCard product={product} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default CategorySearchScreen;
