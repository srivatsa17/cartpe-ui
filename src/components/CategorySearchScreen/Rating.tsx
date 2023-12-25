import CreateRatingStars from "./CreateRatingStars";
import React from "react";

interface RatingProps {
    rating: number;
    reviewCount: number;
}

function Rating({ rating, reviewCount }: RatingProps) {
    return (
        <div className="flex max-w-xs my-2">
            <CreateRatingStars rating={rating} />
            <div className="mx-6">{reviewCount} Reviews</div>
        </div>
    );
}

export default Rating;
