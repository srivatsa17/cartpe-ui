import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Image,
    Link,
    Spacer,
    Tooltip
} from "@nextui-org/react";

import { ChevronDown } from "icons/ChevronDown";
import { Order } from "utils/types";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";

interface OrderCardProps {
    order: Order;
}

function OrderCard({ order }: OrderCardProps) {
    return (
        <div>
            <Card>
                <CardHeader className="px-7 grid xs:grid-flow-row sm:grid-flow-col justify-between gap-3 md:gap-6">
                    <div>
                        <div className="text-default-500">Order Placed on</div>
                        <div>{order.created_at}</div>
                    </div>
                    <div>
                        <div className="text-default-500">Total amount</div>
                        <div className="flex">
                            <RupeeIcon width={17} height={17} size={17} className="mt-1" />
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
                                    <div className="font-semibold">{order.user_address.name}</div>
                                    <Spacer y={1} />
                                    <div className="max-w-44">
                                        {order.user_address.address.line1},{" "}
                                        {order.user_address.address.line2},{" "}
                                        {order.user_address.address.city},{" "}
                                        {order.user_address.address.state},{" "}
                                        {order.user_address.address.country},{" "}
                                        {order.user_address.address.pin_code}
                                    </div>
                                </div>
                            }
                        >
                            <div className="flex text-[#006FEE]">
                                {order.user_address.name}
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
                    <div>
                        Status: <span className="font-semibold">{order.status}</span>
                    </div>
                    <Spacer y={3} />
                    {order.order_items.map((orderItem) => {
                        return (
                            <div key={orderItem.id} className="flex gap-12">
                                <Image
                                    src={orderItem.product.featured_image}
                                    height={100}
                                    width={100}
                                />
                                <div className="mt-2">
                                    <div className="font-semibold">{orderItem.product.brand}</div>
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
                </CardBody>
                <CardFooter className="px-7 grid grid-flow-col xs:grid-flow-row">
                    <div>
                        <div>
                            Payment Method: <span className="text-blue-700">{order.method}</span>
                        </div>
                        <div className="flex">
                            Total amount:
                            <span className="flex">
                                <RupeeIcon width={17} height={17} size={17} className="mt-1 ml-1" />
                                {order.amount.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex text-default-500">
                            Pending amount:
                            <RupeeIcon width={17} height={17} size={17} className="mt-1 ml-1" />
                            {order.pending_amount.toFixed(2)}
                        </div>
                    </div>
                    <Button
                        className="sm:justify-self-end sm:self-end xs:mt-5"
                        color="primary"
                        variant="ghost"
                    >
                        Write a review
                    </Button>
                </CardFooter>
                <Spacer y={2} />
            </Card>
        </div>
    );
}

export default OrderCard;
