import CreateRatingStars from "./CreateRatingStars";
import React from "react";

interface RatingProps {
    rating: number;
    reviewCount: number;
}

function Rating({ rating, reviewCount }: RatingProps) {
    return (
        <div className="flex max-w-xs gap-4">
            <CreateRatingStars rating={rating} />
            <div className="text-base font-medium">
                {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
            </div>
        </div>
    );
}

export default Rating;
