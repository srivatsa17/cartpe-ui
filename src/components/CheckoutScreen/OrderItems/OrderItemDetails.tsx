import { Button, Divider, Selection, Spacer } from "@nextui-org/react";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import CartItemDetails from "components/CartScreen/CartItemDetails";
import React from "react";
import { accordianStageKeys } from "../AccordianStages";
import { addOrderItems } from "redux/OrderService/checkoutStepsSlice";
import { getCartPriceDetails } from "utils/getCartPriceDetails";

interface OrderItemDetailsProps {
    setSelectedKeys: React.Dispatch<React.SetStateAction<Selection>>;
}

function OrderItemDetails({ setSelectedKeys }: OrderItemDetailsProps) {
    const dispatch = useReduxDispatch();
    const { cartItems } = useReduxSelector((state) => state.cart);
    const { totalAmount } = getCartPriceDetails(cartItems);
    const isCartEmpty = cartItems.length === 0;

    const handleAddOrderItems = () => {
        dispatch(addOrderItems(cartItems, totalAmount));
        setSelectedKeys(new Set([accordianStageKeys["PAYMENT_OPTIONS"]]));
    };

    return (
        <div className="p-2">
            <CartItemDetails />
            <Spacer y={6} />
            <Divider />
            <Spacer y={4} />
            <Button
                color="success"
                variant="ghost"
                isDisabled={isCartEmpty}
                onClick={handleAddOrderItems}
            >
                Place order items
            </Button>
        </div>
    );
}

export default OrderItemDetails;
