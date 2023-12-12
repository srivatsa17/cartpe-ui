import { Navigate, Outlet } from "react-router-dom";

import Footer from "components/Footer/Footer";
import { LOGIN_USER_SCREEN } from "constants/routes";
import NavBar from "components/NavBar/NavBar";
import React from "react";
import { USER_LOGIN_DETAILS } from "constants/localStorage";
import { getItemFromStorage } from "utils/localStorage";

function ProtectedUserRoute() {
    const token = getItemFromStorage(USER_LOGIN_DETAILS);

    return token ? (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <hr />
            <Footer />
        </>
    ) : (
        <Navigate to={LOGIN_USER_SCREEN} replace={true} />
    );
}

export default ProtectedUserRoute;
