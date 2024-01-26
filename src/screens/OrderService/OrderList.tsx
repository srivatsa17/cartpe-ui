import React from "react";
import { getOrderList } from "redux/OrderService/orderListSlice";
import { useReduxDispatch } from "hooks/redux";

function OrderList() {
    const dispatch = useReduxDispatch();

    React.useEffect(() => {
        dispatch(getOrderList());
    }, [dispatch]);

    return <div>Order List</div>;
}

export default OrderList;
