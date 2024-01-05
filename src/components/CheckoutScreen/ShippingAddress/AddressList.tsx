import { Chip, Divider, Radio, RadioGroup, Spacer } from "@nextui-org/react";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import EditAddress from "./EditAddress";
import React from "react";
import RemoveAddress from "./RemoveAddress";
import { ShippingAddress } from "utils/types";
import { getShippingAddressList } from "redux/OrderService/shippingAddressSlice";

interface ShippingAddressDescriptionProps {
    shippingAddress: ShippingAddress;
    selectedAddress: string;
}

export const ShippingAddressDescription = ({
    shippingAddress,
    selectedAddress
}: ShippingAddressDescriptionProps) => {
    return (
        <React.Fragment>
            <div>
                {shippingAddress.address.line1}, {shippingAddress.address.line2},{" "}
                {shippingAddress.address.city}, {shippingAddress.address.state},{" "}
                {shippingAddress.address.country} - {shippingAddress.address.pin_code}
            </div>
            <div className="pt-2">Phone Number - {shippingAddress.alternate_phone}</div>
            {selectedAddress === shippingAddress.name && (
                <div className="pt-2 flex gap-2">
                    <EditAddress shippingAddress={shippingAddress} />
                    <RemoveAddress shippingAddressId={shippingAddress.id} />
                </div>
            )}
        </React.Fragment>
    );
};

const getDefaultAddress = (addressList: Array<ShippingAddress>) => {
    const isDefaultAddressFound = addressList.find((address) => address.is_default);
    const defaultAddress = isDefaultAddressFound || (addressList.length > 0 ? addressList[0] : "");
    return defaultAddress;
};

function AddressList() {
    const dispatch = useReduxDispatch();
    const { addressList } = useReduxSelector((state) => state.address);

    React.useEffect(() => {
        dispatch(getShippingAddressList());
    }, [dispatch]);

    const defaultAddress = getDefaultAddress(addressList);
    const [selectedAddress, setSelectedAddress] = React.useState(defaultAddress ? defaultAddress.name : "");

    return (
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
            {addressList.length ? (
                addressList.map((shippingAddress: ShippingAddress) => {
                    return (
                        <div key={shippingAddress.id}>
                            <Radio
                                value={shippingAddress.name}
                                color="secondary"
                                classNames={{
                                    label: "pl-2 font-semibold text-lg",
                                    description: "pl-2 pt-2 pb-2 text-black text-medium"
                                }}
                                description={
                                    <ShippingAddressDescription
                                        shippingAddress={shippingAddress}
                                        selectedAddress={selectedAddress}
                                    />
                                }
                            >
                                <div className="flex">
                                    <div>{shippingAddress.name}</div>
                                    <Spacer x={10} />
                                    <Chip color="secondary" size="sm">
                                        {shippingAddress.type}
                                    </Chip>
                                </div>
                            </Radio>
                            <Divider className="my-2" />
                        </div>
                    );
                })
            ) : (
                <div className="pb-2">
                    Looks like there is no shipping address added yet. Please go ahead and add one!
                </div>
            )}
        </RadioGroup>
    );
}

export default AddressList;
