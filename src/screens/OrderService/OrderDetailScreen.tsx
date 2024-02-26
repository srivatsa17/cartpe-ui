import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import BadRequest400 from "screens/Error/BadRequest400";
import OrderDetails from "components/OrderDetailsScreen/OrderDetails";
import OrderDetailsSkeleton from "components/OrderDetailsScreen/OrderDetailsSkeleton";
import React from "react";
import { getOrderDetails } from "redux/OrderService/orderDetailsSlice";
import { useParams } from "react-router-dom";

function OrderDetailScreen() {
    const dispatch = useReduxDispatch();
    const { id } = useParams();

    React.useEffect(() => {
        if (id) {
            dispatch(getOrderDetails(id));
        }
    }, [dispatch, id]);

    const { order, isLoading } = useReduxSelector((state) => state.orderDetails);

    return isLoading === false ? (
        order ? (
            <OrderDetails order={order} />
        ) : (
            <BadRequest400 />
        )
    ) : (
        <OrderDetailsSkeleton />
    );
}

export default OrderDetailScreen;
