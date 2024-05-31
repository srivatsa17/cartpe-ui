// Auth service
export const REGISTER_URI = "users/register";
export const GOOGLE_REGISTER_URI = "users/register-google";
export const VERIFY_EMAIL = "users/verify-email";
export const LOGIN_URI = "users/login";
export const GOOGLE_LOGIN_URI = "users/google-login";
export const LOGOUT_URI = "users/logout";
export const PROFILE_URI = "users/edit-profile";

// Product service
export const SEARCH_CATEGORIES_URI = "products/categories/search";
export const PRODUCT_LIST_URI = "products";
export const PRODUCT_REVIEW_URI = (productId: bigint) => {
    return `products/${productId}/reviews`;
};
export const PRODUCT_REVIEW_BY_ID_URI = (productId: bigint, productReviewId: bigint) => {
    return `products/${productId}/reviews/${productReviewId}`;
};
export const PRODUCT_RATING_URI = (productId: bigint) => {
    return `products/${productId}/rating`;
};
export const WISHLIST_URI = "products/wishlist";
export const WISHLIST_BY_ID_URI = (wishlistId: bigint) => {
    return `products/wishlist/${wishlistId}`;
};

// Cart Service
export const CART_URI = "cart/";
export const CART_BY_ID_URI = (productId: bigint) => {
    return `cart/${productId}`;
};

// Checkout/Shipping service
export const SHIPPING_ADDRESS_URI = "shipping/user-address";
export const SHIPPING_ADDRESS_BY_ID_URI = (userAddressId: bigint) => {
    return `shipping/user-address/${userAddressId}`;
};

// Order service
export const RAZORPAY_ORDER_URI = "orders/razorpay";
export const ORDER_URI = "orders/";
export const ORDER_BY_ID_URI = (orderId: bigint) => {
    return `orders/${orderId}`;
};
