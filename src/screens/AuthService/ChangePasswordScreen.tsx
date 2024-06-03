import * as yup from "yup";

import { BreadcrumbItem, Breadcrumbs, Button, Image, Input, Spacer } from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import { Toaster, toast } from "sonner";

import { CHANGE_PASSWORD_IMAGE } from "constants/images";
import { CloseFilledIcon } from "icons/CloseFilledIcon";
import { EyeFilledIcon } from "icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "icons/EyeSlashFilledIcon";
import { HOME_SCREEN } from "constants/routes";
import LockIcon from "icons/LockIcon";
import React from "react";
import { changePassword } from "redux/AuthService/changePasswordSlice";
import { useReduxDispatch } from "hooks/redux";

function ChangePasswordScreen() {
    const dispatch = useReduxDispatch();

    const [isOldPasswordVisible, setIsOldPasswordVisible] = React.useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = React.useState(false);
    const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] = React.useState(false);

    const toggleOldPasswordVisibility = () => setIsOldPasswordVisible(!isOldPasswordVisible);
    const toggleNewPasswordVisibility = () => setIsNewPasswordVisible(!isNewPasswordVisible);
    const toggleConfirmPasswordVisibility = () =>
        setIsConfirmNewPasswordVisible(!isConfirmNewPasswordVisible);

    const initialFormData = {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    };

    const schema = yup.object().shape({
        oldPassword: yup
            .string()
            .trim()
            .min(8, "Password should be at least 8 characters long.")
            .matches(/[a-zA-Z]/i, "Password should contain alphabets.")
            .matches(/\d/, "Password should contain digits.")
            .max(255, "Password is too long.")
            .required("Password is required."),
        newPassword: yup
            .string()
            .trim()
            .min(8, "Password should be at least 8 characters long.")
            .matches(/[a-zA-Z]/i, "Password should contain alphabets.")
            .matches(/\d/, "Password should contain digits.")
            .max(255, "Password is too long.")
            .notOneOf(
                [yup.ref("oldPassword")],
                "New password cannot be the same as the old password."
            )
            .required("Password is required."),
        confirmNewPassword: yup
            .string()
            .trim()
            .min(8, "Password should be at least 8 characters long.")
            .matches(/[a-zA-Z]/i, "Password should contain alphabets.")
            .matches(/\d/, "Password should contain digits.")
            .max(255, "Password is too long.")
            .oneOf([yup.ref("newPassword")], "Passwords do not match.")
            .required("Password is required.")
    });

    return (
        <div className="container mx-auto px-6 py-7">
            <Toaster richColors closeButton />
            <Breadcrumbs size="lg">
                <BreadcrumbItem href={HOME_SCREEN}>Home</BreadcrumbItem>
                <BreadcrumbItem isCurrent isLast>
                    Change Password
                </BreadcrumbItem>
            </Breadcrumbs>
            <div className="flex flex-wrap items-center justify-center">
                <div className="xs:w-2/3 sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/2">
                    <Image
                        src={CHANGE_PASSWORD_IMAGE}
                        alt="change-password-image"
                        className="w-full h-auto pointer-events-none"
                    />
                </div>
                <div className="xs:w-2/3 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/2">
                    <div className="text-5xl text-center lg:text-left xl:text-left antialiased">
                        Change Password
                    </div>
                    <Spacer y={8} />
                    <Formik
                        validationSchema={schema}
                        initialValues={initialFormData}
                        onSubmit={(formData, { setSubmitting, resetForm }) => {
                            const toastId = toast.loading(
                                "Please wait a moment while we change your password.",
                                {
                                    position: "top-right",
                                    duration: 4000
                                }
                            );

                            setTimeout(() => {
                                dispatch(changePassword(formData))
                                    .then(() => {
                                        toast.success("Password has been changed successfully!", {
                                            position: "top-right",
                                            duration: 4000,
                                            id: toastId
                                        });
                                    })
                                    .catch((error) => {
                                        toast.error("Password change failed!", {
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
                                    type={isOldPasswordVisible ? "text" : "password"}
                                    label="Old Password"
                                    name="oldPassword"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    isInvalid={touched.oldPassword && errors.oldPassword}
                                    isValid={touched.oldPassword && !errors.oldPassword}
                                    variant="flat"
                                    labelPlacement="outside"
                                    className="max-w-md"
                                    size="lg"
                                    autoComplete="off"
                                    errorMessage={touched.oldPassword && errors.oldPassword}
                                    color={
                                        touched.oldPassword
                                            ? errors.oldPassword
                                                ? "danger"
                                                : "success"
                                            : "default"
                                    }
                                    isRequired
                                    isReadOnly={isSubmitting}
                                    isClearable
                                    onClear={() => setFieldValue("oldPassword", "")}
                                    startContent={<LockIcon height={24} width={24} size={24} />}
                                    endContent={
                                        <div className="flex">
                                            <CloseFilledIcon className="m-2" />
                                            <button
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={toggleOldPasswordVisibility}
                                            >
                                                {isOldPasswordVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        </div>
                                    }
                                />
                                <Spacer y={5} />
                                <Field
                                    as={Input}
                                    type={isNewPasswordVisible ? "text" : "password"}
                                    label="New Password"
                                    name="newPassword"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    isInvalid={touched.newPassword && errors.newPassword}
                                    isValid={touched.newPassword && !errors.newPassword}
                                    variant="flat"
                                    labelPlacement="outside"
                                    className="max-w-md"
                                    size="lg"
                                    autoComplete="off"
                                    errorMessage={touched.newPassword && errors.newPassword}
                                    color={
                                        touched.newPassword
                                            ? errors.newPassword
                                                ? "danger"
                                                : "success"
                                            : "default"
                                    }
                                    isRequired
                                    isReadOnly={isSubmitting}
                                    isClearable
                                    onClear={() => setFieldValue("newPassword", "")}
                                    startContent={<LockIcon height={24} width={24} size={24} />}
                                    endContent={
                                        <div className="flex">
                                            <CloseFilledIcon className="m-2" />
                                            <button
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={toggleNewPasswordVisibility}
                                            >
                                                {isNewPasswordVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        </div>
                                    }
                                />
                                <Spacer y={5} />
                                <Field
                                    as={Input}
                                    type={isConfirmNewPasswordVisible ? "text" : "password"}
                                    label="Confirm New Password"
                                    name="confirmNewPassword"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    isInvalid={touched.confirmNewPassword && errors.confirmNewPassword}
                                    isValid={touched.confirmNewPassword && !errors.confirmNewPassword}
                                    variant="flat"
                                    labelPlacement="outside"
                                    className="max-w-md"
                                    size="lg"
                                    autoComplete="off"
                                    errorMessage={touched.confirmNewPassword && errors.confirmNewPassword}
                                    color={
                                        touched.confirmNewPassword
                                            ? errors.confirmNewPassword
                                                ? "danger"
                                                : "success"
                                            : "default"
                                    }
                                    isRequired
                                    isReadOnly={isSubmitting}
                                    isClearable
                                    onClear={() => setFieldValue("confirmNewPassword", "")}
                                    startContent={<LockIcon height={24} width={24} size={24} />}
                                    endContent={
                                        <div className="flex">
                                            <CloseFilledIcon className="m-2" />
                                            <button
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={toggleConfirmPasswordVisibility}
                                            >
                                                {isConfirmNewPasswordVisible ? (
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
                                    Change Password
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Spacer y={8} />
                </div>
            </div>
        </div>
    );
}

export default ChangePasswordScreen;
