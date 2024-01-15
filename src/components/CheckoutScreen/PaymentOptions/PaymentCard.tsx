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

import DisplayRazorPayCard from "../RazorPay/RazorPayCard";
import { PaymentMethods } from "utils/types";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { getCartPriceDetails } from "utils/getCartPriceDetails";
import { useReduxSelector } from "hooks/redux";

interface PaymentCardProps {
    setSelectedAccordionKeys: React.Dispatch<React.SetStateAction<Selection>>;
    selectedPaymentMethod: PaymentMethods;
}

function PaymentCard({ setSelectedAccordionKeys }: PaymentCardProps) {
    const { cartItems } = useReduxSelector((state) => state.cart);
    const totalCartItemsQuantity = cartItems.length;
    const [isPlaceOrderButtonClicked, setIsPlaceOrderButtonClicked] =
        React.useState<boolean>(false);
    const { shippingAddressId, orderItems, amount } = useReduxSelector(
        (state) => state.checkoutDetails
    );

    const {
        totalMRP,
        totalDiscountPrice,
        convenienceFee,
        shippingFee,
        totalSellingPrice,
        totalAmount,
        savingsAmount,
        roundOffPrice,
        savingsPercent
    } = getCartPriceDetails();

    const handlePayment = () => {
        setIsPlaceOrderButtonClicked(true);
        setSelectedAccordionKeys(new Set([]));
    };

    return (
        <Card>
            <CardHeader className="text-xl">
                Order Summary ({totalCartItemsQuantity} items)
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex justify-between text-lg">
                    <div>Total MRP</div>
                    <div className="flex">
                        <RupeeIcon width={22} height={22} size={22} className="my-1" />
                        {totalMRP.toFixed(2)}
                    </div>
                </div>
                <Spacer y={0.5} />
                <div className="flex justify-between text-lg">
                    <div>Discount on MRP</div>
                    <div className="flex text-green-600">
                        -<RupeeIcon width={22} height={22} size={22} className="my-1" />
                        {totalDiscountPrice.toFixed(2)}
                    </div>
                </div>
                <Spacer y={0.5} />
                <div className="flex justify-between text-lg">
                    <div>Convenience Fee</div>
                    <div className="flex">
                        <RupeeIcon width={22} height={22} size={22} className="my-1" />
                        {convenienceFee.toFixed(2)}
                    </div>
                </div>
                <Spacer y={0.5} />
                <div className="flex justify-between text-lg">
                    <div>Shipping Fee</div>
                    <div className="text-green-600">{shippingFee}</div>
                </div>
                <Spacer y={0.5} />
                <div className="flex justify-between text-lg">
                    <div>Round Off</div>
                    <div className={`flex ${totalAmount < totalSellingPrice && "text-green-600"}`}>
                        {totalAmount < totalSellingPrice ? "-" : ""}
                        <RupeeIcon width={22} height={22} size={22} className="my-1" />
                        {roundOffPrice.toFixed(2)}
                    </div>
                </div>
                <Spacer y={2} />
                <Divider />
                <Spacer y={2} />
                <div className="flex justify-between text-xl font-semibold">
                    <div>Total Amount</div>
                    <div className="flex">
                        <RupeeIcon width={22} height={22} size={22} className="my-1" />
                        {totalAmount.toFixed(2)}
                    </div>
                </div>
                <Spacer y={2} />
                <div className="flex text-lg text-rose-600">
                    Your savings:
                    <RupeeIcon width={22} height={22} size={22} className="my-1" />
                    {savingsAmount.toFixed(2)} ({savingsPercent.toFixed(2)}%)
                </div>
            </CardBody>
            <Divider />
            <Spacer y={2} />
            <CardFooter>
                <Button
                    variant="ghost"
                    fullWidth
                    color="success"
                    onClick={handlePayment}
                    isDisabled={
                        shippingAddressId === null || orderItems.length === 0 || amount === 0
                    }
                >
                    Pay Now
                </Button>
                {isPlaceOrderButtonClicked && <DisplayRazorPayCard />}
            </CardFooter>
            <Spacer y={2} />
        </Card>
    );
}

export default PaymentCard;
