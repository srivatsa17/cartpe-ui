/* Generic Types */
export type NestedOmit<T, K extends PropertyKey> = {
    [P in keyof T as P extends K ? never : P]: NestedOmit<
        T[P],
        K extends `${Exclude<P, symbol>}.${infer R}` ? R : never
    >;
} extends infer O
    ? { [P in keyof O]: O[P] }
    : never;

/* Error Response Types */
export type Error = string | null;

export interface ErrorResponse {
    response?: {
        data?: {
            detail?: string;
            message?: string;
        };
    };
}

/* Auth Service types */
export type RegisterState = {
    isLoading: boolean;
    isRegistered: boolean;
    isVerified: boolean;
    error: Error;
};

export type LoginState = {
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    error: Error;
};

/* Product Service Types */
export type Category = {
    name?: string | undefined;
    slug?: string | undefined;
};

export type CategorySearchState = {
    isLoading: boolean;
    categories: Array<Category> | [];
    error: Error;
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
    error?: Error;
};

export type ProductDetailsState = {
    isLoading?: boolean;
    product: Partial<Product>;
    error?: Error;
};

/* Cart Service Types */
export type Cart = {
    product: Product;
    quantity: number;
};

export type CartState = {
    isLoading: boolean;
    cartItems: Array<Cart>;
    error: string | null;
};

/* Order Service Types */
export type Address = {
    id: bigint;
    line1: string;
    line2: string;
    city: string;
    state: string;
    pin_code: string;
    created_at: string;
    updated_at: string;
    country: string;
};

export type ShippingAddressType = "Home" | "Work" | "Other";

export type ShippingAddress = {
    id: bigint;
    name: string;
    alternate_phone: string;
    type: ShippingAddressType;
    is_default: boolean;
    created_at: string;
    updated_at: string;
    address: Address;
    user: string;
};

export type ShippingAddressState = {
    isLoading: boolean;
    addressList: Array<ShippingAddress>;
    error: Error;
};

export type ShippingAddressFormData = NestedOmit<
    ShippingAddress,
    | "id"
    | "created_at"
    | "updated_at"
    | "user"
    | "address.id"
    | "address.created_at"
    | "address.updated_at"
>;
