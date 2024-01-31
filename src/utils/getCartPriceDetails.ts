import { Cart } from "./types";
import { useReduxSelector } from "hooks/redux";

export const getCartPriceDetails = () => {
    const { cartItems } = useReduxSelector((state) => state.cart);

    const totalMRP = Number(
        cartItems.reduce(
            (sum: number, cartItem: Cart) => sum + cartItem.quantity * cartItem.product.price,
            0
        )
    );
    const totalDiscountPrice = Number(
        cartItems.reduce(
            (sum: number, cartItem: Cart) =>
                sum + cartItem.quantity * cartItem.product.discountedPrice,
            0
        )
    );
    const totalSellingPrice = Number(
        cartItems.reduce(
            (sum: number, cartItem: Cart) =>
                sum + cartItem.quantity * cartItem.product.sellingPrice,
            0
        )
    );
    // Set convenience fee only if cart items are present.
    const convenienceFee = cartItems.length ? 10 : 0;
    const shippingFee = 0;
    const totalAmount = Math.round(totalSellingPrice + convenienceFee);
    const roundOffPrice = Math.round(totalSellingPrice) - totalSellingPrice;
    // Savings amount is 0 if value is -ve.
    const savingsAmount =
        Math.round(totalMRP - totalAmount) > 0 ? Math.round(totalMRP - totalAmount) : 0;
    // Savings percent is set to 0 incase MRP is 0 to avoid Divide by zero which gives Infinity here.
    const savingsPercent = totalMRP === 0 ? 0 : (savingsAmount / totalMRP) * 100;

    return {
        totalMRP,
        totalDiscountPrice,
        totalSellingPrice,
        convenienceFee,
        shippingFee,
        totalAmount,
        roundOffPrice,
        savingsAmount,
        savingsPercent
    };
};
