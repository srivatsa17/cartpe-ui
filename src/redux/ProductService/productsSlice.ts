import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, ProductListState } from "utils/types";

import { PRODUCT_LIST } from "constants/localStorage";
import { PRODUCT_LIST_URI } from "constants/api";
import { RootState } from "redux/store";
import { axiosInstance } from "utils/axios";
import { saveItemInStorage } from "utils/localStorage";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: ProductListState = {
    isLoading: false,
    products: [],
    searchedCategory: "",
    error: null
};

export const getProducts =
    (searchedCategory: string) => async (dispatch: Dispatch, getState: () => RootState) => {
        const params = {
            params: {
                category: searchedCategory ?? ""
            }
        };

        try {
            dispatch(productListRequest());
            const { data } = await axiosInstance.get(PRODUCT_LIST_URI, params);
            const payload: Omit<ProductListState, "isLoading" | "error"> = {
                products: data,
                searchedCategory: searchedCategory
            };
            dispatch(productListSuccess(payload));
            saveItemInStorage(PRODUCT_LIST, getState().productList);
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(productListFailed(throwErrorResponse(err)));
        }
    };

const productListSlice = createSlice({
    name: "getProductList",
    initialState: initialState,
    reducers: {
        productListRequest: (state) => {
            state.isLoading = true;
            state.products = [];
        },
        productListSuccess: (state, action: PayloadAction<Omit<ProductListState, "isLoading" | "error">>) => {
            state.isLoading = false;
            state.products = action.payload.products;
            state.searchedCategory = action.payload.searchedCategory;
        },
        productListFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { productListRequest, productListSuccess, productListFailed } =
    productListSlice.actions;
export default productListSlice.reducer;
