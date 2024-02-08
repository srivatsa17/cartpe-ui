import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { CATEGORY_SCREEN, HOME_SCREEN } from "constants/routes";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import ProductDetails from "components/ProductScreen/ProductDetails";
import ProductDetailsSkeleton from "components/ProductScreen/ProductDetailsSkeleton";
import ProductImages from "components/ProductScreen/ProductImages";
import React from "react";
import { getProductDetails } from "redux/ProductService/productByIdSlice";
import { useParams } from "react-router-dom";

function ProductScreen() {
    const { id } = useParams();
    if (id === undefined) {
        return null;
    }
    const typeCastedId = BigInt(id);
    const dispatch = useReduxDispatch();
    const productDetails = useReduxSelector((state) => state.productDetails);
    const { product, isLoading } = productDetails;

    React.useEffect(() => {
        dispatch(getProductDetails(typeCastedId));
    }, [dispatch, typeCastedId]);

    return (
        <div className="container mx-auto px-6 py-7">
            <Breadcrumbs className="mb-3" size="lg">
                <BreadcrumbItem href={HOME_SCREEN}>Home</BreadcrumbItem>
                <BreadcrumbItem href={CATEGORY_SCREEN}>Categories</BreadcrumbItem>
                <BreadcrumbItem
                    href={`/categories/${product.categorySlug}?rawQuery=${product.category}`}
                >
                    {product.category}
                </BreadcrumbItem>
                <BreadcrumbItem isCurrent isLast>
                    {product.name}
                </BreadcrumbItem>
            </Breadcrumbs>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                <div>
                    <ProductImages product={product} isLoading={isLoading} />
                </div>
                <div>
                    {isLoading ? <ProductDetailsSkeleton /> : <ProductDetails product={product} />}
                </div>
            </div>
        </div>
    );
}

export default ProductScreen;
