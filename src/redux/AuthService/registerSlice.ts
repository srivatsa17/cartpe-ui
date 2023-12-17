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

type registerForm = {
    fullName: string;
    email: string;
    password: string;
};

const splitFullName = (fullName: string) => {
    const pattern: RegExp = /^([A-Za-z]+)\s+([A-Za-z\s]+?) *$/;
    const match = pattern.exec(fullName);
    if (match) {
        return {
            firstName: match[1],
            lastName: match[2]
        };
    }
    return {
        firstName: "",
        lastName: ""
    };
};

export const registerUser = (registerForm: registerForm) => async (dispatch: Dispatch) => {
    try {
        const { firstName, lastName } = splitFullName(registerForm.fullName);
        const registerData = {
            email: registerForm.email,
            password: registerForm.password,
            // eslint-disable-next-line camelcase
            first_name: firstName,
            // eslint-disable-next-line camelcase
            last_name: lastName
        };
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
        },
        verifyUserRequest: (state) => {
            state.isLoading = true;
        },
        verifyUserSuccess: (state) => {
            state.isLoading = false;
            state.isRegistered = true;
            state.isVerified = true;
        },
        verifyUserFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        registerUserReset: (state) => {
            state.isLoading = false;
            state.isRegistered = false;
            state.isVerified = false;
        }
    }
});

export const {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailed,
    verifyUserRequest,
    verifyUserSuccess,
    verifyUserFailed,
    registerUserReset
} = registerSlice.actions;
export default registerSlice.reducer;
