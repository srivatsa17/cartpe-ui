import { Image } from "@nextui-org/react";
import { PLACEHOLDER_IMAGE } from "constants/images";
import { Product } from "utils/types";
import React from "react";

interface ProductDetailsProps {
    product: Partial<Product>;
}

function ProductImages({ product }: ProductDetailsProps) {
    const featuredImage = product.product_images?.find((productImage) => productImage.is_featured === true);

    // Add carousel once NextUI supports.
    return (
        <div>
            <Image
                src={featuredImage?.image || PLACEHOLDER_IMAGE}
                alt={product.name}
                isBlurred
            />
        </div>
    );
}

export default ProductImages;
