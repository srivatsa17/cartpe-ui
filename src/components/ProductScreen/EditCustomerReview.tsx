import * as yup from "yup";

import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    Textarea,
    Tooltip,
    useDisclosure
} from "@nextui-org/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { Product, ProductReview } from "utils/types";
import { Toaster, toast } from "sonner";

import { EditIcon } from "icons/EditIcon";
import React from "react";
import { StarFillIcon } from "icons/StarFill";
import { updateProductReview } from "redux/ProductService/productReviewSlice";
import { useReduxDispatch } from "hooks/redux";

interface EditCustomerReviewProps {
    product: Product;
    productReview: ProductReview;
}

interface StarRatingProps {
    value: number;
    // eslint-disable-next-line no-unused-vars
    onChange: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="flex">
            {stars.map((star) => (
                <Button
                    key={star}
                    radius="full"
                    variant="light"
                    data-liked={star <= value}
                    className="bg-foreground/0 data-[liked=true]:text-rose-500 text-gray-400"
                    onPress={() => onChange(star)}
                    isIconOnly
                >
                    <StarFillIcon height={25} width={25} size={25} />
                </Button>
            ))}
        </div>
    );
};

function EditCustomerReview({ product, productReview }: EditCustomerReviewProps) {
    const dispatch = useReduxDispatch();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const productReviewSchema = yup.object().shape({
        headline: yup
            .string()
            .trim()
            .min(1, "Length is too short.")
            .max(255, "Length is too long.")
            .required("Headline is required."),
        rating: yup
            .number()
            .min(1, "Please select a rating between 1 and 5.")
            .max(5, "Please select a rating between 1 and 5.")
            .required("Rating is required."),
        comment: yup.string().trim().min(1, "Length is too short.").max(500, "Length is too long.")
    });

    const initialProductReviewValues = {
        headline: productReview.headline,
        rating: productReview.rating,
        comment: productReview.comment
    };

    return (
        <div>
            <Toaster richColors closeButton />
            <Tooltip color="foreground" content="Edit review">
                <div className="text-default-500 cursor-pointer" onClick={onOpen}>
                    <EditIcon width={22} height={22} />
                </div>
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
                            validationSchema={productReviewSchema}
                            initialValues={initialProductReviewValues}
                            onSubmit={(formData, { setSubmitting, resetForm }) => {
                                const toastId = toast.loading("Updating your review...", {
                                    position: "top-right",
                                    duration: 3000
                                });

                                setTimeout(() => {
                                    dispatch(
                                        updateProductReview(formData, product.id, productReview.id)
                                    )
                                        .then(() => {
                                            toast.success("Updated your review successfully", {
                                                id: toastId,
                                                position: "top-right",
                                                duration: 4000
                                            });
                                        })
                                        .catch(() =>
                                            toast.error("Failed to update your review", {
                                                id: toastId,
                                                position: "top-right",
                                                duration: 4000
                                            })
                                        );
                                    setSubmitting(false);
                                    resetForm();
                                    onClose();
                                }, 2000);
                            }}
                        >
                            {({
                                handleSubmit,
                                handleBlur,
                                handleChange,
                                setFieldValue,
                                touched,
                                errors,
                                isSubmitting,
                                isValid,
                                dirty
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <ModalHeader className="flex flex-col gap-1 text-2xl">
                                        Update your review
                                    </ModalHeader>
                                    <ModalBody>
                                        <div>
                                            <label htmlFor="rating" className="text-medium">
                                                Rating
                                                <span className="px-0.5 text-rose-500">*</span>
                                            </label>
                                            <Field name="rating">
                                                {({ field }: FieldProps<number>) => (
                                                    <StarRating
                                                        value={field.value}
                                                        onChange={(value) =>
                                                            setFieldValue("rating", value)
                                                        }
                                                    />
                                                )}
                                            </Field>
                                            {errors.rating && (
                                                <div className="text-red-500 text-sm">
                                                    {errors.rating}
                                                </div>
                                            )}
                                        </div>
                                        <Spacer />
                                        <Field
                                            as={Input}
                                            type="text"
                                            name="headline"
                                            label="Headline"
                                            placeholder="Enter a headline."
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            isInvalid={touched.headline && errors.headline}
                                            isValid={touched.headline && !errors.headline}
                                            variant="flat"
                                            isClearable
                                            isReadOnly={isSubmitting}
                                            isRequired
                                            labelPlacement="outside"
                                            className="max-w-md"
                                            autoComplete="off"
                                            errorMessage={touched.headline && errors.headline}
                                            color={
                                                touched.headline && errors.headline
                                                    ? "danger"
                                                    : "default"
                                            }
                                        />
                                        <Spacer />
                                        <Field
                                            as={Textarea}
                                            name="comment"
                                            label="Comment"
                                            placeholder="Enter a comment."
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            isInvalid={touched.comment && errors.comment}
                                            isValid={touched.comment && !errors.comment}
                                            variant="flat"
                                            isReadOnly={isSubmitting}
                                            labelPlacement="outside"
                                            classNames={{
                                                base: "max-w-md"
                                            }}
                                            autoComplete="off"
                                            errorMessage={touched.comment && errors.comment}
                                            color="default"
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="primary"
                                            variant="flat"
                                            type="submit"
                                            isDisabled={!dirty || !isValid || isSubmitting}
                                            isLoading={isSubmitting}
                                        >
                                            Update review
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
        </div>
    );
}

export default EditCustomerReview;
