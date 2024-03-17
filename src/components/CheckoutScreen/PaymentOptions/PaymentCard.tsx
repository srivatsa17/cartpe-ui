import { Card, CardBody, CardHeader, Divider, Spacer } from "@nextui-org/react";

import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { getCartPriceDetails } from "utils/getCartPriceDetails";
import { useReduxSelector } from "hooks/redux";

function PaymentCard() {
    const { cartItems } = useReduxSelector((state) => state.cart);
    const totalCartItemsQuantity = cartItems.length;

    const {
        totalMRP,
        totalDiscountPrice,
        convenienceFee,
        shippingFee,
        totalAmount,
        savingsAmount,
        roundOffPrice,
        savingsPercent
    } = getCartPriceDetails();

    return (
        <Card>
            <CardHeader className="text-xl">
                Order Summary ({totalCartItemsQuantity} items)
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex justify-between text-lg">
                    <div>Total MRP</div>
                    <div className="flex items-center">
                        <RupeeIcon width={20} height={20} size={20} />
                        {totalMRP.toFixed(2)}
                    </div>
                </div>
                <Spacer y={0.5} />
                <div className="flex justify-between text-lg">
                    <div>Discount on MRP</div>
                    <div className="flex items-center  text-green-600">
                        -<RupeeIcon width={20} height={20} size={20} />
                        {totalDiscountPrice.toFixed(2)}
                    </div>
                </div>
                <Spacer y={0.5} />
                <div className="flex justify-between text-lg">
                    <div>Convenience Fee</div>
                    <div className="flex items-center">
                        <RupeeIcon width={20} height={20} size={20} />
                        {convenienceFee.toFixed(2)}
                    </div>
                </div>
                <Spacer y={0.5} />
                <div className="flex items-center justify-between text-lg">
                    <div>Shipping Fee</div>
                    <div className="text-green-600">{shippingFee === 0 ? "FREE" : shippingFee}</div>
                </div>
                <Spacer y={0.5} />
                <div className="flex items-center justify-between text-lg">
                    <div>Round Off</div>
                    <div className={`flex items-center ${roundOffPrice < 0 && "text-green-600"}`}>
                        {roundOffPrice < 0 ? "-" : ""}
                        <RupeeIcon width={20} height={20} size={20} />
                        {Math.abs(roundOffPrice).toFixed(2)}
                    </div>
                </div>
                <Spacer y={2} />
                <Divider />
                <Spacer y={2} />
                <div className="flex justify-between text-xl font-semibold">
                    <div>Total Amount</div>
                    <div className="flex items-center">
                        <RupeeIcon width={20} height={20} size={20} />
                        {totalAmount.toFixed(2)}
                    </div>
                </div>
                <Spacer y={2} />
                <div className="flex items-center text-lg text-rose-600">
                    Your savings:
                    <RupeeIcon width={20} height={20} size={20} />
                    {savingsAmount.toFixed(2)} ({savingsPercent.toFixed(2)}%)
                </div>
            </CardBody>
        </Card>
    );
}

export default PaymentCard;
