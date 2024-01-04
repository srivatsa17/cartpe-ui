import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    ErrorResponse,
    ShippingAddress,
    ShippingAddressFormData,
    ShippingAddressState
} from "utils/types";

import { ADDRESS_LIST } from "constants/localStorage";
import { RootState } from "redux/store";
import { SHIPPING_ADDRESS_URI } from "constants/api";
import { axiosInstance } from "utils/axios";
import { saveItemInStorage } from "utils/localStorage";
import { throwErrorResponse } from "utils/errorResponse";

const initialState: ShippingAddressState = {
    isLoading: false,
    addressList: [],
    error: null
};

export const getShippingAddressList =
    () => async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            dispatch(getShippingAddressListRequest());
            const { data } = await axiosInstance.get(SHIPPING_ADDRESS_URI);
            dispatch(getShippingAddressListSuccess(data));
            saveItemInStorage(ADDRESS_LIST, getState().address.addressList);
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(getShippingAddressListFailed(throwErrorResponse(err)));
        }
    };

/* eslint-disable @stylistic/js/indent */
export const addShippingAddress =
    (shippingAddress: ShippingAddressFormData) =>
    async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            dispatch(addShippingAddressRequest());
            await axiosInstance.post(SHIPPING_ADDRESS_URI, shippingAddress);
            await getShippingAddressList()(dispatch, getState);
            dispatch(addShippingAddressSuccess());
            saveItemInStorage(ADDRESS_LIST, getState().address.addressList);
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(addShippingAddressFailed(throwErrorResponse(err)));
        }
    };
/* eslint-enable @stylistic/js/indent */

const shippingAddressSlice = createSlice({
    name: "shippingAddress",
    initialState: initialState,
    reducers: {
        getShippingAddressListRequest: (state) => {
            state.isLoading = true;
        },
        getShippingAddressListSuccess: (state, action: PayloadAction<Array<ShippingAddress>>) => {
            state.isLoading = false;
            state.addressList = action.payload;
        },
        getShippingAddressListFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addShippingAddressRequest: (state) => {
            state.isLoading = true;
        },
        addShippingAddressSuccess: (state) => {
            state.isLoading = false;
        },
        addShippingAddressFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    getShippingAddressListRequest,
    getShippingAddressListSuccess,
    getShippingAddressListFailed,
    addShippingAddressRequest,
    addShippingAddressSuccess,
    addShippingAddressFailed
} = shippingAddressSlice.actions;
export default shippingAddressSlice.reducer;
