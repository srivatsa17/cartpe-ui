import { Navigate, Outlet } from "react-router-dom";

import { HOME_SCREEN } from "constants/routes";
import React from "react";
import { USER_LOGIN_DETAILS } from "constants/localStorage";
import { getItemFromStorage } from "utils/localStorage";

function AnonymousUserRoute() {
    const token = getItemFromStorage(USER_LOGIN_DETAILS);

    return (
        token ?
            <Navigate to={HOME_SCREEN} replace={true} />
            :
            <main className="py-3">
                <Outlet />
            </main>
    );
}

export default AnonymousUserRoute;
