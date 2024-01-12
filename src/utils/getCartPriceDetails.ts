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
                sum + cartItem.quantity * cartItem.product.discounted_price,
            0
        )
    );
    const totalSellingPrice = Number(
        cartItems.reduce(
            (sum: number, cartItem: Cart) =>
                sum + cartItem.quantity * cartItem.product.selling_price,
            0
        )
    );
    const convenienceFee = 10;
    const shippingFee = "FREE";
    const totalAmount = Math.round(totalSellingPrice + convenienceFee);
    const roundOffPrice = Math.round(totalSellingPrice) - totalSellingPrice;
    const savingsAmount = Math.round(totalMRP - totalAmount);
    const savingsPercent = (savingsAmount / totalMRP) * 100;

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
