import { Accordion, AccordionItem, Selection } from "@nextui-org/react";

import { CartIcon } from "icons/CartIcon";
import CartItemDetails from "components/CartScreen/CartItemDetails";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import ShippingAddressDetails from "./ShippingAddress/ShippingAddress";
import { TruckFastIcon } from "icons/TruckFastIcon";

export interface IHash {
    [details: string]: string;
}

export const accordianStageKeys: IHash = {
    SHIPPING_ADDRESS: "1",
    ORDER_SUMMARY: "2",
    PAYMENT_OPTIONS: "3"
};

function AccordianStages() {
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
        new Set([accordianStageKeys["SHIPPING_ADDRESS"]])
    );

    return (
        <Accordion variant="shadow" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
            <AccordionItem
                key={accordianStageKeys["SHIPPING_ADDRESS"]}
                aria-label="Shipping Address"
                startContent={<TruckFastIcon height={30} width={30} size={30} strokeWidth={2} />}
                title="Shipping Address"
                subtitle="Select a delivery address."
            >
                <ShippingAddressDetails />
            </AccordionItem>
            <AccordionItem
                key={accordianStageKeys["ORDER_SUMMARY"]}
                aria-label="Order Summary"
                startContent={<CartIcon height={30} width={30} size={30} />}
                title="Order Summary"
                subtitle="Review the order items."
            >
                <div className="p-2">
                    <CartItemDetails />
                </div>
            </AccordionItem>
            <AccordionItem
                key={accordianStageKeys["PAYMENT_OPTIONS"]}
                aria-label="Payment Options"
                startContent={<RupeeIcon height={30} width={30} size={30} />}
                title="Payment Options"
                subtitle="Choose a payment method."
            >
                h
            </AccordionItem>
        </Accordion>
    );
}

export default AccordianStages;
