import { Navigate, Outlet } from "react-router-dom";

import { LOGIN_USER_SCREEN } from "constants/routes";
import React from "react";
import { USER_LOGIN_DETAILS } from "constants/localStorage";
import { getItemFromStorage } from "utils/localStorage";

function ProtectedUserRoute() {
    const token = getItemFromStorage(USER_LOGIN_DETAILS);

    return (
        token ?
            <>
                <main className="py-3">
                    <Outlet />
                </main>
                <hr />
            </>
            :
            <Navigate to={LOGIN_USER_SCREEN} replace={true} />
    );
}

export default ProtectedUserRoute;
