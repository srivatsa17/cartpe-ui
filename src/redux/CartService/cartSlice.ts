import { CartState, ErrorResponse } from "utils/types";
import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CART_ITEMS } from "constants/localStorage";
import { CART_URI } from "constants/api";
import { RootState } from "redux/store";
import { axiosInstance } from "utils/axios";
import { saveItemInStorage } from "utils/localStorage";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: CartState = {
    isLoading: false,
    cartItems: [],
    error: null
};

export const getCartItems = () => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        dispatch(getCartItemsRequest());
        const { data } = await axiosInstance.get(CART_URI);
        dispatch(getCartItemsSuccess(data));
        saveItemInStorage(CART_ITEMS, getState().cart.cartItems);
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(getCartItemsFailed(throwErrorResponse(err)));
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        getCartItemsRequest: (state) => {
            state.isLoading = true;
        },
        getCartItemsSuccess: (state, action: PayloadAction<CartState>) => {
            state.isLoading = false;
            state.cartItems = action.payload.cartItems;
        },
        getCartItemsFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { getCartItemsRequest, getCartItemsSuccess, getCartItemsFailed } = cartSlice.actions;
export default cartSlice.reducer;
