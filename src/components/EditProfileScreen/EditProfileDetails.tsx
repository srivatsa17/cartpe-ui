import * as yup from "yup";

import {
    Button,
    CalendarDate,
    DatePicker,
    Divider,
    Image,
    Input,
    Radio,
    RadioGroup,
    Spacer
} from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import { Toaster, toast } from "sonner";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

import DeactivateAccount from "./DeactivateAccount";
import { EDIT_PROFILE_IMAGE } from "constants/images";
import EmailIcon from "icons/EmailIcon";
import { PhoneIcon } from "icons/PhoneIcon";
import React from "react";
import { User } from "utils/types";
import UserIcon from "icons/UserIcon";
import { editProfile } from "redux/AuthService/profileSlice";
import { useReduxDispatch } from "hooks/redux";

interface EditProfileDetailsProps {
    user: User;
}

function EditProfileDetails({ user }: EditProfileDetailsProps) {
    const dispatch = useReduxDispatch();

    const genderOptions = ["Male", "Female", "Others"];

    const initialFormData = {
        fullName: user.firstName
            ? user.lastName
                ? user.firstName + " " + user.lastName
                : user.firstName
            : "",
        gender: user.gender ? user.gender : null,
        // Input field does not allow null values. Hence setting phone to empty string.
        phone: user.phone ? user.phone : "",
        dateOfBirth: user.dateOfBirth ? parseDate(user.dateOfBirth) : null
    };

    const schema = yup.object().shape({
        fullName: yup
            .string()
            .trim()
            .max(255, "Name is too long.")
            .matches(/^([a-zA-Z]+)\s+([a-zA-Z\s]+?)\s*$/, "Enter first name and last name.")
            .required("First and Last Name is required."),
        gender: yup.string().oneOf(genderOptions).nullable(),
        phone: yup
            .string()
            .trim()
            .matches(/^\d+$/, "Phone number must contain only digits.")
            .length(10, "Phone number must have exactly 10 digits."),
        dateOfBirth: yup
            .date()
            .nonNullable("Date of birth cannot be null.")
            .required("Date of birth is required.")
    });

    return (
        <div className="grid md:grid-flow-col md:grid-cols-2 grid-flow-row">
            <div>
                <Toaster richColors closeButton />
                <div>
                    <div className="text-3xl">Edit Profile</div>
                    <Spacer y={5} />
                    <Divider className="max-w-lg" />
                    <Spacer y={5} />
                    <Input
                        type="email"
                        label="Email"
                        name="email"
                        variant="flat"
                        labelPlacement="outside"
                        className="max-w-md"
                        size="md"
                        value={user.email ? user.email : ""}
                        startContent={<EmailIcon height={24} width={24} size={24} />}
                        isReadOnly
                    />
                    <Spacer y={5} />
                    <Formik
                        validationSchema={schema}
                        initialValues={initialFormData}
                        onSubmit={(formData, { setSubmitting, resetForm }) => {
                            const toastId = toast.loading(
                                "Please wait a moment while we update your profile.",
                                {
                                    position: "top-right",
                                    duration: 1000
                                }
                            );

                            setTimeout(() => {
                                dispatch(editProfile(formData))
                                    .then(() => {
                                        toast.success("Profile update successful!", {
                                            position: "top-right",
                                            duration: 10000,
                                            id: toastId
                                        });
                                    })
                                    .catch((error) => {
                                        toast.error("Profile update failed!", {
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
                            values,
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
                                    size="md"
                                    autoComplete="off"
                                    errorMessage={touched.fullName && errors.fullName}
                                    color={
                                        touched.fullName && errors.fullName ? "danger" : "default"
                                    }
                                    startContent={<UserIcon height={24} width={24} size={24} />}
                                    isClearable
                                    onClear={() => setFieldValue("fullName", "")}
                                    isReadOnly={isSubmitting}
                                    isRequired
                                />
                                <Spacer y={5} />
                                <Field
                                    as={Input}
                                    type="text"
                                    label="Phone number"
                                    name="phone"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    isInvalid={errors.phone}
                                    isValid={!errors.phone}
                                    variant="flat"
                                    labelPlacement="outside"
                                    className="max-w-md"
                                    size="md"
                                    autoComplete="off"
                                    errorMessage={touched.phone && errors.phone}
                                    color={touched.phone && errors.phone ? "danger" : "default"}
                                    startContent={
                                        <div className="flex items-center gap-3">
                                            <PhoneIcon height={24} width={24} size={24} />
                                            <div className="text-sm">+91</div>
                                        </div>
                                    }
                                    isClearable
                                    onClear={() => setFieldValue("phone", "")}
                                    isReadOnly={isSubmitting}
                                />
                                <Spacer y={5} />
                                <Field
                                    as={RadioGroup}
                                    label="Gender"
                                    orientation="horizontal"
                                    value={values.gender}
                                    onValueChange={handleChange}
                                    name="gender"
                                    isInvalid={touched.gender && errors.gender}
                                    color="secondary"
                                    size="md"
                                    classNames={{
                                        label: "text-sm text-black"
                                    }}
                                >
                                    {genderOptions.map((gender) => {
                                        return (
                                            <Radio key={gender} value={gender}>
                                                {gender}
                                            </Radio>
                                        );
                                    })}
                                </Field>
                                <Spacer y={5} />
                                <Field
                                    as={DatePicker}
                                    className="max-w-md"
                                    label="Date of birth"
                                    showMonthAndYearPickers
                                    value={values.dateOfBirth}
                                    onChange={(date: CalendarDate) =>
                                        setFieldValue("dateOfBirth", date)
                                    }
                                    minValue={parseDate("1900-01-01")}
                                    maxValue={today(getLocalTimeZone())}
                                    isInvalid={errors.dateOfBirth}
                                    errorMessage={errors.dateOfBirth}
                                    labelPlacement="outside"
                                    isRequired
                                ></Field>
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
                                    Update Profile
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Spacer y={5} />
                    <DeactivateAccount />
                </div>
            </div>
            <div>
                <Image
                    isBlurred
                    src={EDIT_PROFILE_IMAGE}
                    className="pointer-events-none self-start"
                />
            </div>
        </div>
    );
}

export default EditProfileDetails;
