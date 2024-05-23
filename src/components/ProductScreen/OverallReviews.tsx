import { Button, Divider, Progress, Spacer, useDisclosure } from "@nextui-org/react";

import AddCustomerReview from "./AddCustomerReview";
import CreateRatingStars from "components/CategorySearchScreen/CreateRatingStars";
import { Product } from "utils/types";
import React from "react";
import { useReduxSelector } from "hooks/redux";

interface OverallReviewsProps {
    product: Product;
}

function OverallReviews({ product }: OverallReviewsProps) {
    const starRatings = [5, 4, 3, 2, 1] as const;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { productRating } = useReduxSelector((state) => state.productRating);

    return (
        <div className="space-y-2">
            <div className="text-2xl">Customer Reviews</div>
            <div className="flex gap-4 items-center">
                <CreateRatingStars rating={productRating.ratingAverage} />
                <Divider className="h-6 w-0.5 bg-black" orientation="vertical" />
                <div className="text-lg">{productRating.ratingAverage} out of 5</div>
            </div>
            <div className="text-gray-500">
                Based on {productRating.ratingCount}{" "}
                {productRating.ratingCount === 1 ? "Review" : "Reviews"}
            </div>
            <div className="space-y-2">
                {starRatings.map((star) => (
                    <div key={star}>
                        <Progress
                            color="secondary"
                            classNames={{
                                base: "max-w-md"
                            }}
                            label={`${star} star rating`}
                            value={
                                (productRating.ratingDistribution[star] /
                                    productRating.ratingCount) *
                                    100 || 0
                            }
                            showValueLabel={true}
                        />
                    </div>
                ))}
            </div>
            <Spacer y={5} />
            <div>
                <Button
                    fullWidth
                    className="max-w-md"
                    color="primary"
                    variant="ghost"
                    onPress={onOpen}
                >
                    Write a review
                </Button>
                <AddCustomerReview isOpen={isOpen} onOpenChange={onOpenChange} product={product} />
            </div>
        </div>
    );
}

export default OverallReviews;
