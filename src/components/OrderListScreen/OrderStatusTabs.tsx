import { Spacer, Tab, Tabs } from "@nextui-org/react";

import OrderCard from "./OrderCard";
import React from "react";
import { useReduxSelector } from "hooks/redux";

function OrderStatusTabs() {
    const { orders } = useReduxSelector((state) => state.orderList);

    const completedOrders = orders.filter(
        (order) =>
            order.status === "PENDING" ||
            "CONFIRMED" ||
            "SHIPPED" ||
            "OUT_FOR_DELIVERY" ||
            "DELIVERED"
    );

    const cancelledOrders = orders.filter((order) => order.status === "CANCELLED");

    return (
        <div>
            <Tabs
                variant="underlined"
                color="primary"
                classNames={{
                    tab: "text-lg"
                }}
            >
                <Tab key="confirmed-orders" title="Order">
                    {completedOrders.length ? (
                        completedOrders.map((order) => {
                            return (
                                <div key={order.id} className="grid xl:grid-cols-3">
                                    <div className="xl:col-span-2">
                                        <OrderCard order={order} />
                                        <Spacer y={7} />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>Looks like there no orders yet</div>
                    )}
                </Tab>
                <Tab key="cancelled-orders" title="Cancelled Orders">
                    {cancelledOrders.length ? (
                        cancelledOrders.map((order) => {
                            return <div key={order.id}>{order.id.toString()}</div>;
                        })
                    ) : (
                        <div>No orders have been cancelled</div>
                    )}
                </Tab>
            </Tabs>
        </div>
    );
}

export default OrderStatusTabs;
