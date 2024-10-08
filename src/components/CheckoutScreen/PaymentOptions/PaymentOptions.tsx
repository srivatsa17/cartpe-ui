import { Button, Divider, Radio, RadioGroup, Selection, Spacer } from "@nextui-org/react";

import PayCashOnDelivery from "./PayCashOnDelivery";
import PayUPI from "../RazorPay/PayUPI";
import { PaymentMethods } from "utils/types";
import React from "react";
import { paymentOptions } from "utils/getPaymentOptions";
import { useReduxSelector } from "hooks/redux";

interface PaymentOptionsProps {
    setSelectedAccordionKeys: React.Dispatch<React.SetStateAction<Selection>>;
    selectedPaymentMethod: PaymentMethods;
    setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethods>>;
}

function PaymentOptions({
    setSelectedAccordionKeys,
    selectedPaymentMethod,
    setSelectedPaymentMethod
}: PaymentOptionsProps) {
    const [isPayNowButtonLoading, setIsPayNowButtonLoading] = React.useState(false);
    const [isPayNowClicked, setIsPayNowClicked] = React.useState(false);
    const { shippingAddressId, orderItems, amount } = useReduxSelector(
        (state) => state.checkoutDetails
    );

    const handlePayment = () => {
        // Create a loading effect for 1s and then set the button clicked state to true
        // to trigger backend API call.
        setIsPayNowButtonLoading(true);
        setTimeout(() => {
            setIsPayNowClicked(true);
            setSelectedAccordionKeys(new Set([]));
            setIsPayNowButtonLoading(false);
        }, 1000);
    };

    return (
        <div className="p-2">
            <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={(value: string) => setSelectedPaymentMethod(value as PaymentMethods)}
                color="secondary"
                label="Choose a payment method."
            >
                {paymentOptions.map((paymentMethod) => {
                    return (
                        <Radio
                            key={paymentMethod.key}
                            value={paymentMethod.label}
                            description={paymentMethod.description}
                            classNames={{
                                labelWrapper: "px-2 pb-2"
                            }}
                        >
                            {paymentMethod.label}
                        </Radio>
                    );
                })}
            </RadioGroup>
            <Spacer y={2} />
            <Divider />
            <Spacer y={5} />
            <Button
                variant="ghost"
                color="success"
                onPress={handlePayment}
                isDisabled={shippingAddressId === null || orderItems.length === 0 || amount === 0}
                isLoading={isPayNowButtonLoading}
                className="w-40"
            >
                Pay Now
            </Button>
            {isPayNowClicked ? (
                selectedPaymentMethod === "UPI" ? (
                    <PayUPI />
                ) : (
                    <PayCashOnDelivery />
                )
            ) : null}
        </div>
    );
}

export default PaymentOptions;
