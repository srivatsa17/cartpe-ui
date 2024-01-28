import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, Order, OrderDetailsState } from "utils/types";

import { ORDER_BY_ID_URI } from "constants/api";
import { axiosInstance } from "utils/axios";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: OrderDetailsState = {
    isLoading: false,
    order: null,
    error: null
};

export const getOrderDetails = (orderId: bigint) => async (dispatch: Dispatch) => {
    try {
        dispatch(getOrderDetailsRequest());
        const { data } = await axiosInstance.get(ORDER_BY_ID_URI(orderId));
        dispatch(getOrderDetailsSuccess(data));
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(getOrderDetailsFailed(throwErrorResponse(err)));
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
        }
    }
});

export const { getOrderDetailsRequest, getOrderDetailsSuccess, getOrderDetailsFailed } =
    orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
