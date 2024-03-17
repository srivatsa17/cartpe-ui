import { Button, Card, CardBody, Code, Divider, Image, Link, Spacer } from "@nextui-org/react";
import { OrderRefundStatus, OrderStatus } from "utils/getOrderStatus";

import { CloseCircleIcon } from "icons/CloseCircleIcon";
import { Order } from "utils/types";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";

interface OrderDetailsCardProps {
    order: Order;
}

const displayRefundMessage = (order: Order) => {
    // Convert date strings to Date objects
    const today: Date = new Date();
    const updatedAt: Date = new Date(order.updatedAt);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds: number = today.getTime() - updatedAt.getTime();

    // Calculate the difference in days
    const differenceInDays: number = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    // Check if the payment is UPI and difference is lesser than 7 days
    return order.method === "UPI" && differenceInDays < 7;
};

function OrderDetailsCard({ order }: OrderDetailsCardProps) {
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
                                {order.refundStatus === OrderRefundStatus.NA ? (
                                    <div>
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
                                ) : (
                                    <div>N/A</div>
                                )}
                            </div>
                            <div className="lg:justify-self-center">
                                <div className="font-semibold">Payment Method</div>
                                <Spacer y={1.5} />
                                <div>{order.method}</div>
                            </div>
                        </div>
                        <Spacer y={5} />
                        {order.status === OrderStatus.CANCELLED ? (
                            <div className="flex gap-2 items-center text-base text-rose-600">
                                <CloseCircleIcon width={22} height={22} /> Order has been cancelled
                                as per your request.
                            </div>
                        ) : order.status === OrderStatus.RETURNED ? (
                            <div>Return for your order has been initiated.</div>
                        ) : null}
                        <Spacer y={3} />
                        <div>
                            <div>
                                {order.refundStatus === OrderRefundStatus.NA ? (
                                    <div>
                                        Status:{" "}
                                        <span className="font-semibold text-green-600">
                                            {order.status}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div>
                                            Refund Status:{" "}
                                            <span
                                                className={`font-semibold ${
                                                    order.refundStatus === OrderRefundStatus.FAILED
                                                        ? "text-rose-600"
                                                        : "text-green-600"
                                                }`}
                                            >
                                                {order.refundStatus}
                                            </span>
                                        </div>
                                        {displayRefundMessage(order) && (
                                            <Code color="warning">
                                                Refund amount will be credited to the source account
                                                within 7 working days.
                                            </Code>
                                        )}
                                    </div>
                                )}
                            </div>
                            <Spacer y={5} />
                            <div className="space-y-4">
                                {order.orderItems.map((orderItem) => {
                                    return (
                                        <div
                                            key={orderItem.id}
                                            className="flex items-center gap-12"
                                        >
                                            <Image
                                                src={orderItem.productVariant.images[0]}
                                                height={100}
                                                width={100}
                                            />
                                            <div>
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
                                                <div>
                                                    {orderItem.productVariant.properties.map(
                                                        (property) => {
                                                            return (
                                                                <div
                                                                    key={property.id}
                                                                    className="text-default-500 capitalize text-sm"
                                                                >
                                                                    {property.name} -{" "}
                                                                    {property.value}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                                <div className="flex text-base gap-3">
                                                    <div className="flex items-center font-semibold">
                                                        <RupeeIcon
                                                            height={16}
                                                            width={16}
                                                            size={16}
                                                        />{" "}
                                                        {orderItem.productVariant.sellingPrice}
                                                    </div>
                                                    <div className="flex items-center line-through text-default-500 font-semibold">
                                                        <RupeeIcon
                                                            height={16}
                                                            width={16}
                                                            size={16}
                                                        />{" "}
                                                        {orderItem.productVariant.price}
                                                    </div>
                                                    <div className="text-rose-500 font-semibold">
                                                        ({orderItem.productVariant.discount}% Off)
                                                    </div>
                                                </div>
                                                <div>Quantity: {orderItem.quantity}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <Spacer y={8} />
                        <div>
                            {order.refundStatus === OrderRefundStatus.NA ? (
                                <div>
                                    <div className="flex items-center gap-1">
                                        Amount Paid:
                                        <span className="flex items-center">
                                            <RupeeIcon width={17} height={17} size={17} />
                                            {order.amountPaid.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        Amount Due:
                                        <span className="flex items-center">
                                            <RupeeIcon width={17} height={17} size={17} />
                                            {order.amountDue.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-1">
                                    Refundable amount:
                                    <span className="flex items-center">
                                        <RupeeIcon width={17} height={17} size={17} />
                                        {order.amountRefundable.toFixed(2)}
                                    </span>
                                </div>
                            )}
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
                            <div className="flex items-center">
                                <RupeeIcon width={17} height={17} size={17} />
                                {order.paymentDetails.totalMrp.toFixed(2)}
                            </div>
                        </div>
                        <Spacer y={0.5} />
                        <div className="flex justify-between">
                            <div>Discount on MRP</div>
                            <div className="flex items-center text-green-600">
                                -<RupeeIcon width={17} height={17} size={17} />
                                {order.paymentDetails.totalDiscountPrice.toFixed(2)}
                            </div>
                        </div>
                        <Spacer y={0.5} />
                        <div className="flex justify-between">
                            <div>Convenience Fee</div>
                            <div className="flex items-center">
                                <RupeeIcon width={17} height={17} size={17} />
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
                                className={`flex items-center ${
                                    order.paymentDetails.roundOffPrice < 0 && "text-green-600"
                                }`}
                            >
                                {order.paymentDetails.roundOffPrice < 0 ? "-" : ""}
                                <RupeeIcon width={17} height={17} size={17} />
                                {Math.abs(order.paymentDetails.roundOffPrice).toFixed(2)}
                            </div>
                        </div>
                        <Spacer y={2} />
                        <Divider />
                        <Spacer y={2} />
                        <div className="flex justify-between font-semibold">
                            <div>Total Amount</div>
                            <div className="flex items-center">
                                <RupeeIcon width={17} height={17} size={17} />
                                {order.paymentDetails.totalAmount.toFixed(2)}
                            </div>
                        </div>
                        <Spacer y={1} />
                        {order.refundStatus === OrderRefundStatus.NA && (
                            <div className="flex items-center text-rose-600">
                                Your savings:
                                <RupeeIcon width={17} height={17} size={17} />
                                {order.paymentDetails.savingsAmount.toFixed(2)} (
                                {order.paymentDetails.savingsPercent.toFixed(2)}%)
                            </div>
                        )}
                        <Spacer y={10} />
                        <div>
                            <Button
                                fullWidth
                                color="danger"
                                variant="ghost"
                                // Cancellation available only if order is confirmed.
                                isDisabled={order.status !== OrderStatus.CONFIRMED}
                            >
                                Cancel order
                            </Button>
                            <Spacer y={5} />
                            <Button
                                fullWidth
                                color="warning"
                                variant="ghost"
                                // Return available only if order is delivered.
                                isDisabled={order.status !== OrderStatus.DELIVERED}
                            >
                                Return order
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default OrderDetailsCard;
