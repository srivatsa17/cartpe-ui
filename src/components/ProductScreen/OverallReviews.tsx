import { Divider, Progress } from "@nextui-org/react";

import CreateRatingStars from "components/CategorySearchScreen/CreateRatingStars";
import { Product } from "utils/types";
import React from "react";

interface OverallReviewsProps {
    product: Product;
}

function OverallReviews({ product }: OverallReviewsProps) {
    const starRatings = [5, 4, 3, 2, 1] as const;

    return (
        <div className="space-y-2">
            <div className="text-2xl">Customer Reviews</div>
            <div className="flex gap-4 items-center">
                <CreateRatingStars rating={product.averageRating || 0} />
                <Divider className="h-6 w-0.5 bg-black" orientation="vertical" />
                <div className="text-lg">{product.averageRating} out of 5</div>
            </div>
            <div className="text-gray-500">
                {product.reviewCount} {product.reviewCount === 1 ? "Review" : "Reviews"}
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
                            value={(product.ratingCounts[star] / product.reviewCount) * 100 || 0}
                            showValueLabel={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OverallReviews;
