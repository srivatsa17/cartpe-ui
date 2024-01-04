import { Chip, Divider, Radio, RadioGroup, Spacer } from "@nextui-org/react";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import React from "react";
import { ShippingAddress } from "utils/types";
import { getShippingAddressList } from "redux/OrderService/shippingAddressSlice";

function AddressList() {
    const dispatch = useReduxDispatch();
    const { addressList } = useReduxSelector((state) => state.address);

    React.useEffect(() => {
        dispatch(getShippingAddressList());
    }, [dispatch]);

    return (
        <RadioGroup>
            {addressList.map((shippingAddress: ShippingAddress) => {
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
                                <div>
                                    <div>
                                        {shippingAddress.address.line1},{" "}
                                        {shippingAddress.address.line2},{" "}
                                        {shippingAddress.address.city},{" "}
                                        {shippingAddress.address.state},{" "}
                                        {shippingAddress.address.country} -{" "}
                                        {shippingAddress.address.pin_code}
                                    </div>
                                    <div className="pt-2">
                                        Phone Number - {shippingAddress.alternate_phone}
                                    </div>
                                </div>
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
        </RadioGroup>
    );
}

export default AddressList;
