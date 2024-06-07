import * as yup from "yup";

import { NestedOmit, ShippingAddress, ShippingAddressType } from "utils/types";

import { getIndianStates } from "utils/getIndianStates";

export function useShippingAddress() {
    const addressTypeOptions = ["Home", "Work", "Other"];
    const { indianStates } = getIndianStates();
    const initialAddNewAddressFormData: NestedOmit<
        ShippingAddress,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "user"
        | "address.id"
        | "address.createdAt"
        | "address.updatedAt"
    > = {
        name: "",
        alternatePhone: "",
        type: addressTypeOptions[0] as ShippingAddressType,
        isDefault: false,
        address: {
            building: "",
            area: "",
            city: "",
            state: "",
            country: "India",
            pinCode: ""
        }
    };

    const indianStateKeys = indianStates.map((state) => {
        return state.key;
    });

    const shippingAddressSchema = yup.object().shape({
        name: yup
            .string()
            .trim()
            .matches(/^[a-zA-Z0-9\s]+$/, "Enter a valid First Name.")
            .min(2, "Length is too short.")
            .max(200, "Length is too long.")
            .required("Name is required."),
        alternatePhone: yup
            .string()
            .trim()
            .matches(/^\d+$/, "Phone number must contain only digits.")
            .length(10, "Phone number must have exactly 10 digits.")
            .required("Phone number is required."),
        type: yup
            .string()
            .default("Home")
            .required()
            .oneOf(addressTypeOptions, "Address type is required."),
        isDefault: yup.bool().oneOf([true, false]).required(),
        address: yup.object().shape({
            building: yup
                .string()
                .trim()
                .min(2, "Length is too short.")
                .max(200, "Length is too long.")
                .required("Building Name is required."),
            area: yup
                .string()
                .trim()
                .min(2, "Length is too short.")
                .max(200, "Length is too long.")
                .required("Area Name is required."),
            city: yup
                .string()
                .trim()
                .min(2, "Length is too short.")
                .max(150, "Length is too long.")
                .matches(/^[a-zA-Z0-9]+$/, "Enter a valid city name.")
                .required("City is required."),
            state: yup
                .string()
                .trim()
                .oneOf(indianStateKeys, "Enter a valid Indian state.")
                .required("State is required."),
            pinCode: yup
                .string()
                .trim()
                .matches(/^\d+$/, "Pin code must contain only digits.")
                .length(6, "Pin code must have exactly 6 digits.")
                .required("Pin code is required.")
        })
    });

    return {
        shippingAddressSchema,
        initialAddNewAddressFormData,
        addressTypeOptions,
        indianStates,
        indianStateKeys
    };
}
