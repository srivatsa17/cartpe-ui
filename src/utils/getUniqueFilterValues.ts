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
        if (!brands.includes(product.category)) {
            brands.push(product.category);
        }
    });

    return brands;
}

function getDiscountRanges() {
    return Array.from({ length: 9 }, (_, index) => (index + 1) * 10);
}

function getMinAndMaxPrice(products: Product[]) {
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

    return { maxPrice, minPrice };
}

export function getUniqueFilterValues(products: Product[]) {
    const uniqueCategories = getUniqueCategories(products);
    const uniqueBrands = getUniqueBrands(products);
    const discountRanges = getDiscountRanges();
    const minAndMaxPrices = getMinAndMaxPrice(products);

    return {
        uniqueCategories,
        uniqueBrands,
        discountRanges,
        minAndMaxPrices
    };
}
