import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, Product, ProductDetailsState } from "utils/types";

import { axiosInstance } from "utils/axios";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: ProductDetailsState = {
    isLoading: false,
    product: null,
    error: null
};

export const getProductDetails = (productId: bigint | string) => async (dispatch: Dispatch) => {
    let typeCastedId: bigint;

    if (typeof productId === "string") {
        typeCastedId = BigInt(productId);
    } else {
        typeCastedId = productId;
    }

    try {
        dispatch(productDetailsRequest());
        const { data } = await axiosInstance.get(`products/${typeCastedId}`);
        dispatch(productDetailsSuccess(data));
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(productDetailsFailed(throwErrorResponse(err)));
    }
};

const productDetailsSlice = createSlice({
    name: "getProductDetails",
    initialState: initialState,
    reducers: {
        productDetailsRequest: (state) => {
            state.isLoading = true;
        },
        productDetailsSuccess: (state, action: PayloadAction<Product>) => {
            state.isLoading = false;
            state.product = action.payload;
        },
        productDetailsFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { productDetailsRequest, productDetailsSuccess, productDetailsFailed } =
    productDetailsSlice.actions;
export default productDetailsSlice.reducer;
