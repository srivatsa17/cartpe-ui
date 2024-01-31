import { Button, Card, CardBody, Divider, Image, Link, Spacer } from "@nextui-org/react";

import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { useReduxSelector } from "hooks/redux";

function OrderDetailsCard() {
    const { order } = useReduxSelector((state) => state.orderDetails);
    if (order === null) return null;

    return (
        <div>
            <div className="flex h-6 items-center space-x-3">
                <div>Ordered on {order.createdAt}</div>
                <Divider orientation="vertical" />
                <div>Order #{order.id.toString()}</div>
            </div>
            <Spacer y={10} />
            <Card>
                <CardBody className="grid lg:grid-cols-2 space-y-5 lg:space-y-0 p-5">
                    <div>
                        <div className="grid lg:grid-cols-2 gap-3">
                            <div>
                                <div className="font-semibold">Shipping Address</div>
                                <Spacer y={1.5} />
                                <div>{order.userAddress.name}</div>
                                <div>
                                    {order.userAddress.address.building},{" "}
                                    {order.userAddress.address.area},{" "}
                                    {order.userAddress.address.city},{" "}
                                    {order.userAddress.address.state},{" "}
                                    {order.userAddress.address.country},{" "}
                                    {order.userAddress.address.pinCode}
                                </div>
                                <div>Phone number: {order.userAddress.alternatePhone}</div>
                            </div>
                            <div className="lg:justify-self-center">
                                <div className="font-semibold">Payment Method</div>
                                <Spacer y={1.5} />
                                <div>{order.method}</div>
                            </div>
                        </div>
                        <Spacer y={5} />
                        <div>
                            <div>
                                Status: <span className="font-semibold">{order.status}</span>
                            </div>
                            <Spacer y={5} />
                            <div className="space-y-4">
                                {order.orderItems.map((orderItem) => {
                                    return (
                                        <div key={orderItem.id} className="flex gap-12">
                                            <Image
                                                src={orderItem.product.featuredImage}
                                                height={100}
                                                width={100}
                                            />
                                            <div className="mt-2">
                                                <div className="font-semibold">
                                                    {orderItem.product.brand}
                                                </div>
                                                <Link
                                                    href={`/products/${orderItem.product.slug}/${orderItem.product.id}/buy`}
                                                    className="text-default-500"
                                                    underline="hover"
                                                >
                                                    {orderItem.product.name}
                                                </Link>
                                                <div>Quantity: {orderItem.quantity}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <Spacer y={8} />
                        <div className="flex text-default-500">
                            Pending amount:{" "}
                            <RupeeIcon height={17} width={17} size={17} className="ml-1 mt-1" />
                            {order.pendingAmount.toFixed(2)}
                        </div>
                        <Spacer y={4} />
                        <Button
                            fullWidth
                            className="w-full sm:w-3/5"
                            color="primary"
                            variant="ghost"
                        >
                            Write a review
                        </Button>
                    </div>
                    <div className="lg:px-7 lg:pl-40">
                        <div className="font-semibold">Order Summary</div>
                        <Spacer y={1.5} />
                        <div className="flex justify-between">
                            <div>Total MRP</div>
                            <div className="flex">
                                <RupeeIcon width={17} height={17} size={17} className="my-1" />
                                {order.paymentDetails.totalMrp.toFixed(2)}
                            </div>
                        </div>
                        <Spacer y={0.5} />
                        <div className="flex justify-between">
                            <div>Discount on MRP</div>
                            <div className="flex text-green-600">
                                -<RupeeIcon width={17} height={17} size={17} className="my-1" />
                                {order.paymentDetails.totalDiscountPrice.toFixed(2)}
                            </div>
                        </div>
                        <Spacer y={0.5} />
                        <div className="flex justify-between">
                            <div>Convenience Fee</div>
                            <div className="flex">
                                <RupeeIcon width={17} height={17} size={17} className="my-1" />
                                {order.paymentDetails.convenienceFee.toFixed(2)}
                            </div>
                        </div>
                        <Spacer y={0.5} />
                        <div className="flex justify-between">
                            <div>Shipping Fee</div>
                            <div className="text-green-600">
                                {order.paymentDetails.shippingFee === 0
                                    ? "FREE"
                                    : order.paymentDetails.shippingFee}
                            </div>
                        </div>
                        <Spacer y={0.5} />
                        <div className="flex justify-between">
                            <div>Round Off</div>
                            <div
                                className={`flex ${
                                    order.paymentDetails.totalAmount <
                                        order.paymentDetails.totalSellingPrice && "text-green-600"
                                }`}
                            >
                                {order.paymentDetails.totalAmount <
                                order.paymentDetails.totalSellingPrice
                                    ? "-"
                                    : ""}
                                <RupeeIcon width={17} height={17} size={17} className="my-1" />
                                {order.paymentDetails.roundOffPrice.toFixed(2)}
                            </div>
                        </div>
                        <Spacer y={2} />
                        <Divider />
                        <Spacer y={2} />
                        <div className="flex justify-between font-semibold">
                            <div>Total Amount</div>
                            <div className="flex">
                                <RupeeIcon width={17} height={17} size={17} className="my-1" />
                                {order.paymentDetails.totalAmount.toFixed(2)}
                            </div>
                        </div>
                        <Spacer y={1} />
                        <div className="flex text-rose-600">
                            Your savings:
                            <RupeeIcon width={17} height={17} size={17} className="my-1" />
                            {order.paymentDetails.savingsAmount.toFixed(2)} (
                            {order.paymentDetails.savingsPercent.toFixed(2)}%)
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default OrderDetailsCard;
