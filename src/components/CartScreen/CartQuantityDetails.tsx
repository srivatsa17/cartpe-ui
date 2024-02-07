import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import { Button } from "@nextui-org/react";
import React from "react";
import { TrashIcon } from "icons/TrashIcon";
import { emptyCart } from "redux/CartService/cartSlice";

function CartQuantityDetails() {
    const dispatch = useReduxDispatch();
    const cart = useReduxSelector((state) => state.cart);
    const { cartItems } = cart;
    const totalCartItemsQuantity = cartItems.length;
    const isCartEmpty = totalCartItemsQuantity === 0;

    const handleEmptyCart = () => {
        dispatch(emptyCart());
    };

    return (
        <div className="py-6 flex justify-between">
            <div className="capitalize text-xl text-default-500">
                Total Items in Cart - {totalCartItemsQuantity}
            </div>
            <div>
                <Button
                    isDisabled={isCartEmpty}
                    variant="ghost"
                    color="danger"
                    endContent={<TrashIcon width={22} height={20} />}
                    onPress={handleEmptyCart}
                >
                    Empty cart
                </Button>
            </div>
        </div>
    );
}

export default CartQuantityDetails;
