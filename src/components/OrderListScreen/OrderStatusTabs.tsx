import { Chip, Spacer, Tab, Tabs } from "@nextui-org/react";

import { ORDER_SEARCH } from "constants/queryParam";
import { Order } from "utils/types";
import OrderCard from "./OrderCard";
import React from "react";
import { useReduxSelector } from "hooks/redux";
import { useSearchParams } from "react-router-dom";

interface TabContentProps {
    title: string;
    orders: Array<Order>;
    emptyListTitle: string;
}

const TabContent = ({ orders, emptyListTitle }: TabContentProps) => (
    <React.Fragment>
        {orders.length ? (
            orders.map((order) => (
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
    </React.Fragment>
);

function OrderStatusTabs() {
    const { orders } = useReduxSelector((state) => state.orderList);
    const [selectedTab, setSelectedTab] = React.useState<string | number>("confirmed-orders");
    const [queryParams] = useSearchParams();
    const searchedOrder = queryParams.get(ORDER_SEARCH)?.toLowerCase() ?? "";

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
        return order.orderItems.some((orderItem) =>
            orderItem.product.name.toLowerCase().includes(searchedOrder)
        );
    };

    const completedOrders = orders
        .filter(handleFilterBookedOrderStatus)
        .filter(handleFilterProductNameSearch);
    const cancelledOrders = orders.filter(handleFilterCancelledOrderStatus);
    const returnedOrders = orders.filter(handleFilterReturnedOrderStatus);

    const tabData = [
        {
            key: "confirmed-orders",
            title: "Orders",
            orders: completedOrders,
            emptyListTitle: "No orders found."
        },
        {
            key: "cancelled-orders",
            title: "Cancelled Orders",
            orders: cancelledOrders,
            emptyListTitle: "No cancelled orders found."
        },
        {
            key: "returned-orders",
            title: "Returned Orders",
            orders: returnedOrders,
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
                {tabData.map(({ key, title, orders, emptyListTitle }) => (
                    <Tab
                        key={key}
                        title={
                            <div className="flex items-center space-x-2">
                                <span>{title}</span>
                                <Chip size="sm" color={selectedTab === key ? "primary" : "default"}>
                                    {orders.length}
                                </Chip>
                            </div>
                        }
                    >
                        <TabContent title={title} orders={orders} emptyListTitle={emptyListTitle} />
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
}

export default OrderStatusTabs;
