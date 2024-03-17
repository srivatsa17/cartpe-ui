import { BreadcrumbItem, Breadcrumbs, Spacer } from "@nextui-org/react";
import { HOME_SCREEN, ORDER_SCREEN } from "constants/routes";

import { Order } from "utils/types";
import OrderDetailsCard from "./OrderDetailsCard";
import React from "react";

interface OrderDetailsProps {
    order: Order;
}

function OrderDetails({ order }: OrderDetailsProps) {
    return (
        <div className="container mx-auto px-6 py-7">
            <Breadcrumbs className="mb-3" size="lg">
                <BreadcrumbItem href={HOME_SCREEN}>Home</BreadcrumbItem>
                <BreadcrumbItem href={ORDER_SCREEN}>Orders</BreadcrumbItem>
                <BreadcrumbItem isCurrent isLast>
                    Order Details
                </BreadcrumbItem>
            </Breadcrumbs>
            <Spacer y={5} />
            <div className="text-3xl">Your Order Details</div>
            <Spacer y={5} />
            <div>
                <OrderDetailsCard order={order} />
            </div>
        </div>
    );
}

export default OrderDetails;
