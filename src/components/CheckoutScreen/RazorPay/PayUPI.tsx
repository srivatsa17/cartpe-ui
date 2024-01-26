/* eslint-disable camelcase */
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
    ORDER_CONFIRMED_SCREEN,
    ORDER_FAILED_SCREEN,
    ORDER_PAYMENT_FAILED_SCREEN
} from "constants/routes";
import {
    Order,
    Payment,
    PaymentMethods,
    RazorPayFailureHandlerArgs,
    RazorpaySuccessHandlerArgs,
    RazorpaySuccessResponse
} from "utils/types";
import useRazorpay, { Razorpay } from "hooks/useRazorpay";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import { CARTPE_ICON_BLACK } from "constants/images";
import { RAZORPAY_API_TEST_KEY } from "constants/razorpay";
import { RAZORPAY_ORDER_URI } from "constants/api";
import React from "react";
import { ReduxDispatch } from "redux/store";
import { axiosInstance } from "utils/axios";
import { createOrder } from "hooks/useCreateOrder";
import { emptyCart } from "redux/CartService/cartSlice";
import { getCartPriceDetails } from "utils/getCartPriceDetails";

interface OrderDetails {
    shippingAddressId: bigint | null;
    orderItems: Array<{
        product: bigint;
        quantity: number;
    }>;
    amount: number;
}

interface UserDetails {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
}

interface RazorpayDetails {
    Razorpay: typeof Razorpay;
}

interface PaymentDetails {
    paymentDetails: Omit<Payment, "id" | "order">;
}

const DisplayRazorPayCheckoutForm = ({
    Razorpay,
    dispatch,
    shippingAddressId,
    orderItems,
    amount,
    firstName,
    lastName,
    email,
    navigate,
    paymentDetails
}: OrderDetails &
    UserDetails &
    PaymentDetails &
    RazorpayDetails & { dispatch: ReduxDispatch } & { navigate: NavigateFunction }) => {
    const razorpayOrderData = { amount: amount };

    // Create the Razorpay order first by passing the amount.
    // Once it succeeds, pass razorpay order and payment details to backend API to create order internally.
    axiosInstance
        .post(RAZORPAY_ORDER_URI, razorpayOrderData)
        .then((response: RazorpaySuccessResponse) => {
            const razorpayOrder = response.data;
            const options = {
                key: RAZORPAY_API_TEST_KEY,
                amount: amount * 100,
                currency: "INR",
                name: "CartPe",
                image: CARTPE_ICON_BLACK,
                order_id: razorpayOrder.id,
                handler: function (response: RazorpaySuccessHandlerArgs) {
                    if (shippingAddressId && orderItems && amount > 0) {
                        const createOrderProps = {
                            method: "UPI" as PaymentMethods,
                            razorpayOrderDetails: response,
                            shippingAddressId,
                            orderItems,
                            amount,
                            paymentDetails
                        };
                        // Create an order at the backend and navigate to order confirmed screen.
                        createOrder(createOrderProps).then((order: Order) => {
                            dispatch(emptyCart());
                            navigate(
                                `${ORDER_CONFIRMED_SCREEN}?paymentMethod=${order.method}&orderId=${order.id}&razorpayOrderId=${razorpayOrder.id}`,
                                {
                                    state: {
                                        paymentMethod: order.method,
                                        orderId: order.id,
                                        razorpayOrderId: razorpayOrder.id
                                    }
                                }
                            );
                        });
                    }
                },
                prefill: {
                    name: firstName && lastName ? firstName + lastName : "",
                    email: email ? email : "youremail@example.com"
                    // Add phone number field once its implemented from backend
                    // contact: "9999999999"
                },
                theme: {
                    color: "#004493"
                }
            };

            const razorpayInstance = new Razorpay(options);

            // On payment fail, display payment failed screen.
            razorpayInstance.on("payment.failed", (response: RazorPayFailureHandlerArgs) => {
                const orderIdQueryParam = `razorpayOrderId=${response?.error?.metadata?.order_id}`;
                navigate(`${ORDER_PAYMENT_FAILED_SCREEN}?${orderIdQueryParam}`, {
                    state: {
                        paymentErrorDescription: response?.error?.description
                    }
                });
            });

            razorpayInstance.open();
        })
        .catch(() => {
            // Navigate to Order Failed Screen if razorpay order fails.
            navigate(`${ORDER_FAILED_SCREEN}`);
        });
};

function PayUPI() {
    // Passing hooks from default component.
    const [Razorpay] = useRazorpay();
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();
    const { shippingAddressId, orderItems, amount } = useReduxSelector(
        (state) => state.checkoutDetails
    );
    const { firstName, lastName, email } = useReduxSelector((state) => state.userLoginDetails);
    const cartPriceDetails = getCartPriceDetails();

    const paymentDetails = {
        total_mrp: Number(cartPriceDetails.totalMRP.toFixed(2)),
        total_discount_price: Number(cartPriceDetails.totalDiscountPrice.toFixed(2)),
        total_selling_price: Number(cartPriceDetails.totalSellingPrice.toFixed(2)),
        convenience_fee: cartPriceDetails.convenienceFee,
        shipping_fee: cartPriceDetails.shippingFee,
        total_amount: Number(cartPriceDetails.totalAmount.toFixed(2)),
        round_off_price: Number(cartPriceDetails.roundOffPrice.toFixed(2)),
        savings_amount: Number(cartPriceDetails.savingsAmount.toFixed(2)),
        savings_percent: Number(cartPriceDetails.savingsPercent.toFixed(2))
    };

    const checkoutFormProps = {
        Razorpay,
        dispatch,
        navigate,
        shippingAddressId,
        orderItems,
        amount,
        firstName,
        lastName,
        email,
        paymentDetails
    };

    React.useEffect(() => {
        DisplayRazorPayCheckoutForm(checkoutFormProps);
    }, [Razorpay]);

    return null;
}

export default PayUPI;
