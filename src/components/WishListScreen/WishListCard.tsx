import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Image,
    Tooltip
} from "@nextui-org/react";
import { CartProductData, WishList } from "utils/types";

import { CartIcon } from "icons/CartIcon";
import { CloseCircleIcon } from "icons/CloseCircleIcon";
import { PLACEHOLDER_IMAGE } from "constants/images";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { addCartItem } from "redux/CartService/cartSlice";
import { removeProductFromWishList } from "redux/ProductService/wishlistSlice";
import { useReduxDispatch } from "hooks/redux";

interface WishListCardProps {
    wishListedProduct: WishList;
}

function WishListCard({ wishListedProduct }: WishListCardProps) {
    const dispatch = useReduxDispatch();

    const handleRemoveProductFromWishlist = () => {
        dispatch(removeProductFromWishList(wishListedProduct.id));
    };

    const handleMoveToCart = () => {
        const cartProductData: CartProductData = {
            ...wishListedProduct.productVariant,
            productName: wishListedProduct.product.name,
            productSlug: wishListedProduct.product.slug,
            productDescription: wishListedProduct.product.description,
            productBrand: wishListedProduct.product.brand,
            productCategory: wishListedProduct.product.category,
            productCategorySlug: wishListedProduct.product.categorySlug
        };
        dispatch(addCartItem(cartProductData, 1));
        dispatch(removeProductFromWishList(wishListedProduct.id));
    };

    return (
        <Card key={wishListedProduct.id}>
            <CardHeader className="flex justify-between">
                <div className="text-left">
                    <div className="text-lg uppercase font-bold text-indigo-600">
                        {wishListedProduct.product.brand}
                    </div>
                    <div className="line-clamp-1 font-medium">{wishListedProduct.product.name}</div>
                </div>
                <Tooltip content="Remove from wishlist" color="danger">
                    <Button
                        isIconOnly
                        radius="full"
                        variant="light"
                        onClick={handleRemoveProductFromWishlist}
                    >
                        <CloseCircleIcon width={25} height={25} />
                    </Button>
                </Tooltip>
            </CardHeader>
            <CardBody className="space-y-3 px-4">
                <div className="items-center">
                    <Image
                        src={wishListedProduct.productVariant.images[0] || PLACEHOLDER_IMAGE}
                        isBlurred
                        alt="product-image"
                    />
                </div>
                <div className="line-clamp-2 text-default-500">
                    {wishListedProduct.product.description}
                </div>
                <div className="flex items-center">
                    <div className="flex items-center font-semibold">
                        <RupeeIcon height={18} width={18} size={18} />{" "}
                        {wishListedProduct.productVariant.sellingPrice}
                    </div>
                    <div className="flex items-center pl-3 line-through text-default-500 font-semibold">
                        <RupeeIcon height={18} width={18} size={18} />{" "}
                        {wishListedProduct.productVariant.price}
                    </div>
                    <div className="pl-3 text-green-600 font-medium">
                        ({wishListedProduct.productVariant.discount}% Off)
                    </div>
                </div>
                <div>
                    {wishListedProduct.productVariant.properties.map((property) => {
                        return (
                            <div
                                key={property.id}
                                className="flex gap-3 capitalize text-default-500"
                            >
                                <div>
                                    {property.name} - {property.value}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardBody>
            <Divider />
            <CardFooter>
                <Button
                    fullWidth
                    color="danger"
                    variant="ghost"
                    onPress={handleMoveToCart}
                    startContent={<CartIcon width={22} height={22} size={22} />}
                >
                    Move item to cart
                </Button>
            </CardFooter>
        </Card>
    );
}

export default WishListCard;
