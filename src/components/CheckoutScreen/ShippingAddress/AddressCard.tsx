import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Selection,
    Spacer
} from "@nextui-org/react";

import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { ShippingAddress } from "utils/types";
import { accordianStageKeys } from "utils/getAddressDetails";
import { addSelectedShippingAddress } from "redux/OrderService/checkoutStepsSlice";
import { getCartPriceDetails } from "utils/getCartPriceDetails";
import { useReduxDispatch } from "hooks/redux";

interface AddressCardProps {
    setSelectedAccordionKeys: React.Dispatch<React.SetStateAction<Selection>>;
    selectedAddress: string;
}

function AddressCard({ setSelectedAccordionKeys, selectedAddress }: AddressCardProps) {
    const dispatch = useReduxDispatch();
    const { totalSellingPrice } = getCartPriceDetails();

    const handleUseAddressClick = () => {
        const parseSelectedAddress: ShippingAddress = JSON.parse(selectedAddress);
        if (parseSelectedAddress) {
            dispatch(addSelectedShippingAddress(parseSelectedAddress.id));
            // Open the Order Summary Accordion Item.
            setSelectedAccordionKeys(new Set([accordianStageKeys.ORDER_SUMMARY]));
        }
    };

    return (
        <Card className="px-2">
            <Spacer y={4} />
            <CardHeader>
                <Button fullWidth variant="ghost" color="success" onPress={handleUseAddressClick}>
                    Use the selected address
                </Button>
            </CardHeader>
            <CardBody>
                Choose an address to continue checking out. You will still have a chance to review
                and edit your order before it is final.
            </CardBody>
            <Divider />
            <CardBody>
                <div className="text-xl">Order Summary</div>
                <Spacer />
                <div className="flex justify-between">
                    <div>Items</div>
                    <div>---</div>
                </div>
                <div className="flex justify-between">
                    <div>Delivery</div>
                    <div>---</div>
                </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between text-xl">
                <div>Order Total</div>
                <div className="flex items-center">
                    <RupeeIcon width={22} height={22} size={22} />
                    {totalSellingPrice.toFixed(2)}
                </div>
            </CardFooter>
        </Card>
    );
}

export default AddressCard;
