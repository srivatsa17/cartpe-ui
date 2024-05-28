import { HOME_SCREEN, LOGIN_USER_SCREEN } from "constants/routes";
import { Toaster, toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";

import React from "react";
import { getCartItems } from "redux/CartService/cartSlice";
import { getWishList } from "redux/ProductService/wishlistSlice";
import { googleLoginUser } from "redux/AuthService/loginSlice";
import { useReduxDispatch } from "hooks/redux";

function GoogleLoginScreen() {
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();

    React.useEffect(() => {
        const code = queryParams.get("code");

        if (code) {
            const toastId = toast.loading("Please wait a moment while we log you in.", {
                position: "top-right",
                duration: 4000
            });

            setTimeout(() => {
                dispatch(googleLoginUser(code))
                    .then(() => {
                        toast.success("Login successful! Welcome back.", {
                            position: "top-right",
                            description: "Redirecting you to the home screen.",
                            duration: 4000,
                            id: toastId
                        });
                        setTimeout(() => {
                            navigate(HOME_SCREEN);
                            dispatch(getCartItems());
                            dispatch(getWishList());
                        }, 1000);
                    })
                    .catch(() => {
                        toast.error("Login failed!", {
                            id: toastId,
                            description: "Redirecting you back to the login screen.",
                            position: "top-right",
                            duration: 4000
                        });
                        setTimeout(() => {
                            navigate(LOGIN_USER_SCREEN);
                        }, 1000);
                    });
            }, 2000);
        } else {
            toast.error("Google Login Error: Missing Authorization Code!", {
                description: "Redirecting you back to the login screen.",
                position: "top-right",
                duration: 4000
            });
            setTimeout(() => {
                navigate(LOGIN_USER_SCREEN);
            }, 2000);
        }
    }, [navigate, dispatch]);

    return (
        <div>
            <Toaster richColors closeButton />
        </div>
    );
}

export default GoogleLoginScreen;
