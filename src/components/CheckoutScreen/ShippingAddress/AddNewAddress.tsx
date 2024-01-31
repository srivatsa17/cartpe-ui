import {
    Avatar,
    Button,
    Checkbox,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
    Spacer,
    useDisclosure
} from "@nextui-org/react";
import { Field, Form, Formik, getIn } from "formik";

import React from "react";
import { addShippingAddress } from "redux/OrderService/shippingAddressSlice";
import { useReduxDispatch } from "hooks/redux";
import { useShippingAddress } from "hooks/useShippingAddress";

function AddNewAddress() {
    const dispatch = useReduxDispatch();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const {
        shippingAddressSchema,
        initialAddNewAddressFormData,
        addressTypeOptions,
        indianStates
    } = useShippingAddress();

    return (
        <React.Fragment>
            <Button color="secondary" variant="ghost" onPress={onOpen}>
                Add new address
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="3xl"
                backdrop="opaque"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <Formik
                            validationSchema={shippingAddressSchema}
                            initialValues={initialAddNewAddressFormData}
                            onSubmit={(formData, { setSubmitting, resetForm }) => {
                                setTimeout(() => {
                                    dispatch(addShippingAddress(formData));
                                    setSubmitting(false);
                                    resetForm();
                                    onClose();
                                }, 750);
                            }}
                        >
                            {({
                                handleSubmit,
                                handleBlur,
                                handleChange,
                                touched,
                                errors,
                                values,
                                isSubmitting,
                                isValid
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <ModalHeader className="flex flex-col gap-1 capitalize text-2xl">
                                        Add new address
                                    </ModalHeader>
                                    <ModalBody>
                                        <div className="capitalize font-semibold text-xl">
                                            Contact Details
                                        </div>
                                        <div className="flex gap-5">
                                            <Field
                                                as={Input}
                                                type="text"
                                                name="name"
                                                label="Name"
                                                placeholder="Enter your name."
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={touched.name && errors.name}
                                                isValid={touched.name && !errors.name}
                                                variant="flat"
                                                isClearable
                                                isReadOnly={isSubmitting}
                                                isRequired
                                                labelPlacement="outside"
                                                className="max-w-md"
                                                autoComplete="off"
                                                errorMessage={touched.name && errors.name}
                                                color={
                                                    touched.name
                                                        ? errors.name
                                                            ? "danger"
                                                            : "success"
                                                        : "default"
                                                }
                                            />
                                            <Field
                                                as={Input}
                                                type="text"
                                                name="alternatePhone"
                                                label="Phone Number"
                                                placeholder="Enter your phone number."
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={
                                                    touched.alternatePhone && errors.alternatePhone
                                                }
                                                isValid={
                                                    touched.alternatePhone && !errors.alternatePhone
                                                }
                                                variant="flat"
                                                isClearable
                                                isReadOnly={isSubmitting}
                                                isRequired
                                                labelPlacement="outside"
                                                className="max-w-md"
                                                autoComplete="off"
                                                errorMessage={
                                                    touched.alternatePhone && errors.alternatePhone
                                                }
                                                color={
                                                    touched.alternatePhone
                                                        ? errors.alternatePhone
                                                            ? "danger"
                                                            : "success"
                                                        : "default"
                                                }
                                                startContent={
                                                    <Avatar
                                                        size="sm"
                                                        alt="India"
                                                        className="w-7 h-7"
                                                        src="https://flagcdn.com/in.svg"
                                                    />
                                                }
                                            />
                                        </div>
                                        <Spacer />
                                        <div className="capitalize font-semibold text-xl">
                                            Address
                                        </div>
                                        <div className="flex gap-5">
                                            <Field
                                                as={Input}
                                                type="text"
                                                name="address.building"
                                                label="Building"
                                                placeholder="Flat, House no., Building, Company, Apartment."
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={
                                                    getIn(touched, "address.building") &&
                                                    getIn(errors, "address.building")
                                                }
                                                isValid={
                                                    getIn(touched, "address.building") &&
                                                    !getIn(errors, "address.building")
                                                }
                                                variant="flat"
                                                isClearable
                                                isReadOnly={isSubmitting}
                                                isRequired
                                                labelPlacement="outside"
                                                className="max-w-md"
                                                autoComplete="off"
                                                errorMessage={
                                                    getIn(touched, "address.building") &&
                                                    getIn(errors, "address.building")
                                                }
                                                color={
                                                    getIn(touched, "address.building")
                                                        ? getIn(errors, "address.building")
                                                            ? "danger"
                                                            : "success"
                                                        : "default"
                                                }
                                            />
                                            <Field
                                                as={Input}
                                                type="text"
                                                name="address.area"
                                                label="Area"
                                                placeholder="Enter Area, Street, Sector, Village."
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={
                                                    getIn(touched, "address.area") &&
                                                    getIn(errors, "address.area")
                                                }
                                                isValid={
                                                    getIn(touched, "address.area") &&
                                                    !getIn(errors, "address.area")
                                                }
                                                variant="flat"
                                                isClearable
                                                isReadOnly={isSubmitting}
                                                isRequired
                                                labelPlacement="outside"
                                                className="max-w-md"
                                                autoComplete="off"
                                                errorMessage={
                                                    getIn(touched, "address.area") &&
                                                    getIn(errors, "address.area")
                                                }
                                                color={
                                                    getIn(touched, "address.area")
                                                        ? getIn(errors, "address.area")
                                                            ? "danger"
                                                            : "success"
                                                        : "default"
                                                }
                                            />
                                        </div>
                                        <Spacer />
                                        <div className="flex gap-5">
                                            <Field
                                                as={Input}
                                                type="text"
                                                name="address.city"
                                                label="City"
                                                placeholder="Town, City"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={
                                                    getIn(touched, "address.city") &&
                                                    getIn(errors, "address.city")
                                                }
                                                isValid={
                                                    getIn(touched, "address.city") &&
                                                    !getIn(errors, "address.city")
                                                }
                                                variant="flat"
                                                isClearable
                                                isReadOnly={isSubmitting}
                                                isRequired
                                                labelPlacement="outside"
                                                className="max-w-md"
                                                autoComplete="off"
                                                errorMessage={
                                                    getIn(touched, "address.city") &&
                                                    getIn(errors, "address.city")
                                                }
                                                color={
                                                    getIn(touched, "address.city")
                                                        ? getIn(errors, "address.city")
                                                            ? "danger"
                                                            : "success"
                                                        : "default"
                                                }
                                            />
                                            <Field
                                                as={Select}
                                                name="address.state"
                                                id="address.state"
                                                label="State"
                                                placeholder="Select your State."
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={
                                                    getIn(touched, "address.state") &&
                                                    getIn(errors, "address.state")
                                                }
                                                variant="flat"
                                                isDisabled={isSubmitting}
                                                isRequired
                                                labelPlacement="outside"
                                                className="max-w-md"
                                                errorMessage={
                                                    getIn(touched, "address.state") &&
                                                    getIn(errors, "address.state")
                                                }
                                                color={
                                                    getIn(touched, "address.state")
                                                        ? getIn(errors, "address.state")
                                                            ? "danger"
                                                            : "success"
                                                        : "default"
                                                }
                                            >
                                                {indianStates.map((state: string) => (
                                                    <SelectItem key={state} value={state}>
                                                        {state}
                                                    </SelectItem>
                                                ))}
                                            </Field>
                                            <Field
                                                as={Input}
                                                type="text"
                                                name="address.pinCode"
                                                label="Pin Code"
                                                placeholder="Pin Code"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={
                                                    getIn(touched, "address.pinCode") &&
                                                    getIn(errors, "address.pinCode")
                                                }
                                                isValid={
                                                    getIn(touched, "address.pinCode") &&
                                                    !getIn(errors, "address.pinCode")
                                                }
                                                variant="flat"
                                                isClearable
                                                isReadOnly={isSubmitting}
                                                isRequired
                                                labelPlacement="outside"
                                                className="max-w-md"
                                                autoComplete="off"
                                                errorMessage={
                                                    getIn(touched, "address.pinCode") &&
                                                    getIn(errors, "address.pinCode")
                                                }
                                                color={
                                                    getIn(touched, "address.pinCode")
                                                        ? getIn(errors, "address.pinCode")
                                                            ? "danger"
                                                            : "success"
                                                        : "default"
                                                }
                                            />
                                        </div>
                                        <Spacer />
                                        <Field
                                            as={RadioGroup}
                                            label="Save address as"
                                            orientation="horizontal"
                                            value={values.type}
                                            onValueChange={handleChange}
                                            name="type"
                                            isInvalid={touched.type && errors.type}
                                            color="secondary"
                                        >
                                            {addressTypeOptions.map((addressType) => {
                                                return (
                                                    <Radio key={addressType} value={addressType}>
                                                        {addressType}
                                                    </Radio>
                                                );
                                            })}
                                        </Field>
                                        <Field
                                            as={Checkbox}
                                            name="isDefault"
                                            onChange={handleChange}
                                            isInvalid={touched.isDefault && errors.isDefault}
                                            color="secondary"
                                        >
                                            Mark as default address
                                        </Field>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="primary"
                                            variant="flat"
                                            type="submit"
                                            isDisabled={!isValid || isSubmitting}
                                            isLoading={isSubmitting}
                                        >
                                            Save address
                                        </Button>
                                        <Button
                                            color="danger"
                                            variant="flat"
                                            onPress={onClose}
                                            isDisabled={isSubmitting}
                                        >
                                            Close
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            )}
                        </Formik>
                    )}
                </ModalContent>
            </Modal>
        </React.Fragment>
    );
}

export default AddNewAddress;
