import * as yup from "yup";

import { Button, Divider, Image, Input, Spacer } from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import { HOME_SCREEN, REGISTER_USER_SCREEN, RESET_PASSWORD_SCREEN } from "constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import { CloseFilledIcon } from "icons/CloseFilledIcon";
import EmailIcon from "icons/EmailIcon";
import { EyeFilledIcon } from "icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "icons/EyeSlashFilledIcon";
import GoogleLoginButton from "components/LoginScreen/GoogleLoginButton";
import { LOGIN_USER_IMAGE } from "constants/images";
import LockIcon from "icons/LockIcon";
import React from "react";
import { getCartItems } from "redux/CartService/cartSlice";
import { getWishList } from "redux/ProductService/wishlistSlice";
import { loginUser } from "redux/AuthService/loginSlice";

function LoginScreen() {
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useReduxSelector((state) => state.userLoginDetails);
    const { isDeactivated } = useReduxSelector((state) => state.deactivate);

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    React.useEffect(() => {
        if (isLoggedIn === true) {
            navigate(HOME_SCREEN);
            dispatch(getCartItems());
            dispatch(getWishList());
        }
    }, [isLoggedIn, navigate, dispatch]);

    // Trigger a toast in login screen when account is deactivated only once.
    React.useEffect(() => {
        if (isDeactivated === true) {
            toast.success("Account Deactivated!", {
                description:
                    "Your account has been successfully deactivated, and you have been logged out.",
                position: "top-right",
                duration: 4000
            });
        }
    }, [isDeactivated]);

    const initialFormData = {
        email: "",
        password: ""
    };

    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter a valid email.")
            .trim()
            .max(255, "Email is too long.")
            .required("Email is required."),
        password: yup
            .string()
            .trim()
            .min(8, "Password should be at least 8 characters long.")
            .matches(/[a-zA-Z]/i, "Password should contain alphabets.")
            .matches(/\d/, "Password should contain digits.")
            .max(255, "Password is too long.")
            .required("Password is required.")
    });

    return (
        <div className="container mx-auto place-content-center">
            <Toaster richColors closeButton />
            <div className="flex flex-wrap items-center justify-center">
                <div className="xs:w-2/3 sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/2">
                    <Image
                        src={LOGIN_USER_IMAGE}
                        alt="login-image"
                        className="w-full h-auto pointer-events-none"
                    />
                </div>
                <div className="xs:w-2/3 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/2">
                    <div className="text-5xl text-center lg:text-left xl:text-left antialiased">
                        Login to <span className="font-medium italic text-blue-700">CartPe</span>!
                    </div>
                    <Spacer y={5} />
                    <Formik
                        validationSchema={schema}
                        initialValues={initialFormData}
                        onSubmit={(formData, { setSubmitting, resetForm }) => {
                            const toastId = toast.loading(
                                "Please wait a moment while we log you in.",
                                {
                                    position: "top-right",
                                    duration: 10000
                                }
                            );

                            setTimeout(() => {
                                dispatch(loginUser(formData))
                                    .then(() => {
                                        toast.success("Login successful! Welcome back.", {
                                            position: "top-right",
                                            description: "Redirecting you to the home screen.",
                                            duration: 10000,
                                            id: toastId
                                        });
                                    })
                                    .catch((error) => {
                                        toast.error("Login failed!", {
                                            id: toastId,
                                            description: error,
                                            position: "top-right",
                                            duration: 10000
                                        });
                                    });
                                setSubmitting(false);
                                resetForm();
                            }, 1000);
                        }}
                    >
                        {({
                            handleBlur,
                            handleSubmit,
                            handleChange,
                            touched,
                            errors,
                            isValid,
                            isSubmitting,
                            dirty
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field
                                    as={Input}
                                    type="email"
                                    label="Email"
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    isInvalid={touched.email && errors.email}
                                    isValid={touched.email && !errors.email}
                                    variant="flat"
                                    labelPlacement="outside"
                                    className="max-w-md"
                                    size="lg"
                                    autoComplete="off"
                                    errorMessage={touched.email && errors.email}
                                    color={
                                        touched.email
                                            ? errors.email
                                                ? "danger"
                                                : "success"
                                            : "default"
                                    }
                                    startContent={<EmailIcon height={24} width={24} size={24} />}
                                    isClearable
                                    isReadOnly={isSubmitting}
                                    isRequired
                                />
                                <Spacer y={5} />
                                <Field
                                    as={Input}
                                    type={isPasswordVisible ? "text" : "password"}
                                    label="Password"
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    isInvalid={touched.password && errors.password}
                                    isValid={touched.password && !errors.password}
                                    variant="flat"
                                    labelPlacement="outside"
                                    className="max-w-md"
                                    size="lg"
                                    autoComplete="off"
                                    errorMessage={touched.password && errors.password}
                                    color={
                                        touched.password
                                            ? errors.password
                                                ? "danger"
                                                : "success"
                                            : "default"
                                    }
                                    isRequired
                                    isReadOnly={isSubmitting}
                                    isClearable
                                    startContent={<LockIcon height={24} width={24} size={24} />}
                                    endContent={
                                        <div className="flex">
                                            <CloseFilledIcon className="m-2" />
                                            <button
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={toggleVisibility}
                                            >
                                                {isPasswordVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        </div>
                                    }
                                />
                                <Spacer y={8} />
                                <Button
                                    type="submit"
                                    className="max-w-md text-lg bg-default-900 text-white"
                                    fullWidth
                                    size="lg"
                                    variant="flat"
                                    isLoading={isSubmitting}
                                    isDisabled={!dirty || !isValid || isSubmitting}
                                >
                                    Login
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Spacer y={3} />
                    <div>
                        Don&apos;t have an account?&nbsp;
                        <Link to={REGISTER_USER_SCREEN} className="text-blue-700 font-semibold">
                            Register
                        </Link>
                    </div>
                    <Spacer y={2} />
                    <div>
                        Forgot Password?&nbsp;
                        <Link to={RESET_PASSWORD_SCREEN} className="text-blue-700 font-semibold">
                            Reset
                        </Link>
                    </div>
                    <Spacer y={2} />
                    <div className="flex items-center gap-4 ml-1">
                        <Divider className="max-w-48 xs:max-w-24" />
                        <div className="font-semibold">OR</div>
                        <Divider className="max-w-48 xs:max-w-24" />
                    </div>
                    <Spacer y={5} />
                    <div>
                        <GoogleLoginButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
