import { Cart } from "./types";

export const getCartPriceDetails = (cartItems: Array<Cart>) => {
    const totalMRP = Number(
        cartItems
            .reduce(
                (sum: number, cartItem: Cart) => sum + cartItem.quantity * cartItem.product.price,
                0
            )
            .toFixed(2)
    );
    const totalDiscountPrice = Number(
        cartItems
            .reduce(
                (sum: number, cartItem: Cart) =>
                    sum + cartItem.quantity * cartItem.product.discounted_price,
                0
            )
            .toFixed(2)
    );
    const totalSellingPrice = Number(
        cartItems
            .reduce(
                (sum: number, cartItem: Cart) =>
                    sum + cartItem.quantity * cartItem.product.selling_price,
                0
            )
            .toFixed(2)
    );
    const convenienceFee = 10;
    const totalAmount = Math.round(totalSellingPrice + convenienceFee);

    return {
        totalMRP,
        totalDiscountPrice,
        totalSellingPrice,
        convenienceFee,
        totalAmount
    };
};
