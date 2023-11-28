import { USER_LOGIN_DETAILS, USER_REGISTER_DETAILS } from "constants/localStorage";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { clearStorage, getItemFromStorage, updateItemInStorage } from "./localStorage";

import { LOGIN_USER_SCREEN } from "constants/routes";

export const publicAxiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
    headers: {
        "Content-Type": "application/json"
    }
});

// Create the axios instance.
export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1/"
});

// Using axios interceptor before sending a http request
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const tokens = getItemFromStorage(USER_LOGIN_DETAILS);
        if (tokens) {
            config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Wrap the interceptor in a function, so that i can be re-instantiated
function createAxiosResponseInterceptor() {
    const interceptor = axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError) => {
            // Reject promise if status code is other than 401(un-authorized).
            if (error.response?.status !== 401) {
                return Promise.reject(error);
            }

            /*
                When response code is 401, try to refresh the token.
                Eject the interceptor so it doesn't loop in case token refresh causes the 401 response.
                Must be re-attached later on or the token refresh will only happen once.
            */
            axiosInstance.interceptors.response.eject(interceptor);
            const tokens = getItemFromStorage(USER_LOGIN_DETAILS) ?? {};

            return await axiosInstance
                .post("users/token/refresh", {
                    refresh: tokens.refreshToken
                })
                .then((response: AxiosResponse) => {
                    const tokenData = {
                        accessToken: response.data.access
                    };

                    const updateRegisterData = { ...tokenData };
                    const updateLoginData = { ...tokenData, isLoggedIn: true };

                    updateItemInStorage(USER_LOGIN_DETAILS, updateLoginData);
                    updateItemInStorage(USER_REGISTER_DETAILS, updateRegisterData);
                    if (error.response && error.response.config && error.response.config.headers) {
                        // Check if the headers object exists in the response.config
                        error.response.config.headers["Authorization"] =
                            "Bearer " + response.data.access;

                        // Retry the initial call, but with the updated token in the headers.
                        // Resolves the promise if successful
                        return axios(error.response.config);
                    }
                })
                .catch((error2: AxiosError) => {
                    // Retry failed, clean up storage, redirect to login and reject the promise.
                    clearStorage();
                    window.location.href = LOGIN_USER_SCREEN;
                    return Promise.reject(error2);
                })
                // Re-attach the interceptor by running the method
                .finally(createAxiosResponseInterceptor);
        }
    );
}

createAxiosResponseInterceptor();
