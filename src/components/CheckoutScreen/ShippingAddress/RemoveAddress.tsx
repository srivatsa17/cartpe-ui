import { Button, Tooltip } from "@nextui-org/react";

import React from "react";
import { TrashIcon } from "icons/TrashIcon";
import { removeShippingAddress } from "redux/OrderService/shippingAddressSlice";
import { useReduxDispatch } from "hooks/redux";

interface RemoveShippingAddressProps {
    shippingAddressId: bigint;
}

function RemoveAddress({ shippingAddressId }: RemoveShippingAddressProps) {
    const dispatch = useReduxDispatch();
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

    const handleRemoveShippingAddress = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            dispatch(removeShippingAddress(shippingAddressId));
            setIsSubmitting(false);
        }, 750);
    };

    return (
        <Tooltip color="danger" content="Delete address">
            <Button
                isIconOnly
                className="bg-foreground/0 text-rose-600"
                variant="solid"
                isLoading={isSubmitting}
                onClick={handleRemoveShippingAddress}
            >
                <TrashIcon height={22} width={22} />
            </Button>
        </Tooltip>
    );
}

export default RemoveAddress;
