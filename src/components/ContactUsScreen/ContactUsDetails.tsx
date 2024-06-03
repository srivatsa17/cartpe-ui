import * as yup from "yup";

import { Autocomplete, AutocompleteItem, Button, Spacer, Textarea } from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import { Toaster, toast } from "sonner";

import React from "react";
import { contactUs } from "redux/CustomerService/contactUsSlice";
import { useReduxDispatch } from "hooks/redux";

function ContactUsDetails() {
    const dispatch = useReduxDispatch();

    const topics = [
        { key: "order-status", label: "Order Status" },
        { key: "shipping-and-delivery", label: "Shipping and Delivery" },
        { key: "returns-and-refunds", label: "Returns and Refunds" },
        { key: "payment-issues", label: "Payment Issues" },
        { key: "account-issues", label: "Account Issues" },
        { key: "product-inquiry", label: "Product Inquiry" },
        { key: "technical-support", label: "Technical Support" },
        { key: "feedback-and-suggestions", label: "Feedback and Suggestions" },
        { key: "report-a-problem", label: "Report a Problem" },
        { key: "general-inquiry", label: "General Inquiry" }
    ];

    const topicKeys = topics.map((topic) => topic.key);

    const getLabelFromKey = (key: React.Key) => {
        const topic = topics.find((topic) => topic.key === key);
        return topic ? topic.label : key;
    };

    const initialFormData = {
        topic: "",
        comment: ""
    };

    const schema = yup.object().shape({
        topic: yup
            .string()
            .trim()
            .oneOf(topicKeys, "Enter a valid topic of concern.")
            .required("Topic of concern is required."),
        comment: yup.string().trim().required("Comment is required.")
    });

    return (
        <div>
            <Toaster richColors closeButton />
            <Spacer y={5} />
            <Formik
                validationSchema={schema}
                initialValues={initialFormData}
                onSubmit={(formData, { setSubmitting, resetForm }) => {
                    const topicLabel = getLabelFromKey(formData.topic);

                    const contactUsFormData = {
                        ...formData,
                        topic: topicLabel
                    };

                    const toastId = toast.loading(
                        "Please wait a moment while we post your inquiry.",
                        {
                            position: "top-right",
                            duration: 4000
                        }
                    );
                    setTimeout(() => {
                        dispatch(contactUs(contactUsFormData))
                            .then(() => {
                                toast.success("Your inquiry has been posted successfully!", {
                                    position: "top-right",
                                    duration: 4000,
                                    id: toastId
                                });
                            })
                            .catch((error) => {
                                toast.error("Failed to post inquiry!", {
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
                    values,
                    isValid,
                    isSubmitting,
                    dirty
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field
                            as={Autocomplete}
                            name="topic"
                            id="topic"
                            label="Topic"
                            placeholder="Select your topic of concern."
                            onBlur={handleBlur}
                            defaultItems={topics}
                            selectedKey={values.topic}
                            onSelectionChange={(key: React.Key) => setFieldValue("topic", key)}
                            onInputChange={handleChange}
                            isInvalid={touched.topic && errors.topic}
                            variant="flat"
                            isDisabled={isSubmitting}
                            isRequired
                            labelPlacement="outside"
                            className="max-w-md"
                            errorMessage={touched.topic && errors.topic}
                            color={touched.topic && errors.topic ? "danger" : "default"}
                        >
                            {topics.map((topic) => (
                                <AutocompleteItem key={topic.key}>{topic.label}</AutocompleteItem>
                            ))}
                        </Field>
                        <Spacer y={5} />
                        <Field
                            as={Textarea}
                            label="Comment"
                            name="comment"
                            placeholder="Please enter your concern."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            isInvalid={touched.comment && errors.comment}
                            isValid={touched.comment && !errors.comment}
                            variant="flat"
                            labelPlacement="outside"
                            className="max-w-md"
                            size="md"
                            autoComplete="off"
                            errorMessage={touched.comment && errors.comment}
                            color={touched.comment && errors.comment ? "danger" : "default"}
                            isRequired
                            isReadOnly={isSubmitting}
                            minRows={5}
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
                            Submit concern
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ContactUsDetails;
