import { Button, Image, Link, Spacer } from "@nextui-org/react";

import { BAD_REQUEST_400 } from "constants/images";
import { CHECKOUT_SCREEN } from "constants/routes";
import React from "react";

function OrderFailedScreen() {
    return (
        <div className="container mx-auto px-6 py-7">
            <div className="grid xs:grid-cols-1 md:grid-cols-2">
                <div>
                    <Image src={BAD_REQUEST_400} />
                </div>
                <div className="self-center px-4 xs:py-10 md:py-0">
                    <div className="text-xl">
                        Oops! Something went wrong while creating your order. Please try once again!
                    </div>
                    <Spacer y={4} />
                    <Link href={CHECKOUT_SCREEN}>
                        <Button color="danger" variant="ghost">
                            Proceed to checkout
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderFailedScreen;
