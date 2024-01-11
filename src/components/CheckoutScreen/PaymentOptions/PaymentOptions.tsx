import { Radio, RadioGroup } from "@nextui-org/react";

import React from "react";

function PaymentOptions() {
    const paymentOptions = [
        { key: "upi", label: "UPI", description: "Pay using UPI, QR, Cards and more." },
        { key: "cod", label: "Cash on Delivery", description: "Pay on the day of delivery." }
    ];

    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState("UPI");

    return (
        <div className="p-2">
            <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
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
        </div>
    );
}

export default PaymentOptions;
