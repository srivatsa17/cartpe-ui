import {
    CART_SCREEN,
    CATEGORY_SEARCH_SCREEN,
    CHECKOUT_SCREEN,
    HOME_SCREEN,
    LOGIN_USER_SCREEN,
    ORDER_CONFIRMED_SCREEN,
    ORDER_DETAIL_SCREEN,
    ORDER_FAILED_SCREEN,
    ORDER_PAYMENT_FAILED_SCREEN,
    ORDER_SCREEN,
    PRODUCT_SCREEN,
    REGISTER_USER_SCREEN,
    VERIFY_USER_EMAIL_SCREEN
} from "constants/routes";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AnonymousUserRoute from "routings/AnonymousUserRoute";
import CartScreen from "screens/CartService/CartScreen";
import CategorySearchScreen from "screens/ProductService/CategorySearchScreen";
import CheckoutScreen from "screens/OrderService/CheckoutScreen";
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
import VerifyEmailScreen from "screens/AuthService/VerifyEmailScreen";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route element={<AnonymousUserRoute />}>
                    <Route path={LOGIN_USER_SCREEN} element={<LoginScreen />} />
                    <Route path={REGISTER_USER_SCREEN} element={<RegisterScreen />} />
                    <Route path={VERIFY_USER_EMAIL_SCREEN} element={<VerifyEmailScreen />} />
                </Route>
                <Route element={<ProtectedUserRoute />}>
                    <Route path={HOME_SCREEN} element={<HomeScreen />} />
                    <Route path={CATEGORY_SEARCH_SCREEN} element={<CategorySearchScreen />} />
                    <Route path={PRODUCT_SCREEN} element={<ProductScreen />} />
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
                </Route>
            </Routes>
        </Router>
    );
}
