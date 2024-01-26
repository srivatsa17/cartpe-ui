import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    ErrorResponse,
    ShippingAddress,
    ShippingAddressFormData,
    ShippingAddressState
} from "utils/types";
import { SHIPPING_ADDRESS_BY_ID_URI, SHIPPING_ADDRESS_URI } from "constants/api";

import { ADDRESS_LIST } from "constants/localStorage";
import { RootState } from "redux/store";
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

export const editShippingAddress =
    (shippingAddress: ShippingAddress) => async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            dispatch(editShippingAddressRequest());
            await axiosInstance.put(
                SHIPPING_ADDRESS_BY_ID_URI(shippingAddress.id),
                shippingAddress
            );
            await getShippingAddressList()(dispatch, getState);
            dispatch(editShippingAddressSuccess());
            saveItemInStorage(ADDRESS_LIST, getState().address.addressList);
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(editShippingAddressFailed(throwErrorResponse(err)));
        }
    };

export const removeShippingAddress =
    (shippingAddressId: bigint) => async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            dispatch(removeShippingAddressRequest());
            await axiosInstance.delete(SHIPPING_ADDRESS_BY_ID_URI(shippingAddressId));
            await getShippingAddressList()(dispatch, getState);
            dispatch(removeShippingAddressSuccess());
            saveItemInStorage(ADDRESS_LIST, getState().address.addressList);
        } catch (error) {
            const err = error as ErrorResponse;
            dispatch(removeShippingAddressFailed(throwErrorResponse(err)));
        }
    };

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
        },
        editShippingAddressRequest: (state) => {
            state.isLoading = true;
        },
        editShippingAddressSuccess: (state) => {
            state.isLoading = false;
        },
        editShippingAddressFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        removeShippingAddressRequest: (state) => {
            state.isLoading = true;
        },
        removeShippingAddressSuccess: (state) => {
            state.isLoading = false;
        },
        removeShippingAddressFailed: (state, action: PayloadAction<string>) => {
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
    addShippingAddressFailed,
    editShippingAddressRequest,
    editShippingAddressSuccess,
    editShippingAddressFailed,
    removeShippingAddressRequest,
    removeShippingAddressSuccess,
    removeShippingAddressFailed
} = shippingAddressSlice.actions;
export default shippingAddressSlice.reducer;
