import { Button, Spacer } from "@nextui-org/react";

import AddNewAddress from "./AddNewAddress";
import AddressList from "./AddressList";
import React from "react";
import { useReduxSelector } from "hooks/redux";

function ShippingAddressDetails() {
    const { isLoading, addressList } = useReduxSelector((state) => state.address);
    const isAddressListEmpty = addressList.length === 0;

    return (
        <div className="p-2">
            <AddressList />
            <Spacer y={2} />
            <div className="xs:flex flex-col gap-3">
                <Button
                    color="success"
                    variant="ghost"
                    isDisabled={isAddressListEmpty || isLoading}
                >
                    Use this address
                </Button>
                <AddNewAddress />
            </div>
        </div>
    );
}

export default ShippingAddressDetails;
