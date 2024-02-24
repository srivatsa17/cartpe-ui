import * as yup from "yup";

import {
    Button,
    Image,
    Input,
    Link,
    Spacer,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip
} from "@nextui-org/react";
import { Field, Formik } from "formik";
import { removeCartItem, updateCartItem } from "redux/CartService/cartSlice";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import { Cart } from "utils/types";
import { MinusCircleIcon } from "icons/MinusCircleIcon";
import { PlusCircleIcon } from "icons/PlusCircleIcon";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { TrashIcon } from "icons/TrashIcon";
import { debounce } from "lodash";

function CartItemDetails() {
    const dispatch = useReduxDispatch();
    const { cartItems, isLoading } = useReduxSelector((state) => state.cart);

    const columns = [
        { key: "product", label: "Product" },
        { key: "quantity", label: "Quantity" },
        { key: "delete", label: "" }
    ];

    const schema = yup.object().shape({
        quantity: yup
            .number()
            .typeError("Enter a number.")
            .min(1, "Min quantity is 1.")
            .max(10, "Max quantity is 10.")
            .required("Quantity required.")
    });

    const checkIntRegex = /^(?:[1-9]|10)$/;

    // Send update API request after 500ms of user typing.
    const debouncedSendRequest = React.useMemo(() => {
        const sendRequest = (cartItem: Cart, quantity: string) => {
            // Send API call only if the input is a number from 1-10.
            if (quantity.match(checkIntRegex)) {
                // Quantity might of type string. Typecase it to a number during API call.
                dispatch(updateCartItem(cartItem.product.id, Number(quantity)));
            }
        };

        return debounce(sendRequest, 500);
    }, []);

    const handleQuantityInputChange = (
        quantity: string,
        // eslint-disable-next-line no-unused-vars
        setFieldValue: (field: string, value: string, shouldValidate?: boolean | undefined) => void,
        cartItem: Cart
    ) => {
        setFieldValue("quantity", quantity);
        debouncedSendRequest(cartItem, quantity);
    };

    const handleSubtractQuantity = (
        quantity: number,
        // eslint-disable-next-line no-unused-vars
        setFieldValue: (field: string, value: number, shouldValidate?: boolean | undefined) => void,
        cartItem: Cart
    ) => {
        // Input stores quantity as a string. So convert it to a number and then set the value
        // to avoid string concatenation.
        if (typeof quantity === "string") {
            quantity = Number(quantity);
        }
        setFieldValue("quantity", quantity - 1, true);
        // cartItem.product.id basically refers to the Product Variant ID.
        dispatch(updateCartItem(cartItem.product.id, quantity - 1));
    };

    const handleAddQuantity = (
        quantity: number,
        // eslint-disable-next-line no-unused-vars
        setFieldValue: (field: string, value: number, shouldValidate?: boolean | undefined) => void,
        cartItem: Cart
    ) => {
        // Input stores quantity as a string. So convert it to a number and then set the value
        // to avoid string concatenation.
        if (typeof quantity === "string") {
            quantity = Number(quantity);
        }
        setFieldValue("quantity", quantity + 1, true);
        // cartItem.product.id basically refers to the Product Variant ID.
        dispatch(updateCartItem(cartItem.product.id, quantity + 1));
    };

    const handleRemoveCartItem = (cartItem: Cart) => {
        // cartItem.product.id basically refers to the Product Variant ID.
        dispatch(removeCartItem(cartItem.product.id));
    };

    const renderCell = React.useCallback((cartItem: Cart, columnKey: React.Key) => {
        switch (columnKey) {
            case "product":
                return (
                    <div className="md:flex gap-4 items-center">
                        <div>
                            <Image src={cartItem.product.images[0]} width={75} height={75} />
                        </div>
                        <div>
                            <Link
                                href={`/products/${cartItem.product.productSlug}/${cartItem.product.productId}/buy`}
                                isExternal
                                color="foreground"
                            >
                                <div>
                                    <div className="uppercase font-semibold">
                                        {cartItem.product.productBrand}
                                    </div>
                                    <div className="text-default-500">
                                        {cartItem.product.productName}
                                    </div>
                                </div>
                            </Link>
                            <div className="capitalize text-default-500 text-md">
                                {cartItem.product.properties.map((property) => {
                                    return (
                                        <div key={property.id}>
                                            {property.name} - {property.value}
                                        </div>
                                    );
                                })}
                            </div>
                            <Spacer y={1} />
                            <div className="flex text-base gap-3">
                                <div className="flex items-center font-semibold">
                                    <RupeeIcon height={16} width={16} size={16} />{" "}
                                    {cartItem.product.sellingPrice}
                                </div>
                                <div className="flex items-center line-through text-default-500 font-semibold">
                                    <RupeeIcon height={16} width={16} size={16} />{" "}
                                    {cartItem.product.price}
                                </div>
                                <div className="text-rose-500 font-semibold">
                                    ({cartItem.product.discount}% Off)
                                </div>
                            </div>
                            <Spacer y={1} />
                        </div>
                    </div>
                );
            case "quantity":
                return (
                    <div className="flex">
                        <Formik
                            validationSchema={schema}
                            initialValues={{ quantity: cartItem.quantity || 1 }}
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
                                        handleQuantityInputChange(
                                            e.target.value,
                                            setFieldValue,
                                            cartItem
                                        )
                                    }
                                    isInvalid={errors.quantity}
                                    isValid={!errors.quantity}
                                    isReadOnly={isLoading}
                                    isDisabled={isLoading}
                                    variant="bordered"
                                    size="sm"
                                    autoComplete="off"
                                    errorMessage={errors.quantity}
                                    color={errors.quantity ? "danger" : "default"}
                                    startContent={
                                        <Button
                                            isIconOnly
                                            isDisabled={isLoading || values.quantity <= 1}
                                            type="submit"
                                            className="bg-foreground/0"
                                            onPress={() =>
                                                handleSubtractQuantity(
                                                    values.quantity,
                                                    setFieldValue,
                                                    cartItem
                                                )
                                            }
                                        >
                                            <MinusCircleIcon height={22} width={22} />
                                        </Button>
                                    }
                                    endContent={
                                        <Button
                                            isIconOnly
                                            isDisabled={isLoading || values.quantity >= 10}
                                            type="submit"
                                            className="bg-foreground/0"
                                            onPress={() =>
                                                handleAddQuantity(
                                                    values.quantity,
                                                    setFieldValue,
                                                    cartItem
                                                )
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
                    </div>
                );
            case "delete":
                return (
                    <Tooltip color="foreground" content="Remove Cart Item">
                        <div
                            className="text-lg text-danger cursor-pointer active:opacity-50 self-center"
                            onClick={() => handleRemoveCartItem(cartItem)}
                        >
                            <TrashIcon height={20} width={20} />
                        </div>
                    </Tooltip>
                );
        }
    }, []);

    return (
        <Table aria-label="Cart Items" isStriped>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key} className="uppercase text-center">
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
