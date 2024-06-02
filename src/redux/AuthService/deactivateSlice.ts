import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { clearStorage, getItemFromStorage } from "utils/localStorage";

import { DEACTIVATE_URI } from "constants/api";
import { ErrorResponse } from "utils/types";
import { USER_LOGIN_DETAILS } from "constants/localStorage";
import { axiosInstance } from "utils/axios";
import { logoutUserSuccess } from "./loginSlice";
import { registerUserReset } from "./registerSlice";
import { throwErrorResponse } from "utils/errorResponse";

type DeactivateUser = {
    isLoading: boolean;
    isDeactivated: boolean;
    error: string | null;
};

const initialState: DeactivateUser = {
    isLoading: false,
    isDeactivated: false,
    error: null
};

export const deactivateAccount = () => async (dispatch: Dispatch) => {
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
        dispatch(registerUserReset());
        dispatch(logoutUserSuccess());
        clearStorage();
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
            state.isDeactivated = true;
        },
        deactivateFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { deactivateRequest, deactivateSuccess, deactivateFailed } = deactivateSlice.actions;
export default deactivateSlice.reducer;
