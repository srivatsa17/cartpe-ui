export const REGISTER_URI = "users/register";
export const VERIFY_EMAIL = "users/verify-email";
export const LOGIN_URI = "users/login";
export const LOGOUT_URI = "users/logout";
export const SEARCH_CATEGORIES_URI = "products/categories/search";
export const PRODUCT_LIST_URI = "products";
export const CART_URI = "cart/";
export const CART_BY_ID_URI = (productId: bigint) => {
    return `cart/${productId}`;
};
