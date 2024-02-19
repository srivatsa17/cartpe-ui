import { Button, Image, ScrollShadow } from "@nextui-org/react";
import { Product, ProductVariant } from "utils/types";

import { PLACEHOLDER_IMAGE } from "constants/images";
import React from "react";

interface ProductImagesProps {
    product: Product;
    selectedProductVariant: ProductVariant;
}

function ProductImages({ product, selectedProductVariant }: ProductImagesProps) {
    if (product === null || product === undefined) {
        return null;
    }

    const [selectedImage, setSelectedImage] = React.useState(selectedProductVariant?.images[0]);

    React.useEffect(() => {
        setSelectedImage(selectedProductVariant.images[0]);
    }, [selectedProductVariant]);

    return (
        <div>
            <div className="w-5/6">
                <Image src={selectedImage || PLACEHOLDER_IMAGE} alt={product.name} isBlurred />
                <ScrollShadow hideScrollBar orientation="horizontal" className="flex gap-4 p-4">
                    {selectedProductVariant?.images.map((productImage) => {
                        return (
                            <Button
                                key={productImage}
                                data-selected={productImage === selectedImage}
                                className="h-24 w-24 bg-gray-200 flex-none cursor-pointer items-center justify-center rounded-medium ring-offset-background transition-shadow data-[selected=true]:outline-none data-[selected=true]:ring-2 data-[selected=true]:ring-focus data-[selected=true]:ring-offset-2"
                                onClick={() => setSelectedImage(productImage)}
                            >
                                <Image src={productImage} alt="productImage" />
                            </Button>
                        );
                    })}
                </ScrollShadow>
            </div>
        </div>
    );
}

export default ProductImages;
