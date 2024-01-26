import { Cart, CheckoutStepsState, ErrorResponse, OrderDetails } from "utils/types";
import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { throwErrorResponse } from "utils/errorResponse";

const initialState: CheckoutStepsState = {
    isLoading: false,
    shippingAddressId: null,
    orderItems: [],
    amount: 0,
    error: null
};

export const addSelectedShippingAddress =
    (shippingAddressId: bigint) => async (dispatch: Dispatch) => {
        try {
            dispatch(selectedShippingAddressRequest());
            dispatch(selectedShippingAddressSuccess(shippingAddressId));
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(selectedShippingAddressFailed(throwErrorResponse(err)));
        }
    };

export const addOrderItems =
    (orderItems: Array<Cart>, amount: number) => async (dispatch: Dispatch) => {
        const orderDetails = {
            orderItems: orderItems,
            amount: amount
        };

        try {
            dispatch(addOrderItemsRequest());
            dispatch(addOrderItemsSuccess(orderDetails));
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(addOrderItemsFailed(throwErrorResponse(err)));
        }
    };

const checkoutStepsSlice = createSlice({
    name: "checkoutSteps",
    initialState: initialState,
    reducers: {
        selectedShippingAddressRequest: (state) => {
            state.isLoading = true;
        },
        selectedShippingAddressSuccess: (state, action: PayloadAction<bigint>) => {
            state.isLoading = false;
            state.shippingAddressId = action.payload;
        },
        selectedShippingAddressFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addOrderItemsRequest: (state) => {
            state.isLoading = true;
        },
        addOrderItemsSuccess: (state, action: PayloadAction<OrderDetails>) => {
            const extractedData = action.payload.orderItems.map((orderItem) => ({
                product: orderItem.product.id,
                quantity: orderItem.quantity
            }));

            return {
                ...state,
                isLoading: false,
                orderItems: extractedData,
                amount: action.payload.amount
            };
        },
        addOrderItemsFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    selectedShippingAddressRequest,
    selectedShippingAddressSuccess,
    selectedShippingAddressFailed,
    addOrderItemsRequest,
    addOrderItemsSuccess,
    addOrderItemsFailed
} = checkoutStepsSlice.actions;
export default checkoutStepsSlice.reducer;
