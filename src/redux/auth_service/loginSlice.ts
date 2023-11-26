import { ErrorResponse, LoginState } from "utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const loginUser = createAsyncThunk(
    "LoginUser",
    async (loginData: object, thunkAPI) => {
        try {
            const { data } = await publicAxiosInstance.post(LOGIN_URI, loginData);
            const userLoginDetails = {
                isLoggedIn: true,
                accessToken: data.tokens.access,
                refreshToken: data.tokens.refresh
            };
            saveItemInStorage(USER_LOGIN_DETAILS, userLoginDetails);
            return true;
        } catch(error) {
            const err = error as ErrorResponse;
            return thunkAPI.rejectWithValue(throwAuthenticationErrorResponse(err));
        }
    }
);

const loginSlice = createSlice({
    name: "userLogin",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default loginSlice.reducer;
