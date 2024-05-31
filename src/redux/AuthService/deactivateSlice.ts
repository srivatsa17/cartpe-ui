import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { DEACTIVATE_URI } from "constants/api";
import { ErrorResponse } from "utils/types";
import { USER_LOGIN_DETAILS } from "constants/localStorage";
import { axiosInstance } from "utils/axios";
import { getItemFromStorage } from "utils/localStorage";
import { throwErrorResponse } from "utils/errorResponse";

type DeactivateUser = {
    isLoading: boolean;
    error: string | null;
}

const initialState: DeactivateUser = {
    isLoading: false,
    error: null
};

export const deactivateUser = () => async (dispatch: Dispatch) => {
    const loginDetails = getItemFromStorage(USER_LOGIN_DETAILS);
    const refreshToken = loginDetails ? loginDetails.refreshToken : null;
    const deactivateData = {
        // eslint-disable-next-line camelcase
        refresh_token: refreshToken
    };

    try {
        dispatch(deactivateRequest());
        await axiosInstance.patch(DEACTIVATE_URI, deactivateData);
        dispatch(deactivateSuccess());
        return Promise.resolve();
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(deactivateFailed(throwErrorResponse(err)));
        return Promise.reject(throwErrorResponse(err));
    }
};

const deactivateSlice = createSlice({
    name: "deactivate",
    initialState: initialState,
    reducers: {
        deactivateRequest: (state) => {
            state.isLoading = true;
        },
        deactivateSuccess: (state) => {
            state.isLoading = false;
        },
        deactivateFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    deactivateRequest,
    deactivateSuccess,
    deactivateFailed
} = deactivateSlice.actions;
export default deactivateSlice.reducer;
