import { CategorySearchState, ErrorResponse } from "utils/types";
import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SEARCH_CATEGORIES_URI } from "constants/api";
import { axiosInstance } from "utils/axios";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: CategorySearchState = {
    isLoading: false,
    categories: [],
    error: null
};

export const getSearchedCategories = (searchedCategory: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(categorySearchRequest());
        const { data } = await axiosInstance.get(`${SEARCH_CATEGORIES_URI}?q=${searchedCategory}`);
        dispatch(categorySearchSuccess(data));
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(categorySearchFailed(throwErrorResponse(err)));
    }
};

const searchedCategorySlice = createSlice({
    name: "searchedCategory",
    initialState: initialState,
    reducers: {
        categorySearchRequest: (state) => {
            state.isLoading = true;
        },
        categorySearchSuccess: (state, action: PayloadAction<Array<object> | []>) => {
            state.isLoading = false;
            state.categories = action.payload;
        },
        categorySearchFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { categorySearchRequest, categorySearchSuccess, categorySearchFailed } =
    searchedCategorySlice.actions;
export default searchedCategorySlice.reducer;
