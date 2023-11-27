import * as yup from "yup";

import { Button, Image, Input, Spacer } from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import { HOME_SCREEN, REGISTER_USER_SCREEN, RESET_PASSWORD_SCREEN } from "constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import { EyeFilledIcon } from "icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "icons/EyeSlashFilledIcon";
import { LOGIN_USER_IMAGE } from "constants/images";
import React from "react";
import { loginUser } from "redux/AuthService/loginSlice";

function LoginScreen() {
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useReduxSelector(state => state.userLoginDetails);

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    React.useEffect(() => {
        if(isLoggedIn === true) {
            navigate(HOME_SCREEN);
        }
    }, [isLoggedIn, navigate, dispatch]);

    const initialFormData = {
        email: "",
        password: ""
    };

    const schema = yup.object().shape({
        email: yup.string()
            .email("Please enter a valid email.")
            .trim()
            .required("Email is required."),
        password: yup.string()
            .trim()
            .min(8, "Password should be at least 8 characters long.")
            .matches(/[a-zA-Z]/i, "Password should contain alphabets.")
            .matches(/\d/, "Password should contain digits.")
            .required("Password is required.")
    });

    return (
        <div className="container mx-auto place-content-center">
            <div className="flex flex-wrap items-center justify-center">
                <div className="xs:w-2/3 sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/2">
                    <Image src={LOGIN_USER_IMAGE} alt="login-image" className="w-full h-auto pointer-events-none" />
                </div>
                <div className="xs:w-2/3 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/2 my-7">
                    <div className="text-5xl text-center lg:text-left xl:text-left antialiased">
                        Login to <span className="font-medium">CartPe</span>!
                    </div>
                    <Spacer y={12} />
                    <Formik
                        validationSchema={schema}
                        initialValues={initialFormData}
                        onSubmit={(formData, { setSubmitting, resetForm }) => {
                            setTimeout(() => {
                                dispatch(loginUser(formData));
                                setSubmitting(false);
                                resetForm();
                            }, 1000);
                        }}
                    >
                        {({ handleBlur, handleSubmit, handleChange, touched, errors, isValid, isSubmitting, dirty }) => (
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
                                    description="We'll never share your email with anyone else."
                                    className="max-w-md"
                                    size="lg"
                                    errorMessage={touched.email && errors.email}
                                    color={touched.email ? errors.email ? "danger" : "success" : "default"}
                                    isRequired
                                />
                                <Spacer y={3} />
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
                                    description="We'll never share your password with anyone else."
                                    className="max-w-md"
                                    size="lg"
                                    errorMessage={touched.password && errors.password}
                                    color={touched.password ? errors.password ? "danger" : "success" : "default"}
                                    isRequired
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                            {
                                                isPasswordVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )
                                            }
                                        </button>
                                    }
                                />
                                <Spacer y={10} />
                                <Button
                                    type="submit"
                                    className="w-[28rem] text-lg bg-default-900 text-white"
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
                    <Spacer y={3}/>
                    <div>
                        Don&apos;t have an account?&nbsp;
                        <Link to={REGISTER_USER_SCREEN} className="text-blue-700 font-semibold">Register</Link>
                    </div>
                    <Spacer y={2}/>
                    <div>
                        Forgot Password?&nbsp;
                        <Link to={RESET_PASSWORD_SCREEN} className="text-blue-700 font-semibold">Reset</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
