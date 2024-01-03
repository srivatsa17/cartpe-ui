import { BreadcrumbItem, Breadcrumbs, Spacer } from "@nextui-org/react";
import { CART_SCREEN, HOME_SCREEN } from "constants/routes";

import AccordianStages from "components/CheckoutScreen/AccordianStages";
import ProgressStepper from "components/CheckoutScreen/ProgressStepper";
import React from "react";

function CheckoutScreen() {
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
            <div className="grid grid-cols-3">
                <div className="col-span-3 xl:col-span-2">
                    <AccordianStages />
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default CheckoutScreen;
