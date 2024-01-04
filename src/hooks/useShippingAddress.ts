import * as yup from "yup";

import { getIndianStates } from "utils/getIndianStates";

export function useShippingAddress() {
    const addressTypeOptions = ["Home", "Work", "Other"];
    const { indianStates } = getIndianStates();
    const initialAddNewAddressFormData = {
        name: "",
        // eslint-disable-next-line camelcase
        alternate_phone: "",
        type: "Home",
        // eslint-disable-next-line camelcase
        is_default: false,
        address: {
            line1: "",
            line2: "",
            city: "",
            state: "",
            country: "India",
            // eslint-disable-next-line camelcase
            pin_code: ""
        }
    };

    const shippingAddressSchema = yup.object().shape({
        name: yup
            .string()
            .trim()
            .matches(/^[a-zA-Z0-9\s]+$/, "Enter a valid First Name.")
            .min(2, "Length is too short.")
            .max(200, "Length is too long.")
            .required("Name is required."),
        // eslint-disable-next-line camelcase
        alternate_phone: yup
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
        // eslint-disable-next-line camelcase
        is_default: yup.bool().oneOf([true, false]).required(),
        address: yup.object().shape({
            line1: yup
                .string()
                .trim()
                .min(2, "Length is too short.")
                .max(200, "Length is too long.")
                .required("Building Name is required."),
            line2: yup
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
                .oneOf(indianStates, "Enter a valid Indian state.")
                .required("State is required."),
            // eslint-disable-next-line camelcase
            pin_code: yup
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
        indianStates
    };
}
