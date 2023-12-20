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

    const { uniqueCategories } = getUniqueFilterValues(products ?? []);
    const { searchedCategory, filteredCategories } = useFilterSearchParams();

    React.useEffect(() => {
        dispatch(getProducts(searchedCategory));
    }, [dispatch, searchedCategory]);

    const handleFilterCategories = (product: Product) => {
        return filteredCategories.length > 0 ? filteredCategories.includes(product.category) : true;
    };

    const filteredAndSortedProducts = products?.filter(handleFilterCategories);

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
            <div className="flex flex-row xs:flex-col">
                <div className="sm:basis-2/5 md:basis-2/5 lg:basis-1/4 py-5">
                    <Filters
                        uniqueCategories={uniqueCategories}
                        // uniqueBrands={uniqueBrands}
                        // discountRanges={discountRanges}
                        // minAndMaxPrices={minAndMaxPrices}
                    />
                </div>
                <div className="py-5 sm:basis-3/5 md:basis-3/5 lg:basis-3/4 grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredAndSortedProducts?.map((product, index) => {
                        return <ProductCard key={index} product={product} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProductSearchScreen;
