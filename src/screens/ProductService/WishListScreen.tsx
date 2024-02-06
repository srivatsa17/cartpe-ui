import { BreadcrumbItem, Breadcrumbs, Spacer } from "@nextui-org/react";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import { HOME_SCREEN } from "constants/routes";
import React from "react";
import WishListCard from "components/WishListScreen/WishListCard";
import { getWishList } from "redux/ProductService/wishlistSlice";

function WishListScreen() {
    const dispatch = useReduxDispatch();
    const { wishListedProducts } = useReduxSelector((state) => state.wishlist);

    React.useEffect(() => {
        dispatch(getWishList());
    }, [dispatch]);

    return (
        <div className="container mx-auto px-6 py-7">
            <Breadcrumbs className="mb-3" size="lg">
                <BreadcrumbItem href={HOME_SCREEN}>Home</BreadcrumbItem>
                <BreadcrumbItem isCurrent isLast>
                    Wish List
                </BreadcrumbItem>
            </Breadcrumbs>
            <Spacer y={6} />
            <div className="text-3xl">Your Wish List ({wishListedProducts.length} items)</div>
            <Spacer y={6} />
            <div>
                <WishListCard />
            </div>
        </div>
    );
}

export default WishListScreen;
