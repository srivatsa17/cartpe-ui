import {
    CATEGORY_SEARCH_SCREEN,
    HOME_SCREEN,
    LOGIN_USER_SCREEN,
    REGISTER_USER_SCREEN,
    VERIFY_USER_EMAIL_SCREEN
} from "constants/routes";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AnonymousUserRoute from "routings/AnonymousUserRoute";
import CategorySearchScreen from "screens/ProductService/CategorySearchScreen";
import HomeScreen from "screens/HomeScreen";
import LoginScreen from "screens/AuthService/LoginScreen";
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
                </Route>
            </Routes>
        </Router>
    );
}
