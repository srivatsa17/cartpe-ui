import { BreadcrumbItem, Breadcrumbs, Divider, Spacer } from "@nextui-org/react";
import { CATEGORY_SCREEN, HOME_SCREEN } from "constants/routes";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import BadRequest400 from "screens/Error/BadRequest400";
import FilterAppliedChips from "components/CategorySearchScreen/Filters/FilterAppliedChips";
import Filters from "components/CategorySearchScreen/Filters/Filters";
import FiltersSkeleton from "components/CategorySearchScreen/Filters/FiltersSkeleton";
import { Product } from "utils/types";
import ProductCard from "components/CategorySearchScreen/ProductCard";
import ProductCardSkeleton from "components/CategorySearchScreen/ProductCardSkeleton";
import React from "react";
import SortBy from "components/CategorySearchScreen/SortBy";
import { getProducts } from "redux/ProductService/productsSlice";
import { getUniqueFilterValues } from "utils/getUniqueFilterValues";
import { useFilterSearchParams } from "hooks/useFilterSearchParams";

const ProductCardSkeletonList = () => {
    const skeletonList = Array.from({ length: 6 }).map((_, index) => (
        <div key={index}>
            <ProductCardSkeleton />
        </div>
    ));

    return <React.Fragment>{skeletonList}</React.Fragment>;
};

function CategorySearchScreen() {
    const dispatch = useReduxDispatch();
    const productList = useReduxSelector((state) => state.productList);
    const { products, isLoading, error } = productList;

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
        return filteredDiscount ? product.productVariants[0].discount >= +filteredDiscount : true;
    };

    const handleFilterPriceRanges = (product: Product) => {
        return filteredPriceRange
            ? product.productVariants[0].sellingPrice >= +filteredPriceRange[0] &&
                  product.productVariants[0].sellingPrice <= +filteredPriceRange[1]
            : true;
    };

    const handleSort = (a: Product, b: Product) => {
        switch (sortBy) {
            case "whats-new":
                return a.createdAt.localeCompare(b.createdAt);
            case "better-discount":
                return b.productVariants[0].discount - a.productVariants[0].discount;
            case "price-high-to-low":
                return b.productVariants[0].sellingPrice - a.productVariants[0].sellingPrice;
            case "price-low-to-high":
                return a.productVariants[0].sellingPrice - b.productVariants[0].sellingPrice;
            case "customer-rating":
                return a.ratingAverage - b.ratingAverage;
            case "popularity":
                return a.ratingCount - b.ratingCount;
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
        <>
            {error ? (
                <BadRequest400 />
            ) : (
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
                            {isLoading ? (
                                <FiltersSkeleton />
                            ) : (
                                <Filters
                                    uniqueCategories={uniqueCategories}
                                    uniqueBrands={uniqueBrands}
                                    discountRanges={discountRanges}
                                    priceRange={priceRange}
                                />
                            )}
                        </div>
                        <div className="py-5 xs:w-full sm:w-3/5 md:w-3/5 lg:w-3/4 grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7">
                            {isLoading ? (
                                <ProductCardSkeletonList />
                            ) : (
                                filteredAndSortedProducts.map((product, index) => {
                                    return (
                                        <div key={index}>
                                            <ProductCard product={product} />
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CategorySearchScreen;
