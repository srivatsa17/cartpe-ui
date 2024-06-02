import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, LoginState } from "utils/types";
import { GOOGLE_LOGIN_URI, LOGIN_URI, LOGOUT_URI } from "constants/api";
import { axiosInstance, publicAxiosInstance } from "utils/axios";
import { clearStorage, getItemFromStorage, saveItemInStorage } from "utils/localStorage";
import { registerUserReset, verifyUserSuccess } from "./registerSlice";

import { USER_LOGIN_DETAILS } from "constants/localStorage";
import { throwAuthenticationErrorResponse } from "utils/errorResponse";

const initialState: LoginState = {
    email: null,
    firstName: null,
    lastName: null,
    isLoading: false,
    isLoggedIn: false,
    error: null
};

export const loginUser = (loginData: object) => async (dispatch: Dispatch) => {
    try {
        dispatch(loginUserRequest());
        const { data } = await publicAxiosInstance.post(LOGIN_URI, loginData);
        dispatch(loginUserSuccess(data));
        dispatch(verifyUserSuccess());
        const userLoginDetails = {
            isLoggedIn: true,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            accessToken: data.tokens.access,
            refreshToken: data.tokens.refresh
        };
        saveItemInStorage(USER_LOGIN_DETAILS, userLoginDetails);
        return Promise.resolve();
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(loginUserFailed(throwAuthenticationErrorResponse(err)));
        return Promise.reject(throwAuthenticationErrorResponse(err));
    }
};

export const googleLoginUser = (code: string) => async (dispatch: Dispatch) => {
    const googleLoginData = {
        code: code
    };

    try {
        dispatch(loginUserRequest());
        const { data } = await publicAxiosInstance.post(GOOGLE_LOGIN_URI, googleLoginData);
        dispatch(loginUserSuccess(data));
        dispatch(verifyUserSuccess());
        const userLoginDetails = {
            isLoggedIn: true,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            accessToken: data.tokens.access,
            refreshToken: data.tokens.refresh
        };
        saveItemInStorage(USER_LOGIN_DETAILS, userLoginDetails);
        return Promise.resolve();
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(loginUserFailed(throwAuthenticationErrorResponse(err)));
        return Promise.reject(throwAuthenticationErrorResponse(err));
    }
};

export const logoutUser = () => async (dispatch: Dispatch) => {
    const loginDetails = getItemFromStorage(USER_LOGIN_DETAILS);
    const refreshToken = loginDetails ? loginDetails.refreshToken : null;

    try {
        dispatch(logoutUserRequest());
        // eslint-disable-next-line camelcase
        const logoutData = { refresh_token: refreshToken };
        await axiosInstance.post(LOGOUT_URI, logoutData);
        dispatch(logoutUserSuccess());
        dispatch(registerUserReset());
        clearStorage();
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(logoutUserFailed(throwAuthenticationErrorResponse(err)));
    }
};

const loginSlice = createSlice({
    name: "loginUser",
    initialState: initialState,
    reducers: {
        loginUserRequest: (state) => {
            state.isLoading = true;
        },
        loginUserSuccess: (state, action: PayloadAction<LoginState>) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        },
        loginUserFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logoutUserRequest: (state) => {
            state.isLoading = true;
        },
        logoutUserSuccess: (state) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.email = null;
            state.firstName = null;
            state.lastName = null;
        },
        logoutUserFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    loginUserRequest,
    loginUserSuccess,
    loginUserFailed,
    logoutUserRequest,
    logoutUserSuccess,
    logoutUserFailed
} = loginSlice.actions;
export default loginSlice.reducer;
