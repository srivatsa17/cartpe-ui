import React from "react";
import { StarFillIcon } from "icons/StarFill";
import { StarHalfIcon } from "icons/StarHalfFill";
import { StarNoFillIcon } from "icons/StarNoFill";
import { Tooltip } from "@nextui-org/react";

interface RatingProps {
    rating: number;
}

function CreateRatingStars(ratingObj: RatingProps) {
    const stars = [];
    let ratingIntPart = Math.trunc(ratingObj.rating);
    let ratingDecimalPart = Number((ratingObj.rating - ratingIntPart).toFixed(2));
    let count = 0;

    if (ratingIntPart < 0) {
        ratingIntPart = 0;
        ratingDecimalPart = 0;
    }

    for (let i = 0; i < ratingIntPart && i < 5; i++) {
        count++;
        stars.push(
            <span key={i} className="px-0.5 text-rose-500">
                <StarFillIcon height={20} width={20} size={20} />
            </span>
        );
    }

    if (ratingDecimalPart >= 0.5 && count < 5) {
        count++;
        stars.push(
            <span className="px-0.5 text-rose-500">
                <StarHalfIcon height={20} width={20} size={20} />
            </span>
        );
    }

    for (let i = count; i < 5; i++) {
        count++;
        stars.push(
            <span key={i} className="px-0.5 text-rose-500">
                <StarNoFillIcon height={20} width={20} size={20} />
            </span>
        );
    }

    return (
        <Tooltip content={`${ratingObj.rating} out of 5 stars`} placement="top" color="foreground">
            <div className="flex">{stars}</div>
        </Tooltip>
    );
}

export default CreateRatingStars;
