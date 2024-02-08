import { Button, Image, ScrollShadow, Skeleton } from "@nextui-org/react";

import { PLACEHOLDER_IMAGE } from "constants/images";
import { Product } from "utils/types";
import React from "react";

interface ProductImagesProps {
    product: Partial<Product>;
    isLoading?: boolean;
}

function ProductImages({ product, isLoading }: ProductImagesProps) {
    const featuredImage = product.productImages?.find(
        (productImage) => productImage.isFeatured === true
    );

    const [selectedImage, setSelectedImage] = React.useState(featuredImage?.image);

    // Adding useEffect because `selectedImage` will be initially set to `undefined` due to `find` function
    // used on productImages.
    React.useEffect(() => {
        if (featuredImage && featuredImage.image) {
            setSelectedImage(featuredImage.image);
        }
    }, [featuredImage]);

    return (
        <div>
            {isLoading ? (
                <Skeleton className="w-11/12 rounded-lg mb-5">
                    <div className="h-96 bg-default-300"></div>
                </Skeleton>
            ) : (
                <div className="w-5/6">
                    <Image
                        src={selectedImage || featuredImage?.image || PLACEHOLDER_IMAGE}
                        alt={product.name}
                        isBlurred
                    />
                    <ScrollShadow hideScrollBar orientation="horizontal" className="flex gap-4 p-4">
                        {product.productImages?.map((productImage) => {
                            return (
                                <Button
                                    key={productImage.id}
                                    data-selected={productImage.image === selectedImage}
                                    className="h-24 w-24 bg-gray-200 flex-none cursor-pointer items-center justify-center rounded-medium ring-offset-background transition-shadow data-[selected=true]:outline-none data-[selected=true]:ring-2 data-[selected=true]:ring-focus data-[selected=true]:ring-offset-2"
                                    onClick={() => setSelectedImage(productImage.image)}
                                >
                                    <Image src={productImage.image} alt="productImage"/>
                                </Button>
                            );
                        })}
                    </ScrollShadow>
                </div>
            )}
        </div>
    );
}

export default ProductImages;
