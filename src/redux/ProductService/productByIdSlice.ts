import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, Product, ProductDetailsState } from "utils/types";

import { axiosInstance } from "utils/axios";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: ProductDetailsState = {
    isLoading: false,
    product: {},
    error: null
};

export const getProductDetails = (id: bigint) => async (dispatch: Dispatch) => {
    try {
        dispatch(productDetailsRequest());
        const { data } = await axiosInstance.get(`products/${id}`);
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
            state.product = {};
        },
        productDetailsSuccess: (state, action: PayloadAction<ProductDetailsState>) => {
            state.isLoading = false;
            state.product = action.payload as Partial<Product>;
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
