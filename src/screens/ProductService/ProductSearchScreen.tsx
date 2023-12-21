import { Chip, Divider, Spacer } from "@nextui-org/react";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import Filters from "components/ProductSearchScreen/Filters/Filters";
import { Product } from "utils/types";
import ProductCard from "components/ProductSearchScreen/ProductCard";
import React from "react";
import SortBy from "components/ProductSearchScreen/SortBy";
import { getProducts } from "redux/ProductService/productsSlice";
import { getUniqueFilterValues } from "utils/getUniqueFilterValues";
import { useFilterSearchParams } from "hooks/useFilterSearchParams";

function ProductSearchScreen() {
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
        filteredPriceRange
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

    const filteredAndSortedProducts = products
        ?.filter(handleFilterCategories)
        .filter(handleFilterBrands)
        .filter(handleFilterDiscount)
        .filter(handleFilterPriceRanges);

    return (
        <div className="container mx-auto px-6 py-7">
            <div className="capitalize font-semibold text-lg">Cameras - 2 items</div>
            <Spacer y={5} />
            <div className="grid grid-cols-3">
                <div className="sm:col-span-2 col-span-1">
                    <div className="uppercase font-semibold text-lg">Filters</div>
                    <Spacer y={2} />
                    <Chip className="my-2 mr-2">Hello</Chip>
                    <Chip className="my-2 mr-2">Hello</Chip>
                    <Chip className="my-2 mr-2">Hello</Chip>
                    <Chip className="my-2 mr-2">Hello</Chip>
                    <Chip className="my-2 mr-2">Hello</Chip>
                </div>
                <div className="xs:col-span-2 justify-self-end">
                    <SortBy />
                </div>
            </div>
            <Spacer y={4} />
            <Divider />
            <div className="flex flex-wrap">
                <div className="sm:w-2/5 md:w-2/5 lg:w-1/4 py-5">
                    <Filters
                        uniqueCategories={uniqueCategories}
                        uniqueBrands={uniqueBrands}
                        discountRanges={discountRanges}
                        priceRange={priceRange}
                    />
                </div>
                <div className="py-5 sm:w-3/5 md:w-3/5 lg:w-3/4 grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7">
                    {filteredAndSortedProducts?.map((product, index) => {
                        return (
                            <div key={index} className="grow">
                                <ProductCard product={product} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProductSearchScreen;
