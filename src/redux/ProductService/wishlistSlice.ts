import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, WishList, WishListState } from "utils/types";
import { WISHLIST_BY_ID_URI, WISHLIST_URI } from "constants/api";

import { RootState } from "redux/store";
import { WISHLIST } from "constants/localStorage";
import { axiosInstance } from "utils/axios";
import { saveItemInStorage } from "utils/localStorage";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: WishListState = {
    isLoading: false,
    products: [],
    error: null
};

export const getWishList = () => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        dispatch(getWishListRequest());
        const { data } = await axiosInstance.get(WISHLIST_URI);
        dispatch(getWishListSuccess(data));
        saveItemInStorage(WISHLIST, getState().wishlist.products);
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(getWishListFailed(throwErrorResponse(err)));
    }
};

export const addProductToWishList =
    (productId: bigint) => async (dispatch: Dispatch, getState: () => RootState) => {
        const wishListData = {
            product: productId
        };

        try {
            dispatch(addProductToWishlistRequest());
            await axiosInstance.post(WISHLIST_URI, wishListData);
            await getWishList()(dispatch, getState);
            dispatch(addProductToWishlistSuccess());
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(addProductToWishlistFailed(throwErrorResponse(err)));
        }
    };

export const removeProductFromWishList =
    (wishlistId: bigint) => async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            dispatch(removeProductFromWishListRequest());
            await axiosInstance.delete(WISHLIST_BY_ID_URI(wishlistId));
            await getWishList()(dispatch, getState);
            dispatch(removeProductFromWishListSuccess());
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(removeProductFromWishListFailed(throwErrorResponse(err)));
        }
    };

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: initialState,
    reducers: {
        getWishListRequest: (state) => {
            state.isLoading = true;
        },
        getWishListSuccess: (state, action: PayloadAction<Array<WishList>>) => {
            state.isLoading = false;
            state.products = action.payload;
        },
        getWishListFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addProductToWishlistRequest: (state) => {
            state.isLoading = true;
        },
        addProductToWishlistSuccess: (state) => {
            state.isLoading = false;
        },
        addProductToWishlistFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        removeProductFromWishListRequest: (state) => {
            state.isLoading = true;
        },
        removeProductFromWishListSuccess: (state) => {
            state.isLoading = false;
        },
        removeProductFromWishListFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    getWishListRequest,
    getWishListSuccess,
    getWishListFailed,
    addProductToWishlistRequest,
    addProductToWishlistSuccess,
    addProductToWishlistFailed,
    removeProductFromWishListRequest,
    removeProductFromWishListSuccess,
    removeProductFromWishListFailed
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
