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
    isFeatured: boolean;
};

export type Product = {
    id: bigint;
    name: string;
    brand: string;
    category: string;
    categorySlug: string;
    slug: string;
    description?: string;
    rating?: number;
    reviewCount?: number;
    stockCount: number;
    price: number;
    sellingPrice: number;
    discountedPrice: number;
    discount: number;
    productImages: Array<ProductImages>;
    createdAt: string;
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
    pinCode: string;
    createdAt: string;
    updatedAt: string;
    country: string;
};

export type ShippingAddressType = "Home" | "Work" | "Other";

export type ShippingAddress = {
    id: bigint;
    name: string;
    alternatePhone: string;
    type: ShippingAddressType;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
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
    | "createdAt"
    | "updatedAt"
    | "user"
    | "address.id"
    | "address.createdAt"
    | "address.updatedAt"
>;

export type OrderDetails = {
    orderItems: Array<Cart>;
    amount: number;
};

export type CheckoutStepsState = {
    isLoading: boolean;
    shippingAddressId: bigint | null;
    orderItems: Array<{
        product: bigint;
        quantity: number;
    }>;
    amount: number;
    error: Error;
};

export type PaymentMethods = "UPI" | "Cash On Delivery";
export type PaymentStatus =
    | "PENDING"
    | "CONFIRMED"
    | "SHIPPED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED"
    | "REFUNDED";

export type Order = {
    id: bigint;
    amount: number;
    pendingAmount: number;
    user: string;
    userAddress: ShippingAddress;
    isPaid: boolean;
    status: PaymentStatus;
    method: PaymentMethods;
    razorpayOrderId: string | null;
    razorpayPaymentId: string | null;
    razorpaySignature: string | null;
    createdAt: string;
    updatedAt: string;
    orderItems: Array<{
        id: bigint;
        order: bigint;
        product: {
            id: bigint;
            name: string;
            slug: string;
            description: string;
            brand: string;
            featuredImage: string;
        };
        quantity: number;
        createdAt: string;
        updatedAt: string;
    }>;
    paymentDetails: Payment;
};

export type OrderListState = {
    isLoading: boolean;
    orders: Array<Order> | [];
    error: Error;
};

export type OrderDetailsState = {
    isLoading: boolean;
    order: Order | null;
    error: Error;
};

/* Payment Types */
export type Payment = {
    id: bigint;
    order: bigint;
    totalMrp: number;
    totalDiscountPrice: number;
    totalSellingPrice: number;
    convenienceFee: number;
    shippingFee: number;
    totalAmount: number;
    roundOffPrice: number;
    savingsAmount: number;
    savingsPercent: number;
};

/* Razorpay Types */
export interface RazorpayInstance {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
    on(event: string, callback: (args: any) => void): void;
    open(): void;
}

export interface RazorpaySuccessHandlerArgs {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export interface RazorPayFailureHandlerArgs {
    error?: {
        code?: string;
        description?: string;
        source?: string;
        step?: string;
        reason?: string;
        metadata?: {
            order_id?: string;
            payment_id?: string;
        };
    };
}

export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string;
    // eslint-disable-next-line no-unused-vars
    handler?: (args: RazorpaySuccessHandlerArgs) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
        method?: "card" | "netbanking" | "wallet" | "emi" | "upi";
    };
    notes?: object;
    theme?: {
        hide_topbar?: boolean;
        color?: string;
        backdrop_color?: string;
    };
    modal?: {
        backdropclose?: boolean;
        escape?: boolean;
        handleback?: boolean;
        confirm_close?: boolean;
        ondismiss?: () => void;
        animation?: boolean;
    };
    subscription_id?: string;
    subscription_card_change?: boolean;
    recurring?: boolean;
    callback_url?: string;
    redirect?: boolean;
    customer_id?: string;
    timeout?: number;
    remember_customer?: boolean;
    readonly?: {
        contact?: boolean;
        email?: boolean;
        name?: boolean;
    };
    hidden?: {
        contact?: boolean;
        email?: boolean;
    };
    send_sms_hash?: boolean;
    allow_rotation?: boolean;
    retry?: {
        enabled?: boolean;
        max_count?: boolean;
    };
    config?: {
        display: {
            language: "en";
        };
    };
}

export interface RazorpaySuccessResponse {
    data: {
        id: string;
        entity: string;
        amount: number;
        amount_paid: number;
        amount_due: number;
        currency: "INR";
        receipt: number;
        offer_id: string | null;
        status: "created" | "attempted" | "paid";
        attempts: number;
        notes:
            | {
                  [key: string]: string;
              }
            | [];
        created_at: number;
    };
}
