import {
    ADDRESS_LIST,
    CART_ITEMS,
    PRODUCT_LIST,
    USER_LOGIN_DETAILS,
    USER_REGISTER_DETAILS
} from "constants/localStorage";
import {
    CartState,
    LoginState,
    ProductListState,
    RegisterState,
    ShippingAddressState
} from "utils/types";

import cartSlice from "./CartService/cartSlice";
import checkoutStepsSlice from "./OrderService/checkoutStepsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { getItemFromStorage } from "utils/localStorage";
import loginSlice from "./AuthService/loginSlice";
import orderListSlice from "./OrderService/orderListSlice";
import productByIdSlice from "./ProductService/productByIdSlice";
import productsSlice from "./ProductService/productsSlice";
import registerSlice from "./AuthService/registerSlice";
import searchedCategorySlice from "./ProductService/searchedCategorySlice";
import shippingAddressSlice from "./OrderService/shippingAddressSlice";

const userLoginDetailsFromStorage = getItemFromStorage(USER_LOGIN_DETAILS) ?? {};
const userRegisterDetailsFromStorage = getItemFromStorage(USER_REGISTER_DETAILS) ?? {};
const productListFromStorage = getItemFromStorage(PRODUCT_LIST) ?? {};
const cartItemsFromStorage = getItemFromStorage(CART_ITEMS) ?? [];
const addressListFromStorage = getItemFromStorage(ADDRESS_LIST) ?? [];

const persistedState: {
    userLoginDetails: LoginState;
    userRegisterDetails: RegisterState;
    productList: ProductListState;
    cart: CartState;
    address: ShippingAddressState;
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
    },
    cart: {
        isLoading: false,
        cartItems: cartItemsFromStorage,
        error: null
    },
    address: {
        isLoading: false,
        addressList: addressListFromStorage,
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
        productDetails: productByIdSlice,
        searchedCategories: searchedCategorySlice,
        cart: cartSlice,
        address: shippingAddressSlice,
        checkoutDetails: checkoutStepsSlice,
        orderList: orderListSlice
    },
    preloadedState: persistedState
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type ReduxDispatch = typeof store.dispatch;

export default store;
