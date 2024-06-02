import { ChangePasswordState, ErrorResponse } from "utils/types";
import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CHANGE_PASSWORD_URI } from "constants/api";
import { axiosInstance } from "utils/axios";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: ChangePasswordState = {
    isLoading: false,
    isPasswordChanged: false,
    error: null
};

export const changePassword = (changePasswordFormData: object) => async (dispatch: Dispatch) => {
    try {
        dispatch(changePasswordRequest());
        await axiosInstance.patch(CHANGE_PASSWORD_URI, changePasswordFormData);
        dispatch(changePasswordSuccess());
        return Promise.resolve();
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(changePasswordFailed(throwErrorResponse(err)));
        return Promise.reject(throwErrorResponse(err));
    }
};

const changePasswordSlice = createSlice({
    name: "changePassword",
    initialState: initialState,
    reducers: {
        changePasswordRequest: (state) => {
            state.isLoading = true;
        },
        changePasswordSuccess: (state) => {
            state.isLoading = false;
            state.isPasswordChanged = true;
        },
        changePasswordFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { changePasswordRequest, changePasswordSuccess, changePasswordFailed } =
    changePasswordSlice.actions;
export default changePasswordSlice.reducer;
