import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Image,
    Spacer,
    Tooltip
} from "@nextui-org/react";

import { CloseCircleIcon } from "icons/CloseCircleIcon";
import { PLACEHOLDER_IMAGE } from "constants/images";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { WishList } from "utils/types";
import { addCartItem } from "redux/CartService/cartSlice";
import { removeProductFromWishList } from "redux/ProductService/wishlistSlice";
import { useReduxDispatch } from "hooks/redux";

interface WishListCardProps {
    wishListedProduct: WishList;
}

function WishListCard({ wishListedProduct }: WishListCardProps) {
    const dispatch = useReduxDispatch();

    const featuredImage = wishListedProduct.product.productImages.find(
        (productImage) => productImage.isFeatured === true
    );

    const handleRemoveProductFromWishlist = () => {
        dispatch(removeProductFromWishList(wishListedProduct.id));
    };

    const handleMoveToCart = () => {
        dispatch(addCartItem(wishListedProduct.product, 1));
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
            <CardBody className="px-4">
                <Spacer y={6} />
                <div className="xs:h-full md:h-80 xl:h-64 items-center">
                    <Image
                        src={featuredImage?.image || PLACEHOLDER_IMAGE}
                        isBlurred
                        alt="product-image"
                    />
                </div>
                <div className="line-clamp-2 text-default-500">
                    {wishListedProduct.product.description}
                </div>
                <Spacer y={2} />
                <div className="flex items-center ">
                    <div className="flex items-center font-semibold">
                        <RupeeIcon height={18} width={18} size={18} />{" "}
                        {wishListedProduct.product.sellingPrice}
                    </div>
                    <div className="flex items-center pl-3 line-through text-default-500 font-semibold">
                        <RupeeIcon height={18} width={18} size={18} />{" "}
                        {wishListedProduct.product.price}
                    </div>
                    <div className="pl-3 text-green-600 font-medium">
                        ({wishListedProduct.product.discount}% Off)
                    </div>
                </div>
            </CardBody>
            <Divider />
            <CardFooter>
                <Button fullWidth color="danger" variant="ghost" onPress={handleMoveToCart}>
                    Move to cart
                </Button>
            </CardFooter>
        </Card>
    );
}

export default WishListCard;
