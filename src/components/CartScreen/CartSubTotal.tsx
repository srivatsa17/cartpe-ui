import { Button, Divider, Spacer } from "@nextui-org/react";

import { CHECKOUT_SCREEN } from "constants/routes";
import { Link } from "react-router-dom";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { getCartPriceDetails } from "utils/getCartPriceDetails";
import { useReduxSelector } from "hooks/redux";

function CartSubTotal() {
    const cart = useReduxSelector((state) => state.cart);
    const { cartItems } = cart;
    const totalCartItemsQuantity = cartItems.length;
    const { totalMRP, totalDiscountPrice, totalSellingPrice } = getCartPriceDetails(cartItems);

    return (
        <div>
            <div className="uppercase font-semibold text-2xl">
                Subtotal ({totalCartItemsQuantity} items)
            </div>
            <Spacer y={4} />
            <Divider className="my-3" />
            <div className="text-lg">
                <div className="flex justify-between">
                    <div>Price</div>
                    <div className="flex">
                        <RupeeIcon height={22} width={22} size={22} className="my-1" />
                        {totalMRP}
                    </div>
                </div>

                <div className="flex justify-between pt-1">
                    <div>Price Discount</div>
                    <div className="flex text-green-600">
                        <RupeeIcon height={22} width={22} size={22} className="my-1" />
                        {totalDiscountPrice}
                    </div>
                </div>

                <Divider className="my-3" />

                <div className="flex justify-between text-lg font-semibold">
                    <div>Total Amount</div>
                    <div className="flex">
                        <RupeeIcon height={22} width={22} size={22} className="my-1" />
                        {totalSellingPrice}
                    </div>
                </div>

                <Divider className="my-3" />
            </div>

            <Link to={CHECKOUT_SCREEN}>
                <Button
                    fullWidth
                    className="my-2"
                    color="warning"
                    variant="flat"
                    isDisabled={totalCartItemsQuantity === 0}
                >
                    Proceed to Checkout
                </Button>
            </Link>
        </div>
    );
}

export default CartSubTotal;
