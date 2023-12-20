import { useSearchParams } from "react-router-dom";

export function useFilterSearchParams() {
    const [queryParams] = useSearchParams();

    const searchedCategory = queryParams.get("rawQuery") ?? "";
    const filteredCategories = queryParams.get("categories")?.split(",") ?? [];
    const filteredBrands = queryParams.get("brands")?.split(",") ?? [];
    const filteredDiscount = queryParams.get("discount") ?? null;
    const filteredMaxPrice = queryParams.get("maxPrice") ?? null;
    const sortBy = queryParams.get("sort") ?? null;

    return {
        searchedCategory,
        filteredCategories,
        filteredBrands,
        filteredDiscount,
        filteredMaxPrice,
        sortBy
    };
}
