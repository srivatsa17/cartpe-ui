import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, RegisterState } from "utils/types";

import { REGISTER_URI } from "constants/api";
import { USER_REGISTER_DETAILS } from "constants/localStorage";
import { publicAxiosInstance } from "utils/axios";
import { saveItemInStorage } from "utils/localStorage";
import { throwAuthenticationErrorResponse } from "utils/errorResponse";

const initialState: RegisterState = {
    isLoading: false,
    isRegistered: false,
    isVerified: false,
    error: null
};

export const registerUser = (registerData: object) => async (dispatch: Dispatch) => {
    try {
        dispatch(registerUserRequest());
        const { data } = await publicAxiosInstance.post(REGISTER_URI, registerData);
        dispatch(registerUserSuccess());
        const storageData = {
            isRegistered: true,
            isVerified: false,
            userDetails: data
        };
        saveItemInStorage(USER_REGISTER_DETAILS, storageData);
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(registerUserFailed(throwAuthenticationErrorResponse(err)));
    }
};

const registerSlice = createSlice({
    name: "registerUser",
    initialState: initialState,
    reducers: {
        registerUserRequest: (state) => {
            state.isLoading = true;
        },
        registerUserSuccess: (state) => {
            state.isLoading = false;
            state.isRegistered = true;
            state.isVerified = false;
        },
        registerUserFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailed
} = registerSlice.actions;
export default registerSlice.reducer;
