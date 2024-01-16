import { Button, Image, Link, Spacer } from "@nextui-org/react";

import { CHECKOUT_SCREEN } from "constants/routes";
import { PAYMENT_FAILED_IMAGE } from "constants/images";
import React from "react";
import { useLocation } from "react-router-dom";

function OrderPaymentFailedScreen() {
    const { state } = useLocation();
    const paymentErrorDescription =
        state?.paymentErrorDescription ??
        "Encountered an issue processing your payment. Try again.";

    return (
        <div className="container mx-auto px-6 py-7">
            <div className="grid xs:grid-cols-1 md:grid-cols-2">
                <div>
                    <Image src={PAYMENT_FAILED_IMAGE} width={500} height={500} isZoomed />
                </div>
                <div className="self-center">
                    <div className="text-xl">
                        <div>Oops! Payment failed due to the following reason:</div>
                        <div className="font-semibold">{paymentErrorDescription}</div>
                    </div>
                    <Spacer y={4} />
                    <div className="text-lg">Please try once again!</div>
                    <Spacer y={3} />
                    <Link href={CHECKOUT_SCREEN}>
                        <Button variant="ghost" color="secondary">
                            Proceed to checkout
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderPaymentFailedScreen;
