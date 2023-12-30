import { Button, Divider, Spacer } from "@nextui-org/react";

import { Cart } from "utils/types";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { useReduxSelector } from "hooks/redux";

function CartSubTotal() {
    const cart = useReduxSelector((state) => state.cart);
    const { cartItems } = cart;
    const totalMRP = cartItems
        .reduce(
            (sum: number, cartItem: Cart) => sum + cartItem.quantity * cartItem.product.price,
            0
        )
        .toFixed(2);
    const totalDiscountPrice = cartItems
        .reduce(
            (sum: number, cartItem: Cart) =>
                sum + cartItem.quantity * cartItem.product.discounted_price,
            0
        )
        .toFixed(2);
    const totalSellingPrice = cartItems
        .reduce(
            (sum: number, cartItem: Cart) =>
                sum + cartItem.quantity * cartItem.product.selling_price,
            0
        )
        .toFixed(2);
    const isCartEmpty = cartItems.length === 0;

    return (
        <div className="pr-8">
            <div className="uppercase font-semibold text-2xl">Subtotal</div>
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

            <Button
                fullWidth
                className="my-2"
                color="warning"
                variant="flat"
                isDisabled={isCartEmpty}
            >
                Proceed to Checkout
            </Button>
        </div>
    );
}

export default CartSubTotal;
