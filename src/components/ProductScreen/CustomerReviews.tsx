import { Divider, Spacer, User } from "@nextui-org/react";

import CreateRatingStars from "components/CategorySearchScreen/CreateRatingStars";
import { Product } from "utils/types";
import React from "react";

interface CustomerReviewsProps {
    product: Product;
}

function CustomerReviews({ product }: CustomerReviewsProps) {
    return (
        <div>
            {product.productReviews.map((productReview) => {
                return (
                    <div key={productReview.id} className="space-y-2">
                        <User
                            name={productReview.user}
                            avatarProps={{
                                size: "sm",
                                isBordered: true,
                                color: "primary"
                            }}
                            classNames={{
                                name: "text-base",
                                wrapper: "p-1.5"
                            }}
                        />
                        <div className="flex gap-5 items-center">
                            <CreateRatingStars rating={productReview.rating || 0} />
                            <div className="text-base font-medium">{productReview.headline}</div>
                        </div>
                        <div className="text-base font-normal text-gray-500">
                            Reviewed on {productReview.createdAt}
                        </div>
                        <div>{productReview.comment}</div>
                        <Spacer />
                        <Divider />
                    </div>
                );
            })}
        </div>
    );
}

export default CustomerReviews;
