import { Divider, Pagination, Spacer, Tooltip, User } from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import CreateRatingStars from "components/CategorySearchScreen/CreateRatingStars";
import EditCustomerReview from "./EditCustomerReview";
import { Product } from "utils/types";
import React from "react";
import { TrashIcon } from "icons/TrashIcon";
import { deleteProductReview } from "redux/ProductService/productReviewSlice";

interface CustomerReviewsProps {
    product: Product;
}

function CustomerReviews({ product}: CustomerReviewsProps) {
    const dispatch = useReduxDispatch();
    const { email } = useReduxSelector((state) => state.userLoginDetails);
    const { productReviews } = useReduxSelector((state) => state.productReviews);
    const { productRating } = useReduxSelector((state) => state.productRating);

    // Pagination for customer reviews
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;
    const pages = Math.ceil(productRating.ratingCount / rowsPerPage);
    const productReviewList = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return productReviews.slice(start, end);
    }, [page, productReviews]);

    const handleDeleteProductReview = (productId: bigint, productReviewId: bigint) => {
        const toastId = toast.loading("Deleting your review...", {
            position: "top-right",
            duration: 3000
        });

        setTimeout(() => {
            dispatch(deleteProductReview(productId, productReviewId))
                .then(() => {
                    toast.success("Deleted your review successfully", {
                        id: toastId,
                        position: "top-right",
                        duration: 4000
                    });
                })
                .catch(() =>
                    toast.error("Failed to delete your review", {
                        id: toastId,
                        position: "top-right",
                        duration: 4000
                    })
                );
        }, 2000);
    };

    return (
        <div className="space-y-4">
            <Toaster richColors closeButton />
            {productReviewList.map((productReview) => {
                return (
                    <div key={productReview.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <User
                                name={productReview.userFullName}
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
                            {email === productReview.user && (
                                <div className="flex gap-4">
                                    <EditCustomerReview
                                        product={product}
                                        productReview={productReview}
                                    />
                                    <Tooltip color="danger" content="Delete review">
                                        <div
                                            className="text-rose-500 cursor-pointer"
                                            onClick={() =>
                                                handleDeleteProductReview(
                                                    product.id,
                                                    productReview.id
                                                )
                                            }
                                        >
                                            <TrashIcon width={22} height={22} />
                                        </div>
                                    </Tooltip>
                                </div>
                            )}
                        </div>
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
            <Spacer y={3} />
            {productRating.ratingCount > rowsPerPage && (
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
