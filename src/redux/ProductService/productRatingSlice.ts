import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, ProductRating, ProductRatingState } from "utils/types";

import { PRODUCT_RATING_URI } from "constants/api";
import { axiosInstance } from "utils/axios";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: ProductRatingState = {
    isLoading: false,
    productRating: {
        ratingAverage: 0,
        ratingCount: 0,
        ratingDistribution: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        }
    },
    error: null
};

export const getProductRating = (productId: bigint | string) => async (dispatch: Dispatch) => {
    let typeCastedProductId: bigint;

    if (typeof productId === "string") {
        typeCastedProductId = BigInt(productId);
    } else {
        typeCastedProductId = productId;
    }

    try {
        dispatch(getProductRatingRequest());
        const { data } = await axiosInstance.get(PRODUCT_RATING_URI(typeCastedProductId));
        dispatch(getProductRatingSuccess(data));
        return Promise.resolve();
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(getProductRatingFailed(throwErrorResponse(err)));
        return Promise.reject(err);
    }
};

const productRatingSlice = createSlice({
    name: "productRating",
    initialState: initialState,
    reducers: {
        getProductRatingRequest: (state) => {
            state.isLoading = true;
        },
        getProductRatingSuccess: (state, action: PayloadAction<ProductRating>) => {
            state.isLoading = false;
            state.productRating = action.payload;
        },
        getProductRatingFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { getProductRatingRequest, getProductRatingSuccess, getProductRatingFailed } =
    productRatingSlice.actions;
export default productRatingSlice.reducer;
