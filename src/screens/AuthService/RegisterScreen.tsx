import * as yup from "yup";

import { Button, Image, Input, Spacer } from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

import { CloseFilledIcon } from "icons/CloseFilledIcon";
import EmailIcon from "icons/EmailIcon";
import { EyeFilledIcon } from "icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "icons/EyeSlashFilledIcon";
import GoogleRegisterButton from "components/RegisterScreen/GoogleRegisterButton";
import { LOGIN_USER_SCREEN } from "constants/routes";
import LockIcon from "icons/LockIcon";
import { REGISTER_USER_IMAGE } from "constants/images";
import React from "react";
import UserIcon from "icons/UserIcon";
import { registerUser } from "redux/AuthService/registerSlice";
import { useReduxDispatch } from "hooks/redux";

function RegisterScreen() {
    const navigate = useNavigate();
    const dispatch = useReduxDispatch();

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    const initialFormData = {
        fullName: "",
        email: "",
        password: ""
    };

    const schema = yup.object().shape({
        fullName: yup
            .string()
            .trim()
            .max(255, "Name is too long.")
            .matches(/^([a-zA-Z]+)\s+([a-zA-Z\s]+?)\s*$/, "Enter first name and last name.")
            .required("First and Last Name is required."),
        email: yup
            .string()
            .email("Please enter a valid email.")
            .trim()
            .max(255, "Email is too long.")
            .required("Email is required."),
        password: yup
            .string()
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
                        src={REGISTER_USER_IMAGE}
                        alt="register-image"
                        className="w-full h-auto pointer-events-none"
                    />
                </div>
                <div className="xs:w-2/3 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/2 my-7">
                    <div className="text-5xl text-center lg:text-left xl:text-left antialiased">
                        Register with{" "}
                        <span className="font-medium italic text-blue-700">CartPe</span>!
                    </div>
                    <Spacer y={12} />
                    <Formik
                        validationSchema={schema}
                        initialValues={initialFormData}
                        onSubmit={(formData, { setSubmitting, resetForm }) => {
                            const toastId = toast.loading(
                                "Please wait a moment while we complete your registration process.",
                                {
                                    position: "top-right",
                                    duration: 4000
                                }
                            );

                            setTimeout(() => {
                                dispatch(registerUser(formData))
                                    .then(() => {
                                        toast.success("Registration complete! Welcome to CartPe.", {
                                            position: "top-right",
                                            description:
                                                "A verification email is sent to your registered email. Please verify and login.",
                                            duration: 10000,
                                            id: toastId
                                        });
                                        setTimeout(() => {
                                            navigate(LOGIN_USER_SCREEN);
                                        }, 10000);
                                    })
                                    .catch((error) => {
                                        toast.error("Registration failed!", {
                                            id: toastId,
                                            description: error,
                                            position: "top-right",
                                            duration: 4000
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
                                    type="text"
                                    label="First & Last Name"
                                    name="fullName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    isInvalid={touched.fullName && errors.fullName}
                                    isValid={touched.fullName && !errors.fullName}
                                    variant="flat"
                                    labelPlacement="outside"
                                    className="max-w-md"
                                    size="lg"
                                    autoComplete="off"
                                    errorMessage={touched.fullName && errors.fullName}
                                    color={
                                        touched.fullName
                                            ? errors.fullName
                                                ? "danger"
                                                : "success"
                                            : "default"
                                    }
                                    startContent={<UserIcon height={24} width={24} size={24} />}
                                    isClearable
                                    isReadOnly={isSubmitting}
                                    isRequired
                                />
                                <Spacer y={3} />
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
                                <Spacer y={10} />
                                <Button
                                    type="submit"
                                    className="max-w-md text-lg bg-default-900 text-white"
                                    fullWidth
                                    size="lg"
                                    variant="flat"
                                    isLoading={isSubmitting}
                                    isDisabled={!dirty || !isValid || isSubmitting}
                                >
                                    Register
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Spacer y={3} />
                    <div>
                        Already have an account?&nbsp;
                        <Link to={LOGIN_USER_SCREEN} className="text-blue-700 font-semibold">
                            Login
                        </Link>
                    </div>
                    <Spacer y={2} />
                    <div className="flex items-center gap-4">
                        <div className="border-t border-gray-300 w-48 xs:flex-grow"></div>
                        <div className="font-semibold">OR</div>
                        <div className="border-t border-gray-300 w-48 xs:flex-grow"></div>
                    </div>
                    <Spacer y={5} />
                    <div>
                        <GoogleRegisterButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterScreen;
