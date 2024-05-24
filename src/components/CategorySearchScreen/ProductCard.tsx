import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Image,
    Link,
    Tooltip
} from "@nextui-org/react";
import {
    addProductToWishList,
    removeProductFromWishList
} from "redux/ProductService/wishlistSlice";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import { HeartFillIcon } from "icons/HeartFillIcon";
import { HeartIcon } from "icons/HeartIcon";
import { PLACEHOLDER_IMAGE } from "constants/images";
import { Product } from "utils/types";
import Rating from "./Rating";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const dispatch = useReduxDispatch();
    const { wishListedProducts } = useReduxSelector((state) => state.wishlist);

    const isProductInWishList = wishListedProducts.find(
        (p) => p.productVariant.id === product.productVariants[0].id
    );

    const [isWishlisted, setIsWishlisted] = React.useState<boolean>(
        isProductInWishList ? true : false
    );

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        if (isProductInWishList && isWishlisted) {
            dispatch(removeProductFromWishList(isProductInWishList.id));
        } else {
            dispatch(addProductToWishList(product.productVariants[0].id));
        }
    };

    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div className="text-left">
                    <div className="text-lg uppercase font-bold text-indigo-600">
                        {product.brand}
                    </div>
                    <div className="line-clamp-1 font-medium">{product.name}</div>
                </div>
                <Tooltip
                    content={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    color={isWishlisted ? "danger" : "foreground"}
                >
                    <Button
                        isIconOnly
                        radius="full"
                        variant="light"
                        data-liked={isWishlisted}
                        onClick={handleWishlist}
                        className="data-[liked=true]:text-rose-500 text-default-400"
                    >
                        {isWishlisted ? (
                            <HeartFillIcon width={25} height={25} />
                        ) : (
                            <HeartIcon width={25} height={25} />
                        )}
                    </Button>
                </Tooltip>
            </CardHeader>
            <CardBody className="py-3 px-4 space-y-2.5">
                <div className="items-center">
                    <Image
                        src={product.productVariants[0].images[0] || PLACEHOLDER_IMAGE}
                        isBlurred
                        alt="product-image"
                    />
                </div>
                <div className="line-clamp-2 text-default-500">{product.description}</div>
                <Rating rating={product.ratingAverage} reviewCount={product.ratingCount} />
                <div className="flex gap-3">
                    <div className="flex items-center font-semibold">
                        <RupeeIcon height={18} width={18} size={18} />{" "}
                        {product.productVariants[0].sellingPrice}
                    </div>
                    <div className="flex items-center line-through text-default-500 font-semibold">
                        <RupeeIcon height={18} width={18} size={18} />{" "}
                        {product.productVariants[0].price}
                    </div>
                    <div className="text-green-600 font-medium">
                        ({product.productVariants[0].discount}% Off)
                    </div>
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
