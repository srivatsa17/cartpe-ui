import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Code,
    Divider,
    Image,
    Link,
    Spacer,
    Tooltip,
    useDisclosure
} from "@nextui-org/react";
import { OrderRefundStatus, OrderStatus } from "utils/getOrderStatus";

import AddCustomerReview from "components/ProductScreen/AddCustomerReview";
import { ChevronDown } from "icons/ChevronDown";
import { CloseCircleIcon } from "icons/CloseCircleIcon";
import { Order } from "utils/types";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";

interface OrderCardProps {
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

function OrderCard({ order }: OrderCardProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <Card>
                <CardHeader className="px-7 grid xs:grid-flow-row sm:grid-flow-col justify-between gap-3 md:gap-6">
                    <div>
                        <div className="text-default-500">Order Placed on</div>
                        <div>{order.createdAt}</div>
                    </div>
                    <div>
                        <div className="text-default-500">Total amount</div>
                        <div className="flex items-center">
                            <RupeeIcon width={17} height={17} size={17} />
                            {order.amount.toFixed(2)}
                        </div>
                    </div>
                    <div>
                        <div className="text-default-500">Ship To</div>
                        <Tooltip
                            placement="bottom"
                            color="default"
                            content={
                                <div className="p-1">
                                    <div className="font-semibold">{order.userAddress.name}</div>
                                    <Spacer y={1} />
                                    <div className="max-w-44">
                                        {order.userAddress.address.building},{" "}
                                        {order.userAddress.address.area},{" "}
                                        {order.userAddress.address.city},{" "}
                                        {order.userAddress.address.state},{" "}
                                        {order.userAddress.address.country},{" "}
                                        {order.userAddress.address.pinCode}
                                    </div>
                                </div>
                            }
                        >
                            <div className="flex text-[#006FEE]">
                                {order.userAddress.name}
                                <ChevronDown
                                    width={13}
                                    height={13}
                                    size={13}
                                    fill="currentColor"
                                    className="mx-2 mb-1 place-self-end"
                                />
                            </div>
                        </Tooltip>
                    </div>
                    <div>
                        <div className="text-default-500">Order #{order.id.toString()}</div>
                        <Link href={`/orders/${order.id}`} color="primary" underline="hover">
                            View Order Details
                        </Link>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className="px-7">
                    {order.status === OrderStatus.CANCELLED ? (
                        <div className="flex gap-2 items-center text-base text-rose-600">
                            <CloseCircleIcon width={22} height={22} /> Order has been cancelled as
                            per your request.
                        </div>
                    ) : order.status === OrderStatus.RETURNED ? (
                        <div>Return for your order has been initiated.</div>
                    ) : null}
                    <Spacer y={3} />
                    <div>
                        {order.refundStatus === OrderRefundStatus.NA ? (
                            <div>
                                Status:{" "}
                                <span className="font-semibold text-green-600">{order.status}</span>
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
                                <div>
                                    {displayRefundMessage(order) && (
                                        <Code color="warning">
                                            Refund amount will be credited to the source account
                                            within 7 working days.
                                        </Code>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <Spacer y={4} />
                    <div className="space-y-3">
                        {order.orderItems.map((orderItem) => {
                            return (
                                <div
                                    key={orderItem.id}
                                    className="xs:space-y-2 sm:flex items-center gap-12"
                                >
                                    <Image
                                        src={orderItem.productVariant.images[0]}
                                        height={70}
                                        width={70}
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
                                        <div className="capitalize text-base">
                                            Quantity: {orderItem.quantity}
                                        </div>
                                    </div>
                                    <div className="ml-auto self-end">
                                        <Button color="primary" variant="ghost" onPress={onOpen}>
                                            Write a review
                                        </Button>
                                        <AddCustomerReview
                                            isOpen={isOpen}
                                            onOpenChange={onOpenChange}
                                            product={orderItem.product}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardBody>
                <CardFooter className="px-7 grid grid-flow-col xs:grid-flow-row">
                    <div>
                        <div>
                            Payment Method: <span className="text-blue-700">{order.method}</span>
                        </div>
                        {order.refundStatus === OrderRefundStatus.NA ? (
                            <div>
                                <div className="flex gap-1">
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
                            <div className="flex text-default-500 gap-1">
                                Refundable amount
                                <span className="flex items-center">
                                    <RupeeIcon width={17} height={17} size={17} />
                                    {order.amountRefundable.toFixed(2)}
                                </span>
                            </div>
                        )}
                    </div>
                </CardFooter>
                <Spacer y={2} />
            </Card>
        </div>
    );
}

export default OrderCard;
