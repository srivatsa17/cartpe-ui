import { BreadcrumbItem, Breadcrumbs, Spacer } from "@nextui-org/react";

import { HOME_SCREEN } from "constants/routes";
import OrderSearch from "components/OrderListScreen/OrderSearch";
import OrderStatusTabs from "components/OrderListScreen/OrderStatusTabs";
import React from "react";
import { getOrderList } from "redux/OrderService/orderListSlice";
import { useReduxDispatch } from "hooks/redux";

function OrderListScreen() {
    const dispatch = useReduxDispatch();

    React.useEffect(() => {
        dispatch(getOrderList());
    }, [dispatch]);

    return (
        <div className="container mx-auto px-6 py-7">
            <Breadcrumbs className="mb-3" size="lg">
                <BreadcrumbItem href={HOME_SCREEN}>Home</BreadcrumbItem>
                <BreadcrumbItem isCurrent isLast>
                    Orders
                </BreadcrumbItem>
            </Breadcrumbs>
            <Spacer y={5} />
            <div>
                <OrderSearch />
            </div>
            <Spacer y={10} />
            <div>
                <OrderStatusTabs />
            </div>
        </div>
    );
}

export default OrderListScreen;
