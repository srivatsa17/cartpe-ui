import { Button, Tooltip } from "@nextui-org/react";
import { Toaster, toast } from "sonner";

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
        const toastId = toast.loading("Please wait a moment while we delete your address.", {
            position: "top-right",
            duration: 3000
        });
        setTimeout(() => {
            dispatch(removeShippingAddress(shippingAddressId))
                .then(() => {
                    toast.success("Address has been deleted!", {
                        id: toastId,
                        position: "top-right",
                        duration: 4000
                    });
                })
                .catch((error) =>
                    toast.error("Failed to delete address. Please try again later.", {
                        id: toastId,
                        description: error,
                        position: "top-right",
                        duration: 4000
                    })
                );
            setIsSubmitting(false);
        }, 750);
    };

    return (
        <div>
            <Toaster richColors closeButton />
            <Tooltip color="danger" content="Delete address">
                <Button
                    isIconOnly
                    className="bg-foreground/0 text-rose-600"
                    variant="solid"
                    isLoading={isSubmitting}
                    onPress={handleRemoveShippingAddress}
                >
                    <TrashIcon height={22} width={22} />
                </Button>
            </Tooltip>
        </div>
    );
}

export default RemoveAddress;
