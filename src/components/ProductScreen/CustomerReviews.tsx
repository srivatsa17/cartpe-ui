import { Divider, Pagination, Spacer, User } from "@nextui-org/react";

import CreateRatingStars from "components/CategorySearchScreen/CreateRatingStars";
import { Product } from "utils/types";
import React from "react";

interface CustomerReviewsProps {
    product: Product;
}

function CustomerReviews({ product }: CustomerReviewsProps) {
    // Pagination for customer reviews
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;
    const pages = Math.ceil(product.reviewCount / rowsPerPage);
    const productReviews = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return product.productReviews.slice(start, end);
    }, [page, product.productReviews]);

    return (
        <div className="space-y-4">
            {productReviews.map((productReview) => {
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
            <Spacer y={3}/>
            {product.reviewCount > rowsPerPage && (
                <div className="flex w-full justify-center">
                    <Pagination
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            )}
        </div>
    );
}

export default CustomerReviews;
