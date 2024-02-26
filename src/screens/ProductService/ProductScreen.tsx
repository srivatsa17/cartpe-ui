import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import BadRequest400 from "screens/Error/BadRequest400";
import ProductScreenDetails from "components/ProductScreen/ProductScreenDetails";
import ProductScreenSkeleton from "components/ProductScreen/ProductScreenSkeleton";
import React from "react";
import { getProductDetails } from "redux/ProductService/productByIdSlice";
import { useParams } from "react-router-dom";

function ProductScreen() {
    const { id } = useParams();
    const dispatch = useReduxDispatch();

    const { product, isLoading } = useReduxSelector((state) => state.productDetails);

    React.useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id));
        }
    }, [dispatch, id]);

    return isLoading === false ? (
        product ? (
            <ProductScreenDetails product={product} />
        ) : (
            <BadRequest400 />
        )
    ) : (
        <ProductScreenSkeleton />
    );
}

export default ProductScreen;
