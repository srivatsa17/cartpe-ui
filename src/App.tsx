import {
    CART_SCREEN,
    CATEGORY_SEARCH_SCREEN,
    CHANGE_PASSWORD_SCREEN,
    CHECKOUT_SCREEN,
    CONTACT_US_SCREEN,
    EDIT_PROFILE_SCREEN,
    GOOGLE_LOGIN_USER_SCREEN,
    GOOGLE_REGISTER_USER_SCREEN,
    HOME_SCREEN,
    LOGIN_USER_SCREEN,
    ORDER_CONFIRMED_SCREEN,
    ORDER_DETAIL_SCREEN,
    ORDER_FAILED_SCREEN,
    ORDER_PAYMENT_FAILED_SCREEN,
    ORDER_SCREEN,
    PRODUCT_SCREEN,
    REGISTER_USER_SCREEN,
    SAVED_ADDRESSES_SCREEN,
    VERIFY_USER_EMAIL_SCREEN,
    WISHLIST_SCREEN
} from "constants/routes";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AnonymousUserRoute from "routings/AnonymousUserRoute";
import CartScreen from "screens/CartService/CartScreen";
import CategorySearchScreen from "screens/ProductService/CategorySearchScreen";
import ChangePasswordScreen from "screens/AuthService/ChangePasswordScreen";
import CheckoutScreen from "screens/OrderService/CheckoutScreen";
import ContactUsScreen from "screens/CustomerService/ContactUsScreen";
import EditProfileScreen from "screens/AuthService/EditProfileScreen";
import GoogleLoginScreen from "screens/AuthService/GoogleLoginScreen";
import GoogleRegisterScreen from "screens/AuthService/GoogleRegisterScreen";
import HomeScreen from "screens/HomeScreen";
import LoginScreen from "screens/AuthService/LoginScreen";
import OrderConfirmedScreen from "screens/OrderService/OrderConfirmedScreen";
import OrderDetailScreen from "screens/OrderService/OrderDetailScreen";
import OrderFailedScreen from "screens/OrderService/OrderFailedScreen";
import OrderListScreen from "screens/OrderService/OrderListScreen";
import OrderPaymentFailedScreen from "screens/OrderService/OrderPaymentFailedScreen";
import ProductScreen from "screens/ProductService/ProductScreen";
import ProtectedUserRoute from "routings/ProtectedUserRoute";
import React from "react";
import RegisterScreen from "screens/AuthService/RegisterScreen";
import SavedAddressListScreen from "screens/SavedAddressListScreen";
import VerifyEmailScreen from "screens/AuthService/VerifyEmailScreen";
import WishListScreen from "screens/ProductService/WishListScreen";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route element={<AnonymousUserRoute />}>
                    <Route path={LOGIN_USER_SCREEN} element={<LoginScreen />} />
                    <Route path={GOOGLE_LOGIN_USER_SCREEN} element={<GoogleLoginScreen />} />
                    <Route path={REGISTER_USER_SCREEN} element={<RegisterScreen />} />
                    <Route path={GOOGLE_REGISTER_USER_SCREEN} element={<GoogleRegisterScreen />} />
                    <Route path={VERIFY_USER_EMAIL_SCREEN} element={<VerifyEmailScreen />} />
                </Route>
                <Route element={<ProtectedUserRoute />}>
                    <Route path={HOME_SCREEN} element={<HomeScreen />} />
                    <Route path={CATEGORY_SEARCH_SCREEN} element={<CategorySearchScreen />} />
                    <Route path={PRODUCT_SCREEN} element={<ProductScreen />} />
                    <Route path={WISHLIST_SCREEN} element={<WishListScreen />} />
                    <Route path={CART_SCREEN} element={<CartScreen />} />
                    <Route path={CHECKOUT_SCREEN} element={<CheckoutScreen />} />
                    <Route path={ORDER_CONFIRMED_SCREEN} element={<OrderConfirmedScreen />} />
                    <Route path={ORDER_FAILED_SCREEN} element={<OrderFailedScreen />} />
                    <Route
                        path={ORDER_PAYMENT_FAILED_SCREEN}
                        element={<OrderPaymentFailedScreen />}
                    />
                    <Route path={ORDER_SCREEN} element={<OrderListScreen />} />
                    <Route path={ORDER_DETAIL_SCREEN} element={<OrderDetailScreen />} />
                    <Route path={SAVED_ADDRESSES_SCREEN} element={<SavedAddressListScreen />} />
                    <Route path={EDIT_PROFILE_SCREEN} element={<EditProfileScreen />} />
                    <Route path={CHANGE_PASSWORD_SCREEN} element={<ChangePasswordScreen />} />
                    <Route path={CONTACT_US_SCREEN} element={<ContactUsScreen />} />
                </Route>
            </Routes>
        </Router>
    );
}
