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

export type ProductImages = {
    id: bigint;
    image: string;
    is_featured: boolean;
};

export type Product = {
    id: bigint;
    name: string;
    brand: string;
    category: string;
    category_slug: string;
    slug: string;
    description?: string;
    rating?: number;
    reviewCount?: number;
    stock_count: number;
    price: number;
    selling_price: number;
    discounted_price: number;
    discount: number;
    product_images: Array<ProductImages>;
    created_at: string;
};

export type ProductListState = {
    isLoading?: boolean;
    products: Array<Product> | [];
    searchedCategory: string;
    error?: string | null | unknown;
};

export type ProductDetailsState = {
    isLoading?: boolean;
    product: Partial<Product>;
    error?: string | null | unknown;
};

export type Cart = {
    product: Product;
    quantity: number;
};

export type CartState = {
    isLoading: boolean;
    cartItems: Array<Cart>;
    error: string | null;
};

export type Address = {
    id: bigint;
    line1: string;
    line2: string;
    city: string;
    state: string;
    pin_code: number;
    created_at: string;
    updated_at: string;
    country: string;
};

export type ShippingAddress = {
    id: bigint;
    name: string;
    alternate_phone: string;
    type: "Home" | "Work" | "Other";
    is_default: boolean;
    created_at: string;
    updated_at: string;
    address: Address;
    user: string;
};

export type ShippingAddressState = {
    isLoading: boolean;
    addressList: Array<ShippingAddress>;
    error: string | null | unknown;
};

export interface ErrorResponse {
    response?: {
        data?: {
            detail?: string;
            message?: string;
        };
    };
}
