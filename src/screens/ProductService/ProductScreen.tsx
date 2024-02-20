import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { CATEGORY_SCREEN, HOME_SCREEN } from "constants/routes";

import ProductDetails from "components/ProductScreen/ProductDetails";
import ProductDetailsSkeleton from "components/ProductScreen/ProductDetailsSkeleton";
import ProductImages from "components/ProductScreen/ProductImages";
import ProductImagesSkeleton from "components/ProductScreen/ProductImagesSkeleton";
import { ProductVariant } from "utils/types";
import React from "react";
import { useParams } from "react-router-dom";
import { useReduxSelector } from "hooks/redux";

function ProductScreen() {
    const { id } = useParams();

    // Todo: Return fallback error component instead of null
    if (id === undefined) {
        return null;
    }

    const { products, isLoading } = useReduxSelector((state) => state.productList);
    const product = products.find((product) => Number(product.id) === Number(id));

    // Todo: Return fallback error component instead of null
    if (!products || !products.length || !product) return null;

    const [selectedProductVariant, setSelectedProductVariant] = React.useState<ProductVariant>(
        product.productVariants[0]
    );

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
                    {isLoading ? (
                        <ProductImagesSkeleton />
                    ) : (
                        <ProductImages
                            product={product}
                            selectedProductVariant={selectedProductVariant}
                        />
                    )}
                </div>
                <div>
                    {isLoading ? (
                        <ProductDetailsSkeleton />
                    ) : (
                        <ProductDetails
                            product={product}
                            selectedProductVariant={selectedProductVariant}
                            setSelectedProductVariant={setSelectedProductVariant}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductScreen;
