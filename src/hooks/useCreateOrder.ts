import { ErrorResponse, Payment, PaymentMethods, RazorpaySuccessHandlerArgs } from "utils/types";

import { ORDER_URI } from "constants/api";
import { axiosInstance } from "utils/axios";
import { throwErrorResponse } from "utils/errorResponse";

type CreateOrderProps = {
    method: PaymentMethods;
    razorpayOrderDetails?: RazorpaySuccessHandlerArgs;
    shippingAddressId: bigint | null;
    orderItems: Array<{
        productVariant: bigint;
        quantity: number;
    }>;
    amount: number;
    paymentDetails: Omit<Payment, "id" | "order">;
};

export const createOrder = async ({
    method,
    razorpayOrderDetails,
    shippingAddressId,
    orderItems,
    amount,
    paymentDetails
}: CreateOrderProps) => {
    try {
        const orderData = {
            method: method,
            userAddress: shippingAddressId,
            amount: amount,
            orderItems: orderItems,
            razorpayOrderId: razorpayOrderDetails?.razorpay_order_id || null,
            razorpayPaymentId: razorpayOrderDetails?.razorpay_payment_id || null,
            razorpaySignature: razorpayOrderDetails?.razorpay_signature || null,
            paymentDetails: paymentDetails
        };
        const { data } = await axiosInstance.post(ORDER_URI, orderData);
        return data;
    } catch (error) {
        const err = error as ErrorResponse;
        return throwErrorResponse(err);
    }
};
