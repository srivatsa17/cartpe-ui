import { Button, Spacer } from "@nextui-org/react";

import AddressList from "./AddressList";
import React from "react";

function ShippingAddressDetails() {

    return (
        <div className="p-2">
            <AddressList />
            <Spacer y={2}/>
            <div className="xs:flex flex-col gap-3">
                <Button color="success" variant="ghost">Use this address</Button>
                <Button color="secondary" variant="ghost" className="sm:ml-2">Add new address</Button>
            </div>
        </div>
    );
}

export default ShippingAddressDetails;
