import * as yup from "yup";

import { BreadcrumbItem, Breadcrumbs, Button, Image, Input, Spacer } from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import { Toaster, toast } from "sonner";

import EmailIcon from "icons/EmailIcon";
import { LOGIN_USER_SCREEN } from "constants/routes";
import { RESET_PASSWORD_IMAGE } from "constants/images";
import React from "react";
import { resetPasswordRequest } from "redux/AuthService/resetPasswordSlice";
import { useReduxDispatch } from "hooks/redux";

function ResetPasswordRequestScreen() {
    const dispatch = useReduxDispatch();

    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter a valid email.")
            .trim()
            .max(255, "Email is too long.")
            .required("Email is required.")
    });

    const initialFormData = {
        email: ""
    };

    return (
        <div className="container mx-auto px-6 py-7">
            <Toaster richColors closeButton />
            <Breadcrumbs size="lg">
                <BreadcrumbItem href={LOGIN_USER_SCREEN}>Login</BreadcrumbItem>
                <BreadcrumbItem isCurrent isLast>
                    Reset Password Request
                </BreadcrumbItem>
            </Breadcrumbs>
            <div className="flex flex-wrap items-center justify-center">
                <div className="xs:w-2/3 sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/2">
                    <Image
                        src={RESET_PASSWORD_IMAGE}
                        alt="reset-password-image"
                        className="w-full h-auto pointer-events-none"
                    />
                </div>
                <div className="xs:w-2/3 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/2">
                    <div className="text-5xl text-center lg:text-left xl:text-left antialiased">
                        Reset Password
                    </div>
                    <Spacer y={5} />
                    <Formik
                        validationSchema={schema}
                        initialValues={initialFormData}
                        onSubmit={(formData, { setSubmitting, resetForm }) => {
                            const toastId = toast.loading(
                                "Please wait a moment while we send a request for password reset.",
                                {
                                    position: "top-right",
                                    duration: 10000
                                }
                            );

                            setTimeout(() => {
                                dispatch(resetPasswordRequest(formData))
                                    .then(() => {
                                        toast.info("Password reset request sent.", {
                                            position: "top-right",
                                            description:
                                                "An email has been sent to you with instructions to reset your password. Please check your inbox.",
                                            duration: 10000,
                                            id: toastId
                                        });
                                    })
                                    .catch((error) => {
                                        toast.error("Password reset request failed.!", {
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
                            setFieldValue,
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
                                    onClear={() => setFieldValue("email", "")}
                                    isReadOnly={isSubmitting}
                                    isRequired
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
                                    Send reset link
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Spacer y={3} />
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordRequestScreen;
