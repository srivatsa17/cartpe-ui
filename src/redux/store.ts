import { LoginState, ProductListState, RegisterState } from "utils/types";
import { PRODUCT_LIST, USER_LOGIN_DETAILS, USER_REGISTER_DETAILS } from "constants/localStorage";

import { configureStore } from "@reduxjs/toolkit";
import { getItemFromStorage } from "utils/localStorage";
import loginSlice from "./AuthService/loginSlice";
import productsSlice from "./ProductService/productsSlice";
import registerSlice from "./AuthService/registerSlice";
import searchedCategorySlice from "./ProductService/searchedCategorySlice";

const userLoginDetailsFromStorage = getItemFromStorage(USER_LOGIN_DETAILS) ?? {};
const userRegisterDetailsFromStorage = getItemFromStorage(USER_REGISTER_DETAILS) ?? {};
const productListFromStorage = getItemFromStorage(PRODUCT_LIST) ?? {};

const persistedState: {
    userLoginDetails?: LoginState;
    userRegisterDetails?: RegisterState;
    productList?: ProductListState;
} = {
    productList: {
        products: productListFromStorage.products ?? [],
        searchedCategory: productListFromStorage.searchedCategory ?? "",
        isLoading: false,
        error: null
    },
    userLoginDetails: {
        email: userLoginDetailsFromStorage.email || null,
        firstName: userLoginDetailsFromStorage.firstName || null,
        lastName: userLoginDetailsFromStorage.lastName || null,
        isLoggedIn: userLoginDetailsFromStorage.isLoggedIn || false,
        isLoading: false,
        error: null
    },
    userRegisterDetails: {
        isRegistered:
            userLoginDetailsFromStorage.isLoggedIn ||
            userRegisterDetailsFromStorage.isRegistered ||
            false,
        isVerified:
            userLoginDetailsFromStorage.isLoggedIn ||
            userRegisterDetailsFromStorage.isVerified ||
            false,
        isLoading: false,
        error: null
    }
};

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        userRegisterDetails: registerSlice,
        userLoginDetails: loginSlice,
        productList: productsSlice,
        searchedCategories: searchedCategorySlice
    },
    preloadedState: persistedState
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type ReduxDispatch = typeof store.dispatch;

export default store;
