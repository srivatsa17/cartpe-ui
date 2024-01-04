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
    Tooltip,
    useDisclosure
} from "@nextui-org/react";
import { Field, Form, Formik, getIn } from "formik";

import { EditIcon } from "icons/EditIcon";
import React from "react";
import { ShippingAddress } from "utils/types";
import { editShippingAddress } from "redux/OrderService/shippingAddressSlice";
import { useReduxDispatch } from "hooks/redux";
import { useShippingAddress } from "hooks/useShippingAddress";

interface EditAddressProps {
    shippingAddress: ShippingAddress;
}

function EditAddress({ shippingAddress }: EditAddressProps) {
    const dispatch = useReduxDispatch();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { shippingAddressSchema, addressTypeOptions, indianStates } = useShippingAddress();

    return (
        <React.Fragment>
            <Tooltip content="Edit address" color="foreground">
                <Button isIconOnly className="bg-foreground/0 text-default-400" onPress={onOpen}>
                    <EditIcon height={22} width={22} />
                </Button>
            </Tooltip>
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
                            initialValues={shippingAddress}
                            onSubmit={(formData, { setSubmitting }) => {
                                setTimeout(() => {
                                    dispatch(editShippingAddress(formData));
                                    setSubmitting(false);
                                    onClose();
                                }, 500);
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
                                isValid,
                                dirty
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <ModalHeader className="flex flex-col gap-1 capitalize text-2xl">
                                        Edit address
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
                                                name="alternate_phone"
                                                label="Phone Number"
                                                placeholder="Enter your phone number."
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={
                                                    touched.alternate_phone &&
                                                    errors.alternate_phone
                                                }
                                                isValid={
                                                    touched.alternate_phone &&
                                                    !errors.alternate_phone
                                                }
                                                variant="flat"
                                                isClearable
                                                isReadOnly={isSubmitting}
                                                isRequired
                                                labelPlacement="outside"
                                                className="max-w-md"
                                                autoComplete="off"
                                                errorMessage={
                                                    touched.alternate_phone &&
                                                    errors.alternate_phone
                                                }
                                                color={
                                                    touched.alternate_phone
                                                        ? errors.alternate_phone
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
                                                name="address.line1"
                                                label="Building"
                                                placeholder="Flat, House no., Building, Company, Apartment."
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={
                                                    getIn(touched, "address.line1") &&
                                                    getIn(errors, "address.line1")
                                                }
                                                isValid={
                                                    getIn(touched, "address.line1") &&
                                                    !getIn(errors, "address.line1")
                                                }
                                                variant="flat"
                                                isClearable
                                                isReadOnly={isSubmitting}
                                                isRequired
                                                labelPlacement="outside"
                                                className="max-w-md"
                                                autoComplete="off"
                                                errorMessage={
                                                    getIn(touched, "address.line1") &&
                                                    getIn(errors, "address.line1")
                                                }
                                                color={
                                                    getIn(touched, "address.line1")
                                                        ? getIn(errors, "address.line1")
                                                            ? "danger"
                                                            : "success"
                                                        : "default"
                                                }
                                            />
                                            <Field
                                                as={Input}
                                                type="text"
                                                name="address.line2"
                                                label="Area"
                                                placeholder="Enter Area, Street, Sector, Village."
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={
                                                    getIn(touched, "address.line2") &&
                                                    getIn(errors, "address.line2")
                                                }
                                                isValid={
                                                    getIn(touched, "address.line2") &&
                                                    !getIn(errors, "address.line2")
                                                }
                                                variant="flat"
                                                isClearable
                                                isReadOnly={isSubmitting}
                                                isRequired
                                                labelPlacement="outside"
                                                className="max-w-md"
                                                autoComplete="off"
                                                errorMessage={
                                                    getIn(touched, "address.line2") &&
                                                    getIn(errors, "address.line2")
                                                }
                                                color={
                                                    getIn(touched, "address.line2")
                                                        ? getIn(errors, "address.line2")
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
                                                selectedKeys={
                                                    values.address.state
                                                        ? [values.address.state]
                                                        : []
                                                }
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
                                                name="address.pin_code"
                                                label="Pin Code"
                                                placeholder="Pin Code"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={
                                                    getIn(touched, "address.pin_code") &&
                                                    getIn(errors, "address.pin_code")
                                                }
                                                isValid={
                                                    getIn(touched, "address.pin_code") &&
                                                    !getIn(errors, "address.pin_code")
                                                }
                                                variant="flat"
                                                isClearable
                                                isReadOnly={isSubmitting}
                                                isRequired
                                                labelPlacement="outside"
                                                className="max-w-md"
                                                autoComplete="off"
                                                errorMessage={
                                                    getIn(touched, "address.pin_code") &&
                                                    getIn(errors, "address.pin_code")
                                                }
                                                color={
                                                    getIn(touched, "address.pin_code")
                                                        ? getIn(errors, "address.pin_code")
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
                                            name="is_default"
                                            isSelected={values.is_default}
                                            onChange={handleChange}
                                            isInvalid={touched.is_default && errors.is_default}
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
                                            isDisabled={!dirty || !isValid || isSubmitting}
                                            isLoading={isSubmitting}
                                        >
                                            Edit address
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

export default EditAddress;
