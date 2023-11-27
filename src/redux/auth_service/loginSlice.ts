import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, LoginState } from "utils/types";

import { LOGIN_URI } from "constants/api";
import { USER_LOGIN_DETAILS } from "constants/localStorage";
import { publicAxiosInstance } from "utils/axios";
import { saveItemInStorage } from "utils/localStorage";
import { throwAuthenticationErrorResponse } from "utils/errorResponse";

const initialState: LoginState = {
    isLoading: false,
    isLoggedIn: false,
    error: null
};

export const loginUser = (loginData: object) => async (dispatch: Dispatch) => {
    try {
        dispatch(loginUserRequest());
        const { data } = await publicAxiosInstance.post(LOGIN_URI, loginData);
        dispatch(loginUserSuccess(true));
        // dispatch({ type: USER_VERIFY_SUCCESS });
        const userLoginDetails = {
            isLoggedIn: true,
            accessToken: data.tokens.access,
            refreshToken: data.tokens.refresh
        };
        saveItemInStorage(USER_LOGIN_DETAILS, userLoginDetails);
    } catch(error) {
        const err = error as ErrorResponse;
        dispatch(loginUserFailed(throwAuthenticationErrorResponse(err)));
    }
};

const loginSlice = createSlice({
    name: "loginUser",
    initialState: initialState,
    reducers: {
        loginUserRequest: (state) => {
            state.isLoading = true;
        },
        loginUserSuccess: (state, action: PayloadAction<boolean>) => {
            state.isLoading = false;
            state.isLoggedIn = action.payload;
        },
        loginUserFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { loginUserRequest, loginUserSuccess, loginUserFailed } = loginSlice.actions;
export default loginSlice.reducer;
