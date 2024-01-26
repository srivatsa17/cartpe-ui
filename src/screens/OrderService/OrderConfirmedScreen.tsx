import { Button, Image, Link, Spacer } from "@nextui-org/react";
import { HOME_SCREEN, ORDER_SCREEN } from "constants/routes";
import { NOT_FOUND_404, ORDER_CONFIRMED } from "constants/images";
import { useLocation, useSearchParams } from "react-router-dom";

import Confetti from "react-confetti";
import React from "react";

function OrderConfirmedScreen() {
    const { state } = useLocation();
    const [queryParam] = useSearchParams();
    const isQueryParamsValid =
        queryParam.has("paymentMethod") &&
        queryParam.has("orderId") &&
        (queryParam.get("paymentMethod") === "UPI" ? queryParam.has("razorpayOrderId") : true) &&
        state &&
        state.orderId === Number(queryParam.get("orderId")) &&
        (queryParam.get("paymentMethod") === "UPI"
            ? state.razorpayOrderId === queryParam.get("razorpayOrderId")
            : true);

    return (
        <div className="container mx-auto px-6 py-7">
            {isQueryParamsValid ? (
                <div className="grid xs:grid-cols-1 md:grid-cols-2">
                    <div>
                        <Image src={ORDER_CONFIRMED} width={500} height={500} />
                    </div>
                    <div className="self-center text-2xl xs:text-xl px-5">
                        <Confetti numberOfPieces={400} recycle={false} />
                        <div>
                            Yayy! Your order has been <strong>confirmed</strong>!
                            <Spacer y={0.5} />
                            The invoice details will be sent to your email.
                            <Spacer y={0.5} />
                            The order will be delivered to you within 7 working days.
                            <Spacer y={0.5} />
                            Happy shopping at <strong>CartPe</strong>!
                        </div>
                        <Spacer y={6} />
                        <div className="flex gap-4">
                            <Link href={HOME_SCREEN}>
                                <Button variant="ghost" color="secondary">
                                    Continue Shopping
                                </Button>
                            </Link>
                            <Link href={ORDER_SCREEN}>
                                <Button variant="ghost" color="primary">
                                    Check orders
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid xs:grid-cols-1 md:grid-cols-2">
                    <div>
                        <Image src={NOT_FOUND_404} width={500} height={500} />
                    </div>
                    <div className="text-xl self-center xs:py-5 md:py-0">
                        <div>
                            Oops! We are unable to access the requested order. Please verify the
                            order details and ensure proper permissions, or check existing orders
                            for the desired information.
                        </div>
                        <Spacer y={4} />
                        <Link href={ORDER_SCREEN}>
                            <Button variant="ghost" color="primary">
                                Check your orders
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderConfirmedScreen;
