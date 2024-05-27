import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, RegisterState } from "utils/types";
import { GOOGLE_REGISTER_URI, REGISTER_URI, VERIFY_EMAIL } from "constants/api";
import { USER_LOGIN_DETAILS, USER_REGISTER_DETAILS } from "constants/localStorage";
import { saveItemInStorage, updateItemInStorage } from "utils/localStorage";
import { throwAuthenticationErrorResponse, throwErrorResponse } from "utils/errorResponse";

import { loginUserSuccess } from "./loginSlice";
import { publicAxiosInstance } from "utils/axios";

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
        return Promise.resolve();
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(registerUserFailed(throwAuthenticationErrorResponse(err)));
        return Promise.reject(throwErrorResponse(err));
    }
};

export const googleRegisterUser = (code: string) => async (dispatch: Dispatch) => {
    try {
        const googleRegisterData = {
            code: code
        };

        dispatch(googleRegisterUserRequest());
        const { data } = await publicAxiosInstance.post(GOOGLE_REGISTER_URI, googleRegisterData);
        dispatch(googleRegisterUserSuccess());
        dispatch(loginUserSuccess(data));
        const userRegisterData = {
            isRegistered: true,
            isVerified: true,
            userDetails: data
        };
        saveItemInStorage(USER_REGISTER_DETAILS, userRegisterData);
        const userLoginDetails = {
            isLoggedIn: true,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            profilePicture: data.profilePicture,
            accessToken: data.tokens.access,
            refreshToken: data.tokens.refresh
        };
        saveItemInStorage(USER_LOGIN_DETAILS, userLoginDetails);
        return Promise.resolve();
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(googleRegisterUserFailed(throwAuthenticationErrorResponse(err)));
        return Promise.reject(throwErrorResponse(err));
    }
};

export const verifyUserEmail = (id: string, token: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(verifyUserRequest());
        const verifyUserEmailData = { uid: id, token: token };
        await publicAxiosInstance.patch(VERIFY_EMAIL, verifyUserEmailData);
        dispatch(verifyUserSuccess());
        const updateData = {
            isUserVerified: true
        };
        updateItemInStorage(USER_REGISTER_DETAILS, updateData);
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(verifyUserFailed(throwAuthenticationErrorResponse(err)));
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
        googleRegisterUserRequest: (state) => {
            state.isLoading = true;
        },
        googleRegisterUserSuccess: (state) => {
            state.isLoading = false;
            state.isRegistered = true;
            state.isVerified = true;
        },
        googleRegisterUserFailed: (state, action: PayloadAction<string>) => {
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
    googleRegisterUserRequest,
    googleRegisterUserSuccess,
    googleRegisterUserFailed,
    verifyUserRequest,
    verifyUserSuccess,
    verifyUserFailed,
    registerUserReset
} = registerSlice.actions;
export default registerSlice.reducer;
