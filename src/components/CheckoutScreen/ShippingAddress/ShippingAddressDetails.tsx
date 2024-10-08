import { Button, Chip, Divider, Radio, RadioGroup, Selection, Spacer } from "@nextui-org/react";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import AddNewAddress from "./AddNewAddress";
import EditAddress from "./EditAddress";
import React from "react";
import RemoveAddress from "./RemoveAddress";
import { ShippingAddress } from "utils/types";
import { accordianStageKeys } from "utils/getAddressDetails";
import { addSelectedShippingAddress } from "redux/OrderService/checkoutStepsSlice";
import { getShippingAddressList } from "redux/OrderService/shippingAddressSlice";

interface ShippingAddressDetailsProps {
    setSelectedAccordionKeys: React.Dispatch<React.SetStateAction<Selection>>;
    selectedAddress: string;
    setSelectedAddress: React.Dispatch<React.SetStateAction<string>>;
    defaultAddress: string;
}

interface ShippingAddressDescriptionProps {
    shippingAddress: ShippingAddress;
    selectedAddress: ShippingAddress;
}

export const ShippingAddressDescription = ({
    shippingAddress,
    selectedAddress
}: ShippingAddressDescriptionProps) => {
    return (
        <React.Fragment>
            <div>
                {shippingAddress.address.building}, {shippingAddress.address.area},{" "}
                {shippingAddress.address.city}, {shippingAddress.address.state},{" "}
                {shippingAddress.address.country} - {shippingAddress.address.pinCode}
            </div>
            <div className="pt-2">Phone Number - {shippingAddress.alternatePhone}</div>
            {selectedAddress.id === shippingAddress.id && (
                <div className="pt-2 flex gap-2">
                    <EditAddress shippingAddress={shippingAddress} />
                    <RemoveAddress shippingAddressId={shippingAddress.id} />
                </div>
            )}
        </React.Fragment>
    );
};

function ShippingAddressDetails({
    setSelectedAccordionKeys,
    selectedAddress,
    setSelectedAddress,
    defaultAddress
}: ShippingAddressDetailsProps) {
    const dispatch = useReduxDispatch();
    const { addressList, isLoading } = useReduxSelector((state) => state.address);
    const isAddressListEmpty = addressList.length === 0;

    React.useEffect(() => {
        dispatch(getShippingAddressList());
    }, [dispatch]);

    // On POST/DELETE operations, selectedAddress still holds the previous state value.
    // To resolve this issue, we trigger useEffect to set the latest value of defaultAddress as the selectedAddress.
    React.useEffect(() => {
        setSelectedAddress(defaultAddress);
    }, [defaultAddress]);

    const handleSelectedAddressChange = (newSelectedAddress: string) => {
        setSelectedAddress(newSelectedAddress);
    };

    const handleUseSelectedAddress = () => {
        const parseSelectedAddress: ShippingAddress = JSON.parse(selectedAddress);
        if (parseSelectedAddress) {
            dispatch(addSelectedShippingAddress(parseSelectedAddress.id));
            // Open the Order Summary Accordion Item.
            setSelectedAccordionKeys(new Set([accordianStageKeys.ORDER_SUMMARY]));
        }
    };

    return (
        <div className="p-2">
            <RadioGroup value={selectedAddress} onValueChange={handleSelectedAddressChange}>
                {isAddressListEmpty ? (
                    <div className="pb-2">
                        Looks like there is no shipping address added yet. Please go ahead and add
                        one!
                    </div>
                ) : (
                    <React.Fragment>
                        {addressList.map((shippingAddress: ShippingAddress) => {
                            return (
                                <div key={shippingAddress.id}>
                                    <Radio
                                        value={JSON.stringify(shippingAddress)}
                                        color="secondary"
                                        classNames={{
                                            label: "pl-2 font-semibold text-lg",
                                            description: "pl-2 pt-2 pb-2 text-black text-medium"
                                        }}
                                        description={
                                            <ShippingAddressDescription
                                                shippingAddress={shippingAddress}
                                                selectedAddress={JSON.parse(selectedAddress)}
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
                        })}
                    </React.Fragment>
                )}
            </RadioGroup>
            <Spacer y={2} />
            <div className="flex gap-3">
                <div>
                    <Button
                        color="success"
                        variant="ghost"
                        isDisabled={isAddressListEmpty || isLoading}
                        onPress={handleUseSelectedAddress}
                    >
                        Use this address
                    </Button>
                </div>
                <div>
                    <AddNewAddress />
                </div>
            </div>
        </div>
    );
}

export default ShippingAddressDetails;
