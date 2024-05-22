import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, ProductReview, ProductReviewState } from "utils/types";

import { PRODUCT_REVIEW_URI } from "constants/api";
import { axiosInstance } from "utils/axios";
import { getProductDetails } from "./productByIdSlice";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: ProductReviewState = {
    isLoading: false,
    error: null
};

export const postProductReview =
    (productReviewData: Omit<ProductReview, "id" | "user" | "userFullName" | "createdAt" | "updatedAt">) => async (dispatch: Dispatch) => {
        try {
            dispatch(postProductReviewRequest());
            await axiosInstance.post(PRODUCT_REVIEW_URI, productReviewData);
            await getProductDetails(productReviewData.product)(dispatch);
            dispatch(postProductReviewSuccess());
            return Promise.resolve();
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(postProductReviewFailed(throwErrorResponse(err)));
            return Promise.reject(err);
        }
    };

const productReviewSlice = createSlice({
    name: "postProductReview",
    initialState: initialState,
    reducers: {
        postProductReviewRequest: (state) => {
            state.isLoading = true;
        },
        postProductReviewSuccess: (state) => {
            state.isLoading = false;
        },
        postProductReviewFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { postProductReviewRequest, postProductReviewSuccess, postProductReviewFailed } =
    productReviewSlice.actions;
export default productReviewSlice.reducer;
