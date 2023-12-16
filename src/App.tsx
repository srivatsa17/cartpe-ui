import { HOME_SCREEN, LOGIN_USER_SCREEN, REGISTER_USER_SCREEN } from "constants/routes";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AnonymousUserRoute from "routings/AnonymousUserRoute";
import HomeScreen from "screens/HomeScreen";
import LoginScreen from "screens/AuthService/LoginScreen";
import ProtectedUserRoute from "routings/ProtectedUserRoute";
import React from "react";
import RegisterScreen from "screens/AuthService/RegisterScreen";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route element={<AnonymousUserRoute />}>
                    <Route path={LOGIN_USER_SCREEN} element={<LoginScreen />} />
                    <Route path={REGISTER_USER_SCREEN} element={<RegisterScreen />} />
                </Route>
                <Route element={<ProtectedUserRoute />}>
                    <Route path={HOME_SCREEN} element={<HomeScreen />} />
                </Route>
            </Routes>
        </Router>
    );
}
