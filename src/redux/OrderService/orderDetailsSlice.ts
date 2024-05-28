import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, Order, OrderDetailsState } from "utils/types";

import { ORDER_BY_ID_URI } from "constants/api";
import { OrderStatus } from "utils/getOrderStatus";
import { axiosInstance } from "utils/axios";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: OrderDetailsState = {
    isLoading: false,
    order: null,
    error: null
};

export const getOrderDetails = (orderId: bigint | string) => async (dispatch: Dispatch) => {
    let typeCastedOrderId: bigint;

    if (typeof orderId === "string") {
        typeCastedOrderId = BigInt(orderId);
    } else {
        typeCastedOrderId = orderId;
    }

    try {
        dispatch(getOrderDetailsRequest());
        const { data } = await axiosInstance.get(ORDER_BY_ID_URI(typeCastedOrderId));
        dispatch(getOrderDetailsSuccess(data));
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(getOrderDetailsFailed(throwErrorResponse(err)));
    }
};

export const cancelOrder = (orderId: bigint) => async (dispatch: Dispatch) => {
    try {
        dispatch(cancelOrderRequest());
        const cancelOrderData = {
            status: OrderStatus.CANCELLED
        };
        const { data } = await axiosInstance.patch(ORDER_BY_ID_URI(orderId), cancelOrderData);
        dispatch(cancelOrderSuccess(data));
        return Promise.resolve();
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(cancelOrderFailed(throwErrorResponse(err)));
        return Promise.reject(throwErrorResponse(err));
    }
};

const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: initialState,
    reducers: {
        getOrderDetailsRequest: (state) => {
            state.isLoading = true;
        },
        getOrderDetailsSuccess: (state, action: PayloadAction<Order>) => {
            state.isLoading = false;
            state.order = action.payload;
        },
        getOrderDetailsFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        cancelOrderRequest: (state) => {
            state.isLoading = true;
        },
        cancelOrderSuccess: (state, action: PayloadAction<Order>) => {
            state.isLoading = false;
            state.order = action.payload;
        },
        cancelOrderFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    getOrderDetailsRequest,
    getOrderDetailsSuccess,
    getOrderDetailsFailed,
    cancelOrderRequest,
    cancelOrderSuccess,
    cancelOrderFailed
} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
