import { Button, Divider, Spacer } from "@nextui-org/react";

import { CashIcon } from "icons/CashIcon";
import { ExchangeIcon } from "icons/ExchangeIcon";
import { Product } from "utils/types";
import Rating from "components/CategorySearchScreen/Rating";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { TruckFastIcon } from "icons/TruckFastIcon";
import { TruckIcon } from "icons/TruckIcon";

interface ProductDetailsProps {
    product: Partial<Product>;
}

function getDeliveryDate() {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    const formattedDate = today.toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric"
    });
    return formattedDate;
}

function ProductDetails({ product }: ProductDetailsProps) {
    return (
        <div>
            <div className="text-4xl">{product.brand}</div>
            <div className="text-2xl py-2 text-default-500">{product.name}</div>
            <Divider />
            <Rating rating={product.rating || 0} reviewCount={product.reviewCount || 0} />
            <Divider />
            <div className="flex py-2 text-2xl xs:text-lg">
                <div className="flex font-semibold">
                    <RupeeIcon height={22} width={22} size={22} className="my-1" />{" "}
                    {product.selling_price}
                </div>
                <div className="flex pl-3 line-through text-default-500 font-semibold">
                    <RupeeIcon height={22} width={22} size={22} className="my-1" /> {product.price}
                </div>
                <div className="pl-3 text-green-600 font-medium">({product.discount}% Off)</div>
            </div>
            <Divider />
            <div className="flex py-3 text-xl">
                <div>Availability:</div>
                <Spacer />
                <div
                    className={
                        product.stock_count !== undefined && product.stock_count <= 0
                            ? "text-red-500 font-semibold"
                            : "text-green-600 font-semibold"
                    }
                >
                    {product.stock_count !== undefined && product.stock_count > 0
                        ? "In Stock"
                        : "Out of Stock"}
                </div>
            </div>
            <Divider />
            <div className="py-5 flex">
                <Button fullWidth size="lg" className="capitalize" variant="ghost" color="warning">
                    Add to cart
                </Button>
                <Spacer x={7} />
                <Button fullWidth size="lg" className="capitalize" variant="ghost" color="danger">
                    Wishlist
                </Button>
            </div>
            <Divider />

            <div>
                {product.stock_count && product.stock_count > 0 && (
                    <div>
                        <div className="flex py-3 text-xl font-medium">
                            Delivery Options{" "}
                            <TruckIcon
                                width={24}
                                height={24}
                                size={24}
                                strokeWidth={2}
                                className="mx-3 my-1"
                            />
                        </div>
                        <div>
                            <div className="flex py-1">
                                <TruckFastIcon width={24} height={24} size={24} className="mr-3" />
                                Get it by {getDeliveryDate()}
                            </div>
                            <div className="flex py-1">
                                <CashIcon width={28} height={28} size={24} className="mr-3" />
                                Pay on Delivery available
                            </div>
                            <div className="flex py-1">
                                <ExchangeIcon width={28} height={28} size={24} className="mr-3" />
                                Easy 14 days return & exchange available
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Divider className="my-2" />
            <div className="py-3">
                <div className="text-xl">Product Details</div>
                <div className="py-3 text-default-500 text-lg">{product.description}</div>
            </div>
        </div>
    );
}

export default ProductDetails;
