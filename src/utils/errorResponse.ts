import { ErrorResponse } from "./types";

export const throwAuthenticationErrorResponse = (error: ErrorResponse) => {
    if (error.response === null || error.response === undefined) {
        return "Oops! Something went wrong!";
    }

    if (!error.response.data?.detail) {
        return "Response from server got corrupted.";
    }

    return error.response.data.detail;
};

export const throwErrorResponse = (error: ErrorResponse) => {
    if (error.response === null || error.response === undefined) {
        return "Oops! Something went wrong!";
    }

    if (!error.response.data?.message) {
        return "Response from server got corrupted.";
    }

    return error.response.data.message;
};
