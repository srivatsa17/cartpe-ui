import * as yup from "yup";

import {
    Button,
    Image,
    Input,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip
} from "@nextui-org/react";
import { Field, Formik } from "formik";

import { Cart } from "utils/types";
import { MinusCircleIcon } from "icons/MinusCircleIcon";
import { PlusCircleIcon } from "icons/PlusCircleIcon";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { TrashIcon } from "icons/TrashIcon";
import { useReduxSelector } from "hooks/redux";

function CartItemDetails() {
    const { cartItems } = useReduxSelector((state) => state.cart);

    const columns = [
        { key: "name", label: "Name" },
        { key: "price", label: "Price" },
        { key: "quantity", label: "Quantity" }
    ];

    const schema = yup.object().shape({
        quantity: yup
            .number()
            .typeError("Enter a number.")
            .min(1, "Min quantity is 1.")
            .max(10, "Max quantity is 10.")
            .required("Quantity required.")
    });

    const handleSubtractQuantity = (
        quantity: number,
        // eslint-disable-next-line no-unused-vars
        setFieldValue: (field: string, value: number, shouldValidate?: boolean | undefined) => void
    ) => {
        // Input stores quantity as a string. So convert it to a number and then set the value
        // to avoid string concatenation.
        if (typeof quantity === "string") {
            quantity = Number(quantity);
        }
        setFieldValue("quantity", quantity - 1, true);
    };

    const handleAddQuantity = (
        quantity: number,
        // eslint-disable-next-line no-unused-vars
        setFieldValue: (field: string, value: number, shouldValidate?: boolean | undefined) => void
    ) => {
        // Input stores quantity as a string. So convert it to a number and then set the value
        // to avoid string concatenation.
        if (typeof quantity === "string") {
            quantity = Number(quantity);
        }
        setFieldValue("quantity", quantity + 1, true);
    };

    const renderCell = React.useCallback((cartItem: Cart, columnKey: React.Key) => {
        const featuredImage = cartItem.product.product_images.find(
            (productImage) => productImage.is_featured === true
        );

        switch (columnKey) {
            case "name":
                return (
                    <div className="md:flex">
                        <Image
                            src={featuredImage?.image}
                            width={60}
                            height={60}
                            className="self-center"
                        />
                        <div className="md:pl-2 pt-1 text-base">
                            <div className="uppercase font-semibold">{cartItem.product.brand}</div>
                            <div className="text-default-500">{cartItem.product.name}</div>
                        </div>
                    </div>
                );
            case "price":
                return (
                    <div className="text-base">
                        <div className="flex font-semibold">
                            <RupeeIcon height={16} width={16} size={16} className="my-1" />{" "}
                            {cartItem.product.selling_price}
                        </div>
                        <div className="flex line-through text-default-500 font-semibold">
                            <RupeeIcon height={16} width={16} size={16} className="my-1" />{" "}
                            {cartItem.product.price}
                        </div>
                    </div>
                );
            case "quantity":
                return (
                    <div className="flex">
                        <Formik
                            validationSchema={schema}
                            initialValues={{ quantity: 1 }}
                            onSubmit={(formData, { setSubmitting }) => {
                                setSubmitting(false);
                            }}
                        >
                            {({ handleBlur, errors, values, setFieldValue }) => (
                                <Field
                                    as={Input}
                                    type="text"
                                    name="quantity"
                                    onBlur={handleBlur}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFieldValue("quantity", e.target.value)
                                    }
                                    isInvalid={errors.quantity}
                                    isValid={!errors.quantity}
                                    variant="bordered"
                                    size="sm"
                                    autoComplete="off"
                                    errorMessage={errors.quantity}
                                    color={errors.quantity ? "danger" : "default"}
                                    startContent={
                                        <Button
                                            isIconOnly
                                            isDisabled={values.quantity <= 1}
                                            type="submit"
                                            className="bg-foreground/0"
                                            onClick={() =>
                                                handleSubtractQuantity(
                                                    values.quantity,
                                                    setFieldValue
                                                )
                                            }
                                        >
                                            <MinusCircleIcon height={22} width={22} />
                                        </Button>
                                    }
                                    endContent={
                                        <Button
                                            isIconOnly
                                            isDisabled={values.quantity >= 10}
                                            type="submit"
                                            className="bg-foreground/0"
                                            onClick={() =>
                                                handleAddQuantity(values.quantity, setFieldValue)
                                            }
                                        >
                                            <PlusCircleIcon width={22} height={22} />
                                        </Button>
                                    }
                                    classNames={{
                                        input: "text-center",
                                        base: "w-[150px]"
                                    }}
                                />
                            )}
                        </Formik>
                        <Tooltip color="foreground" content="Remove Cart Item">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50 self-center pl-5">
                                <TrashIcon height={20} width={20} />
                            </span>
                        </Tooltip>
                    </div>
                );
        }
    }, []);

    return (
        <Table aria-label="Cart Items" isStriped>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key} align="center" className="uppercase">
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={cartItems} emptyContent={"Cart is empty."}>
                {(cartItem: Cart) => (
                    <TableRow key={cartItem ? cartItem.product.id : "1"}>
                        {(columnKey) => <TableCell>{renderCell(cartItem, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default CartItemDetails;
