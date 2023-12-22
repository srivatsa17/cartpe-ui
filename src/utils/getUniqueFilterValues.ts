import { Product } from "./types";

function getUniqueCategories(products: Product[]) {
    const categories: string[] = [];

    products.forEach((product) => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });

    return categories;
}

function getUniqueBrands(products: Product[]) {
    const brands: string[] = [];

    products.forEach((product) => {
        if (!brands.includes(product.brand)) {
            brands.push(product.brand);
        }
    });

    return brands;
}

function getDiscountRanges() {
    return Array.from({ length: 5 }, (_, index) => (index + 1) * 10)
        .reverse()
        .map(String);
}

function getPriceRange(products: Product[]) {
    let maxPrice = products[0]?.selling_price;
    let minPrice = products[0]?.selling_price;

    for (let i = 0; i < products.length; i++) {
        const price = products[i].selling_price;
        if (price > maxPrice) {
            maxPrice = price;
        }
        if (price < minPrice) {
            minPrice = price;
        }
    }

    // Round Up To Nearest Multiple of 100
    minPrice = Math.floor(minPrice / 100) * 100;
    maxPrice = Math.ceil(maxPrice / 100) * 100;

    return { maxPrice, minPrice };
}

export function getUniqueFilterValues(products: Product[]) {
    const uniqueCategories = getUniqueCategories(products);
    const uniqueBrands = getUniqueBrands(products);
    const discountRanges = getDiscountRanges();
    const priceRange = getPriceRange(products);

    return {
        uniqueCategories,
        uniqueBrands,
        discountRanges,
        priceRange
    };
}
