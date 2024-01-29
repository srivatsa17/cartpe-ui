import { Card, CardBody, CardHeader, Chip, Divider, Spacer } from "@nextui-org/react";

import AddNewAddress from "components/CheckoutScreen/ShippingAddress/AddNewAddress";
import EditAddress from "components/CheckoutScreen/ShippingAddress/EditAddress";
import React from "react";
import RemoveAddress from "components/CheckoutScreen/ShippingAddress/RemoveAddress";
import { useReduxSelector } from "hooks/redux";

function SavedAddressList() {
    const { addressList } = useReduxSelector((state) => state.address);

    return (
        <div>
            {addressList.length === 0 ? (
                <div className="text-default-500">
                    There are no addresses found. Please go ahead and add one.
                </div>
            ) : (
                <div className="grid grid-flow-row lg:grid-cols-2 gap-6">
                    {addressList.map((userAddress) => {
                        return (
                            <Card key={userAddress.id} className="p-3">
                                <CardHeader className="flex justify-between gap-4">
                                    <div className="font-semibold">{userAddress.name}</div>
                                    <div className="flex h-6 items-center">
                                        {userAddress.is_default && (
                                            <>
                                                <Chip className="mr-2" color="primary">
                                                    Default
                                                </Chip>
                                                <Divider orientation="vertical" />
                                            </>
                                        )}
                                        <Chip color="secondary" className="mx-2">
                                            {userAddress.type}
                                        </Chip>
                                        <Divider orientation="vertical" />
                                        <EditAddress shippingAddress={userAddress} />
                                        <Divider orientation="vertical" />
                                        <RemoveAddress shippingAddressId={userAddress.id} />
                                    </div>
                                </CardHeader>
                                <CardBody className="space-y-3">
                                    <div>
                                        {userAddress.address.line1}, {userAddress.address.line2},{" "}
                                        {userAddress.address.city}, {userAddress.address.state},{" "}
                                        {userAddress.address.country},{" "}
                                        {userAddress.address.pin_code}.
                                    </div>
                                    <div>Phone Number: {userAddress.alternate_phone}</div>
                                </CardBody>
                            </Card>
                        );
                    })}
                </div>
            )}
            <Spacer y={6} />
            <div>
                <AddNewAddress />
            </div>
        </div>
    );
}

export default SavedAddressList;
