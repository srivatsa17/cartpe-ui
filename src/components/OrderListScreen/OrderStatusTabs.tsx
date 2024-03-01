import { Chip, Spacer, Tab, Tabs } from "@nextui-org/react";

import { ORDER_SEARCH } from "constants/queryParam";
import { Order } from "utils/types";
import OrderCard from "./OrderCard";
import { OrderStatus } from "utils/getOrderStatus";
import React from "react";
import { useReduxSelector } from "hooks/redux";
import { useSearchParams } from "react-router-dom";

function OrderStatusTabs() {
    const { orders } = useReduxSelector((state) => state.orderList);
    const [selectedTab, setSelectedTab] = React.useState<string | number>(OrderStatus.CONFIRMED);
    const [queryParams] = useSearchParams();
    const searchedOrder = queryParams.get(ORDER_SEARCH)?.toLowerCase() ?? "";

    const handleFilterOrdersByStatus = (order: Order, status: string): boolean => {
        switch (status) {
            case OrderStatus.CONFIRMED:
                return ["CONFIRMED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"].includes(
                    order.status
                );
            case OrderStatus.CANCELLED:
                return order.status === "CANCELLED";
            case OrderStatus.RETURNED:
                return order.status === "RETURNED";
            default:
                return false;
        }
    };

    const handleFilterOrdersByProductName = (order: Order): boolean =>
        order.orderItems.some((orderItem) =>
            orderItem.product.name.toLowerCase().includes(searchedOrder)
        );

    const filteredOrders = (status: string) =>
        orders.filter((order) => handleFilterOrdersByStatus(order, status));

    // Perform search operation only for the currently selected tab.
    const getOrderCount = (tabKey: string) => {
        if (selectedTab === tabKey) {
            return filteredOrders(tabKey).filter(handleFilterOrdersByProductName).length;
        }
        return filteredOrders(tabKey).length;
    };

    const tabData = [
        {
            key: OrderStatus.CONFIRMED,
            title: "Orders",
            emptyListTitle: "No orders found."
        },
        {
            key: OrderStatus.CANCELLED,
            title: "Cancelled Orders",
            emptyListTitle: "No cancelled orders found."
        },
        {
            key: OrderStatus.RETURNED,
            title: "Returned Orders",
            emptyListTitle: "No returned orders found."
        }
    ];

    return (
        <div>
            <Tabs
                variant="underlined"
                color="primary"
                selectedKey={selectedTab}
                onSelectionChange={(value: string | number) => setSelectedTab(value)}
                classNames={{
                    tabList: "gap-x-6",
                    tab: "text-base px-0 h-12 max-w-fit",
                    cursor: "w-full"
                }}
            >
                {tabData.map(({ key, title, emptyListTitle }) => (
                    <Tab
                        key={key}
                        title={
                            <div className="flex items-center space-x-2">
                                <span>{title}</span>
                                <Chip size="sm" color={selectedTab === key ? "primary" : "default"}>
                                    {getOrderCount(key)}
                                </Chip>
                            </div>
                        }
                    >
                        {filteredOrders(key).filter(handleFilterOrdersByProductName).length ? (
                            filteredOrders(key)
                                .filter(handleFilterOrdersByProductName)
                                .map((order) => (
                                    <div key={order.id} className="grid xl:grid-cols-3">
                                        <div className="xl:col-span-2">
                                            <OrderCard order={order} />
                                            <Spacer y={7} />
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="text-default-500">{emptyListTitle}</div>
                        )}
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
}

export default OrderStatusTabs;
