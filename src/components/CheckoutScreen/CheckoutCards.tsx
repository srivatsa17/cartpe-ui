import AddressCard from "./ShippingAddress/AddressCard";
import OrderCard from "./OrderItems/OrderCard";
import PaymentCard from "./PaymentOptions/PaymentCard";
import React from "react";
import { Selection } from "@nextui-org/react";
import { accordianStageKeys } from "utils/getAddressDetails";

interface CheckoutCardProps {
    selectedAccordionKeys: Selection;
    setSelectedAccordionKeys: React.Dispatch<React.SetStateAction<Selection>>;
    selectedAddress: string;
}

function CheckoutCards({
    selectedAccordionKeys,
    setSelectedAccordionKeys,
    selectedAddress
}: CheckoutCardProps) {
    let cardToRender;
    if (selectedAccordionKeys !== "all") {
        if (selectedAccordionKeys.has(accordianStageKeys.SHIPPING_ADDRESS)) {
            cardToRender = (
                <AddressCard
                    setSelectedAccordionKeys={setSelectedAccordionKeys}
                    selectedAddress={selectedAddress}
                />
            );
        } else if (selectedAccordionKeys.has(accordianStageKeys.ORDER_SUMMARY)) {
            cardToRender = <OrderCard setSelectedAccordionKeys={setSelectedAccordionKeys} />;
        } else if (selectedAccordionKeys.has(accordianStageKeys.PAYMENT_OPTIONS)) {
            cardToRender = <PaymentCard />;
        } else {
            cardToRender = <React.Fragment></React.Fragment>;
        }
    }

    return <React.Fragment>{cardToRender}</React.Fragment>;
}

export default CheckoutCards;
