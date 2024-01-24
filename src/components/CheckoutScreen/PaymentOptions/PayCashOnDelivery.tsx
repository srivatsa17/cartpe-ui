/* eslint-disable camelcase */
import { ORDER_CONFIRMED_SCREEN, ORDER_FAILED_SCREEN } from "constants/routes";
import { Order, PaymentMethods } from "utils/types";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import React from "react";
import { createOrder } from "hooks/useCreateOrder";
import { emptyCart } from "redux/CartService/cartSlice";
import { getCartPriceDetails } from "utils/getCartPriceDetails";
import { useNavigate } from "react-router-dom";

function PayCashOnDelivery() {
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();
    const { shippingAddressId, orderItems, amount } = useReduxSelector(
        (state) => state.checkoutDetails
    );
    const cartPriceDetails = getCartPriceDetails();

    React.useEffect(() => {
        const placeOrder = async () => {
            try {
                const createOrderProps = {
                    method: "Cash On Delivery" as PaymentMethods,
                    shippingAddressId: shippingAddressId,
                    orderItems: orderItems,
                    amount: amount,
                    paymentDetails: {
                        total_mrp: Number(cartPriceDetails.totalMRP.toFixed(2)),
                        total_discount_price: Number(
                            cartPriceDetails.totalDiscountPrice.toFixed(2)
                        ),
                        total_selling_price: Number(cartPriceDetails.totalSellingPrice.toFixed(2)),
                        convenience_fee: cartPriceDetails.convenienceFee,
                        shipping_fee: cartPriceDetails.shippingFee,
                        total_amount: Number(cartPriceDetails.totalAmount.toFixed(2)),
                        round_off_price: Number(cartPriceDetails.roundOffPrice.toFixed(2)),
                        savings_amount: Number(cartPriceDetails.savingsAmount.toFixed(2)),
                        savings_percent: Number(cartPriceDetails.savingsPercent.toFixed(2))
                    }
                };
                const order: Order = await createOrder(createOrderProps);
                dispatch(emptyCart());
                navigate(
                    `${ORDER_CONFIRMED_SCREEN}?paymentMethod=${order.method}&orderId=${order.id}`,
                    {
                        state: {
                            paymentMethod: order.method,
                            orderId: order.id
                        }
                    }
                );
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
