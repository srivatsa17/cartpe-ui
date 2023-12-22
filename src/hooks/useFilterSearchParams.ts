import { useSearchParams } from "react-router-dom";

export function useFilterSearchParams() {
    const [queryParams] = useSearchParams();

    const searchedCategory = queryParams.get("rawQuery") ?? "";
    const filteredCategories = queryParams.get("categories")?.split(",") ?? [];
    const filteredBrands = queryParams.get("brands")?.split(",") ?? [];
    const filteredDiscount = queryParams.get("discount") ?? "0";
    let filteredPriceRange = queryParams.get("priceRange") ?? null;
    if (filteredPriceRange) {
        filteredPriceRange = JSON.parse(filteredPriceRange);
    }

    const sortBy = queryParams.get("sort") ?? null;

    return {
        searchedCategory,
        filteredCategories,
        filteredBrands,
        filteredDiscount,
        filteredPriceRange,
        sortBy
    };
}
