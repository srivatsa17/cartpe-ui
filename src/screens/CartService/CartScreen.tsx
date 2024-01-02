import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

import CartItemDetails from "components/CartScreen/CartItemDetails";
import CartQuantityDetails from "components/CartScreen/CartQuantityDetails";
import CartSubTotal from "components/CartScreen/CartSubTotal";
import { HOME_SCREEN } from "constants/routes";
import React from "react";
import { getCartItems } from "redux/CartService/cartSlice";
import { useReduxDispatch } from "hooks/redux";

function CartScreen() {
    const dispatch = useReduxDispatch();

    React.useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);

    return (
        <div className="container mx-auto px-6 py-7">
            <Breadcrumbs className="mb-3" size="lg">
                <BreadcrumbItem href={HOME_SCREEN}>Home</BreadcrumbItem>
                <BreadcrumbItem isCurrent isLast>
                    Cart
                </BreadcrumbItem>
            </Breadcrumbs>
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="col-span-1 pr-0 lg:col-span-2 lg:pr-10">
                    <div className="uppercase font-semibold text-2xl">Shopping Cart</div>
                    <div>
                        <CartQuantityDetails />
                    </div>
                    <CartItemDetails />
                </div>
                <div className="py-5 lg:py-0">
                    <CartSubTotal />
                </div>
            </div>
        </div>
    );
}

export default CartScreen;
