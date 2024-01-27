import { Chip, Spacer, Tab, Tabs } from "@nextui-org/react";

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

    const [selectedTab, setSelectedTab] = React.useState<string | number>("confirmed-orders");

    return (
        <div>
            <Tabs
                variant="underlined"
                color="primary"
                selectedKey={selectedTab}
                onSelectionChange={(value: string | number) => setSelectedTab(value)}
                classNames={{
                    tabList: "gap-x-6",
                    tab: "text-md px-0 h-12 max-w-fit",
                    cursor: "w-full"
                }}
            >
                <Tab
                    key="confirmed-orders"
                    title={
                        <div className="flex items-center space-x-2">
                            <span>Orders</span>
                            <Chip
                                size="sm"
                                color={selectedTab === "confirmed-orders" ? "primary" : "default"}
                            >
                                {completedOrders.length}
                            </Chip>
                        </div>
                    }
                >
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
                <Tab
                    key="cancelled-orders"
                    title={
                        <div className="flex items-center space-x-2">
                            <span>Cancelled Orders</span>
                            <Chip
                                size="sm"
                                color={selectedTab === "cancelled-orders" ? "primary" : "default"}
                            >
                                {cancelledOrders.length}
                            </Chip>
                        </div>
                    }
                >
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
