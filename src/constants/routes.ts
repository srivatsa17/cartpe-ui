/* Auth service routes */
export const REGISTER_USER_SCREEN = "/user/register";
export const VERIFY_USER_EMAIL_SCREEN = "/user/verify-email/:id/:token";
export const LOGIN_USER_SCREEN = "/user/login";
export const GOOGLE_LOGIN_USER_SCREEN = "user/login/google";
export const RESET_PASSWORD_SCREEN = "/user/reset-password";
export const RESET_PASSWORD_CONFIRM_SCREEN = "/user/reset-password-confirm/:id/:token";

/* Navbar routes */
export const HOME_SCREEN = "/";
export const WISHLIST_SCREEN = "/wishlist";
export const CONTACT_US_SCREEN = "/contact-us";
export const SAVED_ADDRESSES_SCREEN = "/addresses";
export const EDIT_PROFILE_SCREEN = "/edit-profile";

/* Product service routes */
export const CATEGORY_SCREEN = "/categories";
export const PRODUCT_SCREEN = "/products/:slug/:id/buy";
export const CATEGORY_SEARCH_SCREEN = "/categories/:slug";

/* Cart service routes */
export const CART_SCREEN = "/cart";

/* Order service routes */
export const CHECKOUT_SCREEN = "/checkout";
export const ORDER_SCREEN = "/orders";
export const ORDER_DETAIL_SCREEN = "/orders/:id";
export const ORDER_CONFIRMED_SCREEN = "/order/confirmed";
export const ORDER_FAILED_SCREEN = "/order/failed";
export const ORDER_PAYMENT_FAILED_SCREEN = "/order/paymentFailed";
