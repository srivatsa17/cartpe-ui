import { CheckoutStepsState, ErrorResponse } from "utils/types";
import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { throwErrorResponse } from "utils/errorResponse";

const initialState: CheckoutStepsState = {
    isLoading: false,
    shippingAddressId: null,
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
        }
    }
});

export const {
    selectedShippingAddressRequest,
    selectedShippingAddressSuccess,
    selectedShippingAddressFailed
} = checkoutStepsSlice.actions;
export default checkoutStepsSlice.reducer;
