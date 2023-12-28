import { Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@nextui-org/react";

import { PLACEHOLDER_IMAGE } from "constants/images";
import { Product } from "utils/types";
import Rating from "./Rating";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const featuredImage = product.product_images.find((productImage) => productImage.is_featured === true);

    return (
        <Card isPressable>
            <CardHeader className="py-3 px-4 flex-col items-start">
                <div className="text-lg uppercase font-bold text-indigo-600">{product.brand}</div>
                <div className="text-slate-900 line-clamp-1 font-medium">{product.name}</div>
            </CardHeader>
            <CardBody className="py-3 px-4 flex-col">
                <Image
                    src={featuredImage?.image || PLACEHOLDER_IMAGE}
                    alt="product-image"
                    isBlurred
                />
                <div className="line-clamp-2 text-default-500">{product.description}</div>
                <Rating rating={product.rating || 0} reviewCount={product.reviewCount || 0} />
                <div className="flex">
                    <div className="flex font-semibold">
                        <RupeeIcon height={18} width={18} size={18} className="my-1" />{" "}
                        {product.selling_price}
                    </div>
                    <div className="flex pl-3 line-through text-default-500 font-semibold">
                        <RupeeIcon height={18} width={18} size={18} className="my-1" />{" "}
                        {product.price}
                    </div>
                    <div className="pl-3 text-green-600 font-medium">({product.discount}% Off)</div>
                </div>
            </CardBody>
            <Divider />
            <CardFooter>
                <Link
                    isExternal
                    showAnchorIcon
                    isBlock
                    color="secondary"
                    href={`/products/${product.slug}/${product.id}/buy`}
                >
                    View the product
                </Link>
            </CardFooter>
        </Card>
    );
}

export default ProductCard;
