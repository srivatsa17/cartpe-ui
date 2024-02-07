import { Button, Divider, Spacer } from "@nextui-org/react";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import { CashIcon } from "icons/CashIcon";
import { ExchangeIcon } from "icons/ExchangeIcon";
import { Product } from "utils/types";
import Rating from "components/CategorySearchScreen/Rating";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { TruckFastIcon } from "icons/TruckFastIcon";
import { TruckIcon } from "icons/TruckIcon";
import { addCartItem } from "redux/CartService/cartSlice";
import { addProductToWishList } from "redux/ProductService/wishlistSlice";

interface ProductDetailsProps {
    product: Partial<Product>;
}

function getDeliveryDate() {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    const formattedDate = today.toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric"
    });
    return formattedDate;
}

function ProductDetails({ product }: ProductDetailsProps) {
    const dispatch = useReduxDispatch();
    const { cartItems } = useReduxSelector((state) => state.cart);
    const { wishListedProducts } = useReduxSelector((state) => state.wishlist);

    const isProductInCart = cartItems.some((cartItem) => cartItem.product.id === product.id);
    const isProductInWishList = wishListedProducts.some(
        (wishListedProduct) => wishListedProduct.product.id === product.id
    );

    const handleAddToCart = () => {
        // Handle already exists condition as well with alert message.
        const productWithStrictType = product as Product;
        dispatch(addCartItem(productWithStrictType, 1));
    };

    const handleAddToWishList = () => {
        if (product.id) {
            dispatch(addProductToWishList(product.id));
        }
    };

    return (
        <div>
            <div className="text-4xl">{product.brand}</div>
            <div className="text-2xl py-2 text-default-500">{product.name}</div>
            <Divider />
            <Rating rating={product.rating || 0} reviewCount={product.reviewCount || 0} />
            <Divider />
            <div className="flex py-2 text-2xl xs:text-lg">
                <div className="flex font-semibold">
                    <RupeeIcon height={22} width={22} size={22} className="my-1" />{" "}
                    {product.sellingPrice}
                </div>
                <div className="flex pl-3 line-through text-default-500 font-semibold">
                    <RupeeIcon height={22} width={22} size={22} className="my-1" /> {product.price}
                </div>
                <div className="pl-3 text-green-600 font-medium">({product.discount}% Off)</div>
            </div>
            <Divider />
            <div className="flex py-3 text-xl">
                <div>Availability:</div>
                <Spacer />
                <div
                    className={
                        product.stockCount !== undefined && product.stockCount <= 0
                            ? "text-red-500 font-semibold"
                            : "text-green-600 font-semibold"
                    }
                >
                    {product.stockCount !== undefined && product.stockCount > 0
                        ? "In Stock"
                        : "Out of Stock"}
                </div>
            </div>
            <Divider />
            <div className="py-5 flex">
                <Button
                    fullWidth
                    size="lg"
                    variant="ghost"
                    color="warning"
                    onPress={handleAddToCart}
                    isDisabled={isProductInCart}
                >
                    Add to Cart
                </Button>
                <Spacer x={7} />
                <Button
                    fullWidth
                    size="lg"
                    variant="ghost"
                    color="danger"
                    onPress={handleAddToWishList}
                    isDisabled={isProductInWishList}
                >
                    Add to Wishlist
                </Button>
            </div>
            <Divider />

            <div>
                {product.stockCount && product.stockCount > 0 && (
                    <div>
                        <div className="flex py-3 text-xl font-medium">
                            Delivery Options{" "}
                            <TruckIcon
                                width={24}
                                height={24}
                                size={24}
                                strokeWidth={2}
                                className="mx-3 my-1"
                            />
                        </div>
                        <div>
                            <div className="flex py-1">
                                <TruckFastIcon width={24} height={24} size={24} className="mr-3" />
                                Get it by {getDeliveryDate()}
                            </div>
                            <div className="flex py-1">
                                <CashIcon width={28} height={28} size={24} className="mr-3" />
                                Pay on Delivery available
                            </div>
                            <div className="flex py-1">
                                <ExchangeIcon width={28} height={28} size={24} className="mr-3" />
                                Easy 14 days return & exchange available
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Divider className="my-2" />
            <div className="py-3">
                <div className="text-xl">Product Details</div>
                <div className="py-3 text-default-500 text-lg">{product.description}</div>
            </div>
        </div>
    );
}

export default ProductDetails;
