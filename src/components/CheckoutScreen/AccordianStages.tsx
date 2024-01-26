import { Accordion, AccordionItem, Selection } from "@nextui-org/react";

import { CartIcon } from "icons/CartIcon";
import OrderItemDetails from "./OrderItems/OrderItemDetails";
import { PaymentMethods } from "utils/types";
import PaymentOptions from "./PaymentOptions/PaymentOptions";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import ShippingAddressDetails from "./ShippingAddress/ShippingAddressDetails";
import { TruckFastIcon } from "icons/TruckFastIcon";
import { accordianStageKeys } from "utils/getAddressDetails";

interface AccordianStagesProps {
    selectedAccordionKeys: Selection;
    setSelectedAccordionKeys: React.Dispatch<React.SetStateAction<Selection>>;
    selectedAddress: string;
    setSelectedAddress: React.Dispatch<React.SetStateAction<string>>;
    defaultAddress: string;
    selectedPaymentMethod: PaymentMethods;
    setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethods>>;
}

function AccordianStages({
    selectedAccordionKeys,
    setSelectedAccordionKeys,
    selectedAddress,
    setSelectedAddress,
    defaultAddress,
    selectedPaymentMethod,
    setSelectedPaymentMethod
}: AccordianStagesProps) {
    return (
        <Accordion
            variant="shadow"
            selectedKeys={selectedAccordionKeys}
            onSelectionChange={setSelectedAccordionKeys}
        >
            <AccordionItem
                key={accordianStageKeys.SHIPPING_ADDRESS}
                aria-label="Shipping Address"
                startContent={<TruckFastIcon height={30} width={30} size={30} strokeWidth={2} />}
                title="Shipping Address"
                subtitle="Select a delivery address."
            >
                <ShippingAddressDetails
                    setSelectedAccordionKeys={setSelectedAccordionKeys}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    defaultAddress={defaultAddress}
                />
            </AccordionItem>
            <AccordionItem
                key={accordianStageKeys.ORDER_SUMMARY}
                aria-label="Order Summary"
                startContent={<CartIcon height={30} width={30} size={30} />}
                title="Order Summary"
                subtitle="Review the order items."
            >
                <OrderItemDetails setSelectedAccordionKeys={setSelectedAccordionKeys} />
            </AccordionItem>
            <AccordionItem
                key={accordianStageKeys.PAYMENT_OPTIONS}
                aria-label="Payment Options"
                startContent={<RupeeIcon height={30} width={30} size={30} />}
                title="Payment Options"
                subtitle="Pay and complete the order."
            >
                <PaymentOptions
                    setSelectedAccordionKeys={setSelectedAccordionKeys}
                    selectedPaymentMethod={selectedPaymentMethod}
                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                />
            </AccordionItem>
        </Accordion>
    );
}

export default AccordianStages;
