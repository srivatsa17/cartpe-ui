import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, ProfileState, User } from "utils/types";

import { CalendarDate } from "@nextui-org/react";
import { PROFILE_DETAILS } from "constants/localStorage";
import { PROFILE_URI } from "constants/api";
import { axiosInstance } from "utils/axios";
import { saveItemInStorage } from "utils/localStorage";
import { splitFullName } from "utils/getFirstAndLastName";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: ProfileState = {
    isLoading: false,
    user: null,
    error: null
};

type EditProfileFormData = {
    fullName: string;
    gender: "Male" | "Female" | "Others" | null;
    phone: string;
    dateOfBirth: CalendarDate | null;
};

type APIInputData = {
    firstName: string;
    lastName: string;
    gender: "Male" | "Female" | "Others" | null;
    phone: string;
    dateOfBirth: string;
};

export const getProfile = () => async (dispatch: Dispatch) => {
    try {
        dispatch(getProfileRequest());
        const { data } = await axiosInstance.get(PROFILE_URI);
        dispatch(getProfileSuccess(data));
        saveItemInStorage(PROFILE_DETAILS, data);
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(getProfileFailed(throwErrorResponse(err)));
    }
};

export const editProfile = (editProfileData: EditProfileFormData) => async (dispatch: Dispatch) => {
    const { firstName, lastName } = splitFullName(editProfileData.fullName);

    const inputData: Partial<APIInputData> = {};

    // Add firstName and lastName if it is defined and not null
    if (firstName && lastName) {
        inputData.firstName = firstName;
        inputData.lastName = lastName;
    }

    // Add gender if it is defined and not null
    if (editProfileData.gender) {
        inputData.gender = editProfileData.gender;
    }

    // Add phone if it is defined and not null
    if (editProfileData.phone && editProfileData.phone.length) {
        inputData.phone = editProfileData.phone;
    }

    // Add date of birth in format "yyyy-mm-dd" if it is defined and not null
    if (editProfileData.dateOfBirth) {
        inputData.dateOfBirth = editProfileData.dateOfBirth.toString();
    }

    try {
        dispatch(editProfileRequest());
        const { data } = await axiosInstance.patch(PROFILE_URI, inputData);
        dispatch(editProfileSuccess(data));
        saveItemInStorage(PROFILE_DETAILS, data);
        return Promise.resolve();
    } catch (error) {
        const err = error as ErrorResponse;
        dispatch(editProfileFailed(throwErrorResponse(err)));
        return Promise.reject(throwErrorResponse(err));
    }
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        getProfileRequest: (state) => {
            state.isLoading = true;
        },
        getProfileSuccess: (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        getProfileFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        editProfileRequest: (state) => {
            state.isLoading = true;
        },
        editProfileSuccess: (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        editProfileFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    getProfileRequest,
    getProfileSuccess,
    getProfileFailed,
    editProfileRequest,
    editProfileSuccess,
    editProfileFailed
} = profileSlice.actions;
export default profileSlice.reducer;
