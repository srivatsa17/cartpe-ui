import { Chip, Spacer, Tab, Tabs } from "@nextui-org/react";

import { Order } from "utils/types";
import OrderCard from "./OrderCard";
import React from "react";
import { useReduxSelector } from "hooks/redux";
import { useSearchParams } from "react-router-dom";

function OrderStatusTabs() {
    const { orders } = useReduxSelector((state) => state.orderList);
    const [selectedTab, setSelectedTab] = React.useState<string | number>("confirmed-orders");
    const [queryParams] = useSearchParams();
    const searchedOrder = queryParams.get("search")?.toLowerCase() ?? "";

    const handleFilterBookedOrderStatus = (order: Order) => {
        return ["CONFIRMED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"].includes(order.status);
    };

    const handleFilterCancelledOrderStatus = (order: Order) => {
        return ["CANCELLED"].includes(order.status);
    };

    const handleFilterReturnedOrderStatus = (order: Order) => {
        return ["RETURNED"].includes(order.status);
    };

    const handleFilterProductNameSearch = (order: Order) => {
        return order.order_items.some((orderItem) =>
            orderItem.product.name.toLowerCase().includes(searchedOrder)
        );
    };

    const completedOrders = orders
        .filter(handleFilterBookedOrderStatus)
        .filter(handleFilterProductNameSearch);
    const cancelledOrders = orders.filter(handleFilterCancelledOrderStatus);
    const returnedOrders = orders.filter(handleFilterReturnedOrderStatus);

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
                <Tab
                    key="returned-orders"
                    title={
                        <div className="flex items-center space-x-2">
                            <span>Returned Orders</span>
                            <Chip
                                size="sm"
                                color={selectedTab === "returned-orders" ? "primary" : "default"}
                            >
                                {returnedOrders.length}
                            </Chip>
                        </div>
                    }
                >
                    {returnedOrders.length ? (
                        returnedOrders.map((order) => {
                            return <div key={order.id}>{order.id.toString()}</div>;
                        })
                    ) : (
                        <div>No orders have been returned</div>
                    )}
                </Tab>
            </Tabs>
        </div>
    );
}

export default OrderStatusTabs;
