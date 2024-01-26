import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, Order, OrderListState } from "utils/types";

import { ORDER_API } from "constants/api";
import { axiosInstance } from "utils/axios";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: OrderListState = {
    isLoading: false,
    orders: [],
    error: null
};

export const getOrderList = () => async (dispatch: Dispatch) => {
    try {
        dispatch(getOrderListRequest());
        const { data } = await axiosInstance.get(ORDER_API);
        dispatch(getOrderListSuccess(data));
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(getOrderListFailed(throwErrorResponse(err)));
    }
};

const orderListSlice = createSlice({
    name: "orderList",
    initialState: initialState,
    reducers: {
        getOrderListRequest: (state) => {
            state.isLoading = true;
        },
        getOrderListSuccess: (state, action: PayloadAction<Array<Order>>) => {
            state.isLoading = false;
            state.orders = action.payload;
        },
        getOrderListFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { getOrderListRequest, getOrderListSuccess, getOrderListFailed } =
    orderListSlice.actions;
export default orderListSlice.reducer;
