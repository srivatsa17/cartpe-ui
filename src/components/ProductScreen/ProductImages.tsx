import { Image, Skeleton } from "@nextui-org/react";

import { PLACEHOLDER_IMAGE } from "constants/images";
import { Product } from "utils/types";
import React from "react";

interface ProductDetailsProps {
    product: Partial<Product>;
    isLoading?: boolean;
}

function ProductImages({ product, isLoading }: ProductDetailsProps) {
    const featuredImage = product.product_images?.find(
        (productImage) => productImage.is_featured === true
    );

    // Add carousel once NextUI supports.
    return (
        <div>
            {isLoading ? (
                <Skeleton className="w-11/12 rounded-lg mb-5">
                    <div className="h-96 bg-default-300"></div>
                </Skeleton>
            ) : (
                <Image
                    src={featuredImage?.image || PLACEHOLDER_IMAGE}
                    alt={product.name}
                    isBlurred
                />
            )}
        </div>
    );
}

export default ProductImages;
