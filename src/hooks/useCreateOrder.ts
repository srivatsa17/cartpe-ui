import { ErrorResponse, PaymentMethods, RazorpaySuccessHandlerArgs } from "utils/types";

/* eslint-disable camelcase */
import { ORDER_API } from "constants/api";
import { axiosInstance } from "utils/axios";
import { throwErrorResponse } from "utils/errorResponse";

type CreateOrderProps = {
    method: PaymentMethods;
    razorpayOrderDetails?: RazorpaySuccessHandlerArgs;
    shippingAddressId: bigint | null;
    orderItems: Array<{
        product: bigint;
        quantity: number;
    }>;
    amount: number;
};

export const createOrder = async ({
    method,
    razorpayOrderDetails,
    shippingAddressId,
    orderItems,
    amount
}: CreateOrderProps) => {
    try {
        const orderData = {
            method: method,
            user_address: shippingAddressId,
            amount: amount,
            order_items: orderItems,
            razorpay_order_id: razorpayOrderDetails?.razorpay_order_id || null,
            razorpay_payment_id: razorpayOrderDetails?.razorpay_payment_id || null,
            razorpay_signature: razorpayOrderDetails?.razorpay_signature || null
        };
        const { data } = await axiosInstance.post(ORDER_API, orderData);
        return data;
    } catch (error) {
        const err = error as ErrorResponse;
        return throwErrorResponse(err);
    }
};
