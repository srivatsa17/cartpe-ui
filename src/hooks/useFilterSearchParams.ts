import {
    BRAND_QUERY_PARAM_KEY,
    CATEGORY_QUERY_PARAM_KEY,
    DISCOUNT_QUERY_PARAM_KEY,
    PRICE_QUERY_PARAM_KEY
} from "constants/queryParam";

import { useSearchParams } from "react-router-dom";

export function useFilterSearchParams() {
    const [queryParams] = useSearchParams();

    const searchedCategory = queryParams.get("rawQuery") ?? "";
    const filteredCategories = queryParams.get(CATEGORY_QUERY_PARAM_KEY)?.split(",") ?? [];
    const filteredBrands = queryParams.get(BRAND_QUERY_PARAM_KEY)?.split(",") ?? [];
    const filteredDiscount = queryParams.get(DISCOUNT_QUERY_PARAM_KEY) ?? "0";
    let filteredPriceRange = queryParams.get(PRICE_QUERY_PARAM_KEY) ?? null;
    if (filteredPriceRange) {
        filteredPriceRange = JSON.parse(filteredPriceRange);
    }

    const sortBy = queryParams.get("sortBy") ?? null;

    return {
        searchedCategory,
        filteredCategories,
        filteredBrands,
        filteredDiscount,
        filteredPriceRange,
        sortBy
    };
}
