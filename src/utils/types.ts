export type RegisterState = {
    isLoading: boolean;
    isRegistered: boolean;
    isVerified: boolean;
    error: string | null | unknown;
};

export type LoginState = {
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    error: string | null | unknown;
};

export type Category = {
    name?: string | undefined;
    slug?: string | undefined;
};

export type CategorySearchState = {
    isLoading: boolean;
    categories: Array<Category> | [];
    error: string | null | unknown;
};

export type Product = {
    name?: string;
    brand?: string;
    slug?: string;
    description?: string;
    rating?: number;
    reviewCount?: number;
    price?: number;
    selling_price?: number;
    discounted_price?: number;
    discount?: number;
};

export type ProductListState = {
    isLoading?: boolean;
    products: Array<Product> | [];
    searchedCategory: string;
    error?: string | null | unknown;
};

export interface ErrorResponse {
    response?: {
        data?: {
            detail?: string;
            message?: string;
        };
    };
}
