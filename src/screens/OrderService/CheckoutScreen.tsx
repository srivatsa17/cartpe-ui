import { BreadcrumbItem, Breadcrumbs, Selection, Spacer } from "@nextui-org/react";
import { CART_SCREEN, HOME_SCREEN } from "constants/routes";
import { accordianStageKeys, getDefaultAddress } from "utils/getAddressDetails";

import AccordianStages from "components/CheckoutScreen/AccordianStages";
import CheckoutCards from "components/CheckoutScreen/CheckoutCards";
import { PaymentMethods } from "utils/types";
import ProgressStepper from "components/CheckoutScreen/ProgressStepper";
import React from "react";
import { useReduxSelector } from "hooks/redux";

function CheckoutScreen() {
    const { addressList } = useReduxSelector((state) => state.address);

    const defaultAddress = getDefaultAddress(addressList);
    const [selectedAddress, setSelectedAddress] = React.useState(defaultAddress);

    const [selectedAccordionKeys, setSelectedAccordionKeys] = React.useState<Selection>(
        new Set([accordianStageKeys.SHIPPING_ADDRESS])
    );

    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<PaymentMethods>("UPI");

    return (
        <div className="container mx-auto px-6 py-7">
            <Breadcrumbs className="mb-3" size="lg">
                <BreadcrumbItem href={HOME_SCREEN}>Home</BreadcrumbItem>
                <BreadcrumbItem href={CART_SCREEN}>Cart</BreadcrumbItem>
                <BreadcrumbItem isCurrent isLast>
                    Checkout
                </BreadcrumbItem>
            </Breadcrumbs>
            {/* Placeholder component to be updated once NextUI supports a stepper. */}
            <ProgressStepper />
            <Spacer y={10} />
            <div className="grid xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <AccordianStages
                        selectedAccordionKeys={selectedAccordionKeys}
                        setSelectedAccordionKeys={setSelectedAccordionKeys}
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}
                        defaultAddress={defaultAddress}
                        selectedPaymentMethod={selectedPaymentMethod}
                        setSelectedPaymentMethod={setSelectedPaymentMethod}
                    />
                </div>
                <div className="my-7 xl:my-0 xl:pl-5">
                    <CheckoutCards
                        selectedAccordionKeys={selectedAccordionKeys}
                        setSelectedAccordionKeys={setSelectedAccordionKeys}
                        selectedAddress={selectedAddress}
                    />
                </div>
            </div>
        </div>
    );
}

export default CheckoutScreen;
