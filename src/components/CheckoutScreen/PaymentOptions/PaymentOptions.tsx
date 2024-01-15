import { Button, Divider, Radio, RadioGroup, Selection, Spacer } from "@nextui-org/react";

import DisplayRazorPayCard from "../RazorPay/RazorPayCard";
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
    const [isPlaceOrderButtonClicked, setIsPlaceOrderButtonClicked] = React.useState(false);
    const { shippingAddressId, orderItems, amount } = useReduxSelector(
        (state) => state.checkoutDetails
    );

    const handlePayment = () => {
        setIsPlaceOrderButtonClicked(true);
        setSelectedAccordionKeys(new Set([]));
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
                onClick={handlePayment}
                isDisabled={shippingAddressId === null || orderItems.length === 0 || amount === 0}
            >
                Pay Now
            </Button>
            {isPlaceOrderButtonClicked && selectedPaymentMethod === "UPI" && (
                <DisplayRazorPayCard />
            )}
        </div>
    );
}

export default PaymentOptions;
