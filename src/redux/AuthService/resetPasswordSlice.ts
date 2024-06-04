import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, ResetPasswordRequestState } from "utils/types";

import { RESET_PASSWORD_URI } from "constants/api";
import { axiosInstance } from "utils/axios";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: ResetPasswordRequestState = {
    isLoading: false,
    isResetPasswordRequested: false,
    error: null
};

export const resetPasswordRequest =
    (resetPasswordFormData: object) => async (dispatch: Dispatch) => {
        try {
            dispatch(resetPasswordRequested());
            await axiosInstance.post(RESET_PASSWORD_URI, resetPasswordFormData);
            dispatch(resetPasswordRequestedSuccess());
            return Promise.resolve();
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(resetPasswordRequestedFailed(throwErrorResponse(err)));
            return Promise.reject(throwErrorResponse(err));
        }
    };

const resetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState: initialState,
    reducers: {
        resetPasswordRequested: (state) => {
            state.isLoading = true;
        },
        resetPasswordRequestedSuccess: (state) => {
            state.isLoading = false;
            state.isResetPasswordRequested = true;
        },
        resetPasswordRequestedFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    resetPasswordRequested,
    resetPasswordRequestedSuccess,
    resetPasswordRequestedFailed
} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
