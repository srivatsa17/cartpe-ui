import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, ProductReview, ProductReviewState } from "utils/types";
import { PRODUCT_REVIEW_BY_ID_URI, PRODUCT_REVIEW_URI } from "constants/api";

import { axiosInstance } from "utils/axios";
import { getProductRating } from "./productRatingSlice";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: ProductReviewState = {
    isLoading: false,
    productReviews: [],
    error: null
};

type ProductReviewFormData = Omit<
    ProductReview,
    "id" | "user" | "userFullName" | "createdAt" | "updatedAt"
>;

export const getProductReviewList = (productId: bigint | string) => async (dispatch: Dispatch) => {
    let typeCastedProductId: bigint;

    if (typeof productId === "string") {
        typeCastedProductId = BigInt(productId);
    } else {
        typeCastedProductId = productId;
    }

    try {
        dispatch(getProductReviewListRequest());
        const { data } = await axiosInstance.get(PRODUCT_REVIEW_URI(typeCastedProductId));
        dispatch(getProductReviewListSuccess(data));
        return Promise.resolve();
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(getProductReviewListFailed(throwErrorResponse(err)));
        return Promise.reject(err);
    }
};

export const postProductReview =
    (productReviewData: ProductReviewFormData, productId: bigint) => async (dispatch: Dispatch) => {
        try {
            dispatch(postProductReviewRequest());
            await axiosInstance.post(PRODUCT_REVIEW_URI(productId), productReviewData);
            await getProductReviewList(productId)(dispatch);
            await getProductRating(productId)(dispatch);
            dispatch(postProductReviewSuccess());
            return Promise.resolve();
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(postProductReviewFailed(throwErrorResponse(err)));
            return Promise.reject(err);
        }
    };

/* eslint-disable @stylistic/js/indent */
export const updateProductReview =
    (productReviewData: ProductReviewFormData, productId: bigint, productReviewId: bigint) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(updateProductReviewRequest());
            await axiosInstance.patch(
                PRODUCT_REVIEW_BY_ID_URI(productId, productReviewId),
                productReviewData
            );
            await getProductReviewList(productId)(dispatch);
            await getProductRating(productId)(dispatch);
            dispatch(updateProductReviewSuccess());
            return Promise.resolve();
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(updateProductReviewFailed(throwErrorResponse(err)));
            return Promise.reject(err);
        }
    };
/* eslint-enable @stylistic/js/indent */

export const deleteProductReview =
    (productId: bigint, productReviewId: bigint) => async (dispatch: Dispatch) => {
        try {
            dispatch(deleteProductReviewRequest());
            await axiosInstance.delete(PRODUCT_REVIEW_BY_ID_URI(productId, productReviewId));
            await getProductReviewList(productId)(dispatch);
            await getProductRating(productId)(dispatch);
            dispatch(deleteProductReviewSuccess());
            return Promise.resolve();
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(deleteProductReviewFailed(throwErrorResponse(err)));
            return Promise.reject(err);
        }
    };

const productReviewSlice = createSlice({
    name: "productReview",
    initialState: initialState,
    reducers: {
        getProductReviewListRequest: (state) => {
            state.isLoading = true;
        },
        getProductReviewListSuccess: (state, action: PayloadAction<Array<ProductReview>>) => {
            state.isLoading = false;
            state.productReviews = action.payload;
        },
        getProductReviewListFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        postProductReviewRequest: (state) => {
            state.isLoading = true;
        },
        postProductReviewSuccess: (state) => {
            state.isLoading = false;
        },
        postProductReviewFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateProductReviewRequest: (state) => {
            state.isLoading = true;
        },
        updateProductReviewSuccess: (state) => {
            state.isLoading = false;
        },
        updateProductReviewFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        deleteProductReviewRequest: (state) => {
            state.isLoading = true;
        },
        deleteProductReviewSuccess: (state) => {
            state.isLoading = false;
        },
        deleteProductReviewFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    getProductReviewListRequest,
    getProductReviewListSuccess,
    getProductReviewListFailed,
    postProductReviewRequest,
    postProductReviewSuccess,
    postProductReviewFailed,
    updateProductReviewRequest,
    updateProductReviewSuccess,
    updateProductReviewFailed,
    deleteProductReviewRequest,
    deleteProductReviewSuccess,
    deleteProductReviewFailed
} = productReviewSlice.actions;
export default productReviewSlice.reducer;
