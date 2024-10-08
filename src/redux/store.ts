import {
    ADDRESS_LIST,
    CART_ITEMS,
    PRODUCT_LIST,
    PROFILE_DETAILS,
    USER_LOGIN_DETAILS,
    USER_REGISTER_DETAILS,
    WISHLIST
} from "constants/localStorage";
import {
    CartState,
    LoginState,
    ProductListState,
    ProfileState,
    RegisterState,
    ShippingAddressState,
    WishListState
} from "utils/types";

import cartSlice from "./CartService/cartSlice";
import changePasswordSlice from "./AuthService/changePasswordSlice";
import checkoutStepsSlice from "./OrderService/checkoutStepsSlice";
import { configureStore } from "@reduxjs/toolkit";
import deactivateSlice from "./AuthService/deactivateSlice";
import { getItemFromStorage } from "utils/localStorage";
import loginSlice from "./AuthService/loginSlice";
import orderDetailsSlice from "./OrderService/orderDetailsSlice";
import orderListSlice from "./OrderService/orderListSlice";
import productByIdSlice from "./ProductService/productByIdSlice";
import productRatingSlice from "./ProductService/productRatingSlice";
import productReviewSlice from "./ProductService/productReviewSlice";
import productsSlice from "./ProductService/productsSlice";
import profileSlice from "./AuthService/profileSlice";
import registerSlice from "./AuthService/registerSlice";
import resetPasswordSlice from "./AuthService/resetPasswordSlice";
import searchedCategorySlice from "./ProductService/searchedCategorySlice";
import shippingAddressSlice from "./OrderService/shippingAddressSlice";
import wishlistSlice from "./ProductService/wishlistSlice";

const userLoginDetailsFromStorage = getItemFromStorage(USER_LOGIN_DETAILS) ?? {};
const userRegisterDetailsFromStorage = getItemFromStorage(USER_REGISTER_DETAILS) ?? {};
const profileDetailsFromStorage = getItemFromStorage(PROFILE_DETAILS) ?? {};
const productListFromStorage = getItemFromStorage(PRODUCT_LIST) ?? {};
const cartItemsFromStorage = getItemFromStorage(CART_ITEMS) ?? [];
const wishListFromStorage = getItemFromStorage(WISHLIST) ?? [];
const addressListFromStorage = getItemFromStorage(ADDRESS_LIST) ?? [];

const persistedState: {
    userLoginDetails: LoginState;
    userRegisterDetails: RegisterState;
    profile: ProfileState;
    productList: ProductListState;
    cart: CartState;
    wishlist: WishListState;
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
    profile: {
        isLoading: false,
        user: profileDetailsFromStorage || null,
        error: null
    },
    cart: {
        isLoading: false,
        cartItems: cartItemsFromStorage,
        error: null
    },
    wishlist: {
        isLoading: false,
        wishListedProducts: wishListFromStorage,
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
        profile: profileSlice,
        changePassword: changePasswordSlice,
        resetPassword: resetPasswordSlice,
        deactivate: deactivateSlice,
        productList: productsSlice,
        productDetails: productByIdSlice,
        searchedCategories: searchedCategorySlice,
        productReviews: productReviewSlice,
        productRating: productRatingSlice,
        cart: cartSlice,
        wishlist: wishlistSlice,
        address: shippingAddressSlice,
        checkoutDetails: checkoutStepsSlice,
        orderList: orderListSlice,
        orderDetails: orderDetailsSlice
    },
    preloadedState: persistedState
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type ReduxDispatch = typeof store.dispatch;

export default store;
