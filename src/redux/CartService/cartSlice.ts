import { CART_BY_ID_URI, CART_URI } from "constants/api";
import { Cart, CartState, ErrorResponse, Product } from "utils/types";
import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CART_ITEMS } from "constants/localStorage";
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

/* eslint-disable @stylistic/js/indent */
export const addCartItem =
    (product: Product, quantity: number = 1) =>
    async (dispatch: Dispatch, getState: () => RootState) => {
        const cartData = { product: product, quantity: quantity };

        try {
            dispatch(addCartItemRequest());
            await axiosInstance.post(CART_URI, cartData);
            dispatch(addCartItemSuccess(cartData));
            saveItemInStorage(CART_ITEMS, getState().cart.cartItems);
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(addCartItemFailed(throwErrorResponse(err)));
        }
    };
/* eslint-enable @stylistic/js/indent */

/* eslint-disable @stylistic/js/indent */
export const updateCartItem =
    (productId: bigint, quantity: number) =>
    async (dispatch: Dispatch, getState: () => RootState) => {
        const updateCartQuantityData = { quantity: quantity };

        try {
            dispatch(updateCartItemRequest());
            const { data } = await axiosInstance.patch(
                CART_BY_ID_URI(productId),
                updateCartQuantityData
            );
            dispatch(updateCartItemSuccess(data));
            saveItemInStorage(CART_ITEMS, getState().cart.cartItems);
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(updateCartItemFailed(throwErrorResponse(err)));
        }
    };
/* eslint-enable @stylistic/js/indent */

export const removeCartItem =
    (productId: bigint) => async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            dispatch(removeCartItemRequest());
            const { data } = await axiosInstance.delete(CART_BY_ID_URI(productId));
            dispatch(removeCartItemSuccess(data));
            saveItemInStorage(CART_ITEMS, getState().cart.cartItems);
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(removeCartItemFailed(throwErrorResponse(err)));
        }
    };

export const emptyCart = () => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        dispatch(emptyCartRequest());
        await axiosInstance.delete(CART_URI);
        dispatch(emptyCartSuccess());
        saveItemInStorage(CART_ITEMS, getState().cart.cartItems);
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(emptyCartFailed(throwErrorResponse(err)));
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
        },
        addCartItemRequest: (state) => {
            state.isLoading = true;
        },
        addCartItemSuccess: (state, action: PayloadAction<Cart>) => {
            const isProductInCart = state.cartItems.some(
                (cartItem) => cartItem.product.id === action.payload.product.id
            );

            if (!isProductInCart) {
                return {
                    ...state,
                    isLoading: false,
                    cartItems: [...state.cartItems, action.payload]
                };
            }
            return state;
        },
        addCartItemFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateCartItemRequest: (state) => {
            state.isLoading = true;
        },
        updateCartItemSuccess: (state, action: PayloadAction<CartState>) => {
            state.isLoading = false;
            state.cartItems = action.payload.cartItems;
        },
        updateCartItemFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        removeCartItemRequest: (state) => {
            state.isLoading = true;
        },
        removeCartItemSuccess: (state, action: PayloadAction<CartState>) => {
            state.isLoading = false;
            state.cartItems = action.payload.cartItems;
        },
        removeCartItemFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        emptyCartRequest: (state) => {
            state.isLoading = true;
        },
        emptyCartSuccess: (state) => {
            state.isLoading = false;
            state.cartItems = [];
        },
        emptyCartFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    getCartItemsRequest,
    getCartItemsSuccess,
    getCartItemsFailed,
    addCartItemRequest,
    addCartItemSuccess,
    addCartItemFailed,
    updateCartItemRequest,
    updateCartItemSuccess,
    updateCartItemFailed,
    removeCartItemRequest,
    removeCartItemSuccess,
    removeCartItemFailed,
    emptyCartRequest,
    emptyCartSuccess,
    emptyCartFailed
} = cartSlice.actions;
export default cartSlice.reducer;
