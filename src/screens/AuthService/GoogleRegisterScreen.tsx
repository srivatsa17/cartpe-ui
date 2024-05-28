import { HOME_SCREEN, LOGIN_USER_SCREEN } from "constants/routes";
import { Toaster, toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";

import React from "react";
import { getCartItems } from "redux/CartService/cartSlice";
import { getWishList } from "redux/ProductService/wishlistSlice";
import { googleRegisterUser } from "redux/AuthService/registerSlice";
import { useReduxDispatch } from "hooks/redux";

function GoogleRegisterScreen() {
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();

    React.useEffect(() => {
        const code = queryParams.get("code");

        if (code) {
            const toastId = toast.loading("Please wait a moment while we complete your registration process.", {
                position: "top-right",
                duration: 4000
            });

            setTimeout(() => {
                dispatch(googleRegisterUser(code))
                    .then(() => {
                        toast.success("Registration complete! Welcome to CartPe.", {
                            position: "top-right",
                            description: "Redirecting you to the home screen.",
                            duration: 4000,
                            id: toastId
                        });
                        setTimeout(() => {
                            navigate(HOME_SCREEN);
                            dispatch(getCartItems());
                            dispatch(getWishList());
                        }, 2000);
                    })
                    .catch((error) => {
                        toast.error("Registration failed!", {
                            id: toastId,
                            description: error,
                            position: "top-right",
                            duration: 4000
                        });
                        setTimeout(() => {
                            navigate(LOGIN_USER_SCREEN);
                        }, 3000);
                    });
            }, 2000);
        } else {
            toast.error("Google Registration Error: Missing Authorization Code!", {
                description: "Redirecting you back to the login screen.",
                position: "top-right",
                duration: 4000
            });
            setTimeout(() => {
                navigate(LOGIN_USER_SCREEN);
            }, 3000);
        }
    }, [navigate, dispatch]);

    return (
        <div>
            <Toaster richColors closeButton />
        </div>
    );
}

export default GoogleRegisterScreen;
