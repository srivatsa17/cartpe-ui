import { BreadcrumbItem, Breadcrumbs, Spacer } from "@nextui-org/react";
import { HOME_SCREEN, ORDER_SCREEN } from "constants/routes";

import OrderDetailsCard from "components/OrderDetailsScreen/OrderDetailsCard";
import React from "react";
import { getOrderDetails } from "redux/OrderService/orderDetailsSlice";
import { useParams } from "react-router-dom";
import { useReduxDispatch } from "hooks/redux";

function OrderDetailScreen() {
    const dispatch = useReduxDispatch();
    const { id } = useParams();
    if (id === undefined) {
        return null;
    }
    const typeCastedId = BigInt(id);

    React.useEffect(() => {
        dispatch(getOrderDetails(typeCastedId));
    }, [dispatch, id]);

    return (
        <div className="container mx-auto px-6 py-7">
            <Breadcrumbs className="mb-3" size="lg">
                <BreadcrumbItem href={HOME_SCREEN}>Home</BreadcrumbItem>
                <BreadcrumbItem href={ORDER_SCREEN}>Orders</BreadcrumbItem>
                <BreadcrumbItem href={ORDER_SCREEN} isCurrent isLast>
                    Order Details
                </BreadcrumbItem>
            </Breadcrumbs>
            <Spacer y={5} />
            <div className="text-3xl">Your Order Details</div>
            <Spacer y={5} />
            <div>
                <OrderDetailsCard />
            </div>
            <Spacer y={10} />
        </div>
    );
}

export default OrderDetailScreen;
