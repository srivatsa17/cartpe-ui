import { Button, Divider, Link, Spacer } from "@nextui-org/react";

import { CHECKOUT_SCREEN } from "constants/routes";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { getCartPriceDetails } from "utils/getCartPriceDetails";
import { useReduxSelector } from "hooks/redux";

function CartSubTotal() {
    const cart = useReduxSelector((state) => state.cart);
    const { cartItems } = cart;
    const totalCartItemsQuantity = cartItems.length;
    const { totalMRP, totalDiscountPrice, totalSellingPrice } = getCartPriceDetails();

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
                        {totalMRP.toFixed(2)}
                    </div>
                </div>

                <div className="flex justify-between pt-1">
                    <div>Price Discount</div>
                    <div className="flex text-green-600">
                        <RupeeIcon height={22} width={22} size={22} className="my-1" />
                        {totalDiscountPrice.toFixed(2)}
                    </div>
                </div>

                <Divider className="my-3" />

                <div className="flex justify-between text-lg font-semibold">
                    <div>Total Amount</div>
                    <div className="flex">
                        <RupeeIcon height={22} width={22} size={22} className="my-1" />
                        {totalSellingPrice.toFixed(2)}
                    </div>
                </div>

                <Divider className="my-3" />
            </div>

            <Link
                href={CHECKOUT_SCREEN}
                className="w-full"
                isDisabled={totalCartItemsQuantity === 0}
            >
                <Button fullWidth className="my-2" variant="flat" color="primary">
                    Proceed to Checkout
                </Button>
            </Link>
        </div>
    );
}

export default CartSubTotal;
