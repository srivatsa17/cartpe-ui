import { BreadcrumbItem, Breadcrumbs, Spacer } from "@nextui-org/react";

import { HOME_SCREEN } from "constants/routes";
import React from "react";
import SavedAddressList from "components/SavedAddressListScreen/SavedAddressList";
import { getShippingAddressList } from "redux/OrderService/shippingAddressSlice";
import { useReduxDispatch } from "hooks/redux";

function SavedAddressListScreen() {
    const dispatch = useReduxDispatch();

    React.useEffect(() => {
        dispatch(getShippingAddressList());
    }, [dispatch]);

    return (
        <div className="container mx-auto px-6 py-7">
            <Breadcrumbs className="mb-3" size="lg">
                <BreadcrumbItem href={HOME_SCREEN}>Home</BreadcrumbItem>
                <BreadcrumbItem isCurrent isLast>
                    Your Addresses
                </BreadcrumbItem>
            </Breadcrumbs>
            <Spacer y={5} />
            <div className="text-3xl">Your Addresses</div>
            <Spacer y={5} />
            <div>
                <SavedAddressList />
            </div>
        </div>
    );
}

export default SavedAddressListScreen;
