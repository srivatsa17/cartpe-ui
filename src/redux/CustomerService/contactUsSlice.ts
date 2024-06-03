import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CONTACT_US } from "constants/api";
import { ErrorResponse } from "utils/types";
import { axiosInstance } from "utils/axios";
import { throwErrorResponse } from "utils/errorResponse";

type ContactUs = {
    isLoading: boolean;
    error: string | null;
};

const initialState: ContactUs = {
    isLoading: false,
    error: null
};

export const contactUs = (contactUsFormData: object) => async (dispatch: Dispatch) => {
    try {
        dispatch(contactUsRequest());
        await axiosInstance.post(CONTACT_US, contactUsFormData);
        dispatch(contactUsSuccess());
        return Promise.resolve();
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(contactUsFailed(throwErrorResponse(err)));
        return Promise.reject(throwErrorResponse(err));
    }
};

const contactUsSlice = createSlice({
    name: "contactUs",
    initialState: initialState,
    reducers: {
        contactUsRequest: (state) => {
            state.isLoading = true;
        },
        contactUsSuccess: (state) => {
            state.isLoading = false;
        },
        contactUsFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { contactUsRequest, contactUsSuccess, contactUsFailed } = contactUsSlice.actions;
export default contactUsSlice.reducer;
