import { Button, Divider, Selection, Spacer } from "@nextui-org/react";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import CartItemDetails from "components/CartScreen/CartItemDetails";
import React from "react";
import { accordianStageKeys } from "utils/getAddressDetails";
import { addOrderItems } from "redux/OrderService/checkoutStepsSlice";
import { getCartPriceDetails } from "utils/getCartPriceDetails";

interface OrderItemDetailsProps {
    setSelectedAccordionKeys: React.Dispatch<React.SetStateAction<Selection>>;
}

function OrderItemDetails({ setSelectedAccordionKeys }: OrderItemDetailsProps) {
    const dispatch = useReduxDispatch();
    const { cartItems } = useReduxSelector((state) => state.cart);
    const { shippingAddressId } = useReduxSelector((state) => state.checkoutDetails);
    const { totalAmount } = getCartPriceDetails();
    const isCartEmpty = cartItems.length === 0;

    const handleAddOrderItems = () => {
        dispatch(addOrderItems(cartItems, totalAmount));
        setSelectedAccordionKeys(new Set([accordianStageKeys.PAYMENT_OPTIONS]));
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
                isDisabled={isCartEmpty || shippingAddressId === null}
                onClick={handleAddOrderItems}
            >
                Place order items
            </Button>
        </div>
    );
}

export default OrderItemDetails;
