/* eslint-disable camelcase */
import { ORDER_CONFIRMED_SCREEN, ORDER_FAILED_SCREEN } from "constants/routes";

import { PaymentMethods } from "utils/types";
import React from "react";
import { createOrder } from "hooks/useCreateOrder";
import { useNavigate } from "react-router-dom";
import { useReduxSelector } from "hooks/redux";

function PayCashOnDelivery() {
    const navigate = useNavigate();
    const { shippingAddressId, orderItems, amount } = useReduxSelector(
        (state) => state.checkoutDetails
    );

    React.useEffect(() => {
        const placeOrder = async () => {
            try {
                const createOrderProps = {
                    method: "Cash On Delivery" as PaymentMethods,
                    shippingAddressId: shippingAddressId,
                    orderItems: orderItems,
                    amount: amount
                };
                const order = await createOrder(createOrderProps);
                navigate(`${ORDER_CONFIRMED_SCREEN}?paymentMethod=COD&orderId=${order.id}`, {
                    state: {
                        paymentMethod: "COD",
                        orderId: order.id
                    }
                });
            } catch (error) {
                navigate(ORDER_FAILED_SCREEN);
            }
        };

        // Place the order when the component mounts
        placeOrder();
    }, [navigate]);

    return null;
}

export default PayCashOnDelivery;
