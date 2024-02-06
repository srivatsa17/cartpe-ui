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
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishListedProducts.map((wishListedProduct) => {
                    return (
                        <div key={wishListedProduct.id}>
                            <WishListCard wishListedProduct={wishListedProduct} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default WishListScreen;
