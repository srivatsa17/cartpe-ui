import { BreadcrumbItem, Breadcrumbs, Divider, Spacer } from "@nextui-org/react";
import { CATEGORY_SCREEN, HOME_SCREEN } from "constants/routes";
import { Product, ProductVariant } from "utils/types";

import CustomerReviews from "./CustomerReviews";
import OverallReviews from "./OverallReviews";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
import React from "react";

interface ProductScreenDetailsProps {
    product: Product;
}

function ProductScreenDetails({ product }: ProductScreenDetailsProps) {
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
                    <ProductImages
                        product={product}
                        selectedProductVariant={selectedProductVariant}
                    />
                </div>
                <div>
                    <ProductDetails
                        product={product}
                        selectedProductVariant={selectedProductVariant}
                        setSelectedProductVariant={setSelectedProductVariant}
                    />
                </div>
            </div>
            <Spacer y={3} />
            <div className="space-y-6">
                <Divider />
                <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-16 lg:space-y-0">
                    <div className="col-span-1">
                        <OverallReviews product={product} />
                    </div>
                    <div className="col-span-2">
                        {product.reviewCount === 0 ? (
                            <div className="text-xl">No reviews made yet.</div>
                        ) : (
                            <CustomerReviews product={product} />
                        )}
                    </div>
                </div>
            </div>
            <Spacer y={3} />
        </div>
    );
}

export default ProductScreenDetails;
