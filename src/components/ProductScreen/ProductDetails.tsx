import { Button, Image, Spacer } from "@nextui-org/react";
// import { CashIcon } from "icons/CashIcon";
// import { ExchangeIcon } from "icons/ExchangeIcon";
// import { HeartFillIcon } from "icons/HeartFillIcon";
import { Product, ProductVariant } from "utils/types";

import { CartIcon } from "icons/CartIcon";
import { HeartIcon } from "icons/HeartIcon";
import { PLACEHOLDER_IMAGE } from "constants/images";
import Rating from "components/CategorySearchScreen/Rating";
import React from "react";
import { RupeeIcon } from "icons/RupeeIcon";
import { getProductVariantProperties } from "utils/getProductVariantProperties";

// import { useReduxDispatch, useReduxSelector } from "hooks/redux";

// import { TruckFastIcon } from "icons/TruckFastIcon";
// import { TruckIcon } from "icons/TruckIcon";
// import { addCartItem } from "redux/CartService/cartSlice";
// import { addProductToWishList } from "redux/ProductService/wishlistSlice";

interface ProductDetailsProps {
    product: Product;
    selectedProductVariant: ProductVariant;
    setSelectedProductVariant: React.Dispatch<React.SetStateAction<ProductVariant>>;
}

// function getDeliveryDate() {
//     const today = new Date();
//     today.setDate(today.getDate() + 3);
//     const formattedDate = today.toLocaleDateString("en-IN", {
//         weekday: "short",
//         month: "short",
//         day: "numeric"
//     });
//     return formattedDate;
// }

function ProductDetails({
    product,
    selectedProductVariant,
    setSelectedProductVariant
}: ProductDetailsProps) {
    // const dispatch = useReduxDispatch();
    // const { cartItems } = useReduxSelector((state) => state.cart);
    // const { wishListedProducts } = useReduxSelector((state) => state.wishlist);

    // const isProductInCart = cartItems.some((cartItem) => cartItem.product.id === product.id);
    // const isProductInWishList = wishListedProducts.some(
    //     (wishListedProduct) => wishListedProduct.product.id === product.id
    // );

    // const handleAddToCart = () => {
    //     // Handle already exists condition as well with alert message.
    //     const productWithStrictType = product as Product;
    //     dispatch(addCartItem(productWithStrictType, 1));
    // };

    // const handleAddToWishList = () => {
    //     if (product.id) {
    //         dispatch(addProductToWishList(product.id));
    //     }
    // };

    // Todo: Return fallback error component
    if (product === null || product === undefined) {
        return null;
    }

    const { availableColors, availableSizes, productVariantProperty } =
        getProductVariantProperties(product);

    const [selectedColor, setSelectedColor] = React.useState<string>(
        selectedProductVariant.properties.find(
            (property) => property.name.toLowerCase() === productVariantProperty.COLOR
        )?.value ?? ""
    );
    const [selectedSize, setSelectedSize] = React.useState<string>("");

    const handleColorSelect = (color: string) => {
        // Whenever a new color is selected, make sure the size is also reset.
        setSelectedColor(color);
        setSelectedSize("");

        // Search for the productVariant with same color and set it as selected
        const productVariant = product.productVariants.find((productVariant) =>
            productVariant.properties.some(
                (property) =>
                    property.name === productVariantProperty.COLOR && property.value === color
            )
        );
        if (productVariant) {
            setSelectedProductVariant(productVariant);
        }
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);

        // Search for the productVariant with same color and size and set it as selected
        const productVariant = product.productVariants.find(
            (productVariant) =>
                productVariant.properties.some(
                    (property) =>
                        property.name === productVariantProperty.COLOR &&
                        property.value === selectedColor
                ) &&
                productVariant.properties.some(
                    (property) =>
                        property.name === productVariantProperty.SIZE && property.value === size
                )
        );
        if (productVariant) {
            setSelectedProductVariant(productVariant);
        }
    };

    return (
        <div className="mt-3 space-y-3">
            <div className="text-3xl uppercase font-semibold">{product.brand}</div>
            <div className="text-2xl text-default-500 capitalize">{product.name}</div>
            <Rating rating={product.rating || 0} reviewCount={product.reviewCount || 0} />
            <div className="flex items-center text-2xl xs:text-lg">
                <div className="flex items-center font-semibold">
                    <RupeeIcon height={22} width={22} size={22} className="" />{" "}
                    {selectedProductVariant.sellingPrice}
                </div>
                <div className="flex pl-3 items-center line-through text-default-500 font-semibold">
                    <RupeeIcon height={22} width={22} size={22} className="" />{" "}
                    {selectedProductVariant.price}
                </div>
                <div className="pl-3 text-orange-600 font-medium">
                    ({selectedProductVariant.discount}% Off)
                </div>
            </div>
            <span className="text-green-600">inclusive of all taxes</span>
            {availableColors.length && (
                <div className="space-y-4">
                    <div className="capitalize text-lg font-semibold">Available Colors</div>
                    <div className="flex flex-wrap gap-4 justify-start items-center">
                        {availableColors.map((color, index) => {
                            return (
                                <div
                                    key={index}
                                    data-selected={color.name === selectedColor}
                                    onClick={() => handleColorSelect(color.name)}
                                    className="w-24 cursor-pointer rounded-medium ring-offset-background transition-shadow data-[selected=true]:outline-none data-[selected=true]:ring-2 data-[selected=true]:ring-focus data-[selected=true]:ring-offset-2"
                                >
                                    <Image
                                        src={color.image ?? PLACEHOLDER_IMAGE}
                                        alt={product.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            <Spacer y={2} />
            {availableSizes.length && (
                <div className="space-y-2">
                    <div className="capitalize text-lg font-semibold">Available Sizes</div>
                    {!selectedSize && (
                        <span className="text-rose-500 text-sm">Please select a size</span>
                    )}
                    <div className="flex flex-wrap gap-4">
                        {availableSizes.map((size) => (
                            <Button
                                key={size}
                                isIconOnly
                                radius="full"
                                color="primary"
                                variant={size === selectedSize ? "solid" : "ghost"}
                                className="capitalize"
                                isDisabled={
                                    !selectedColor ||
                                    !product.productVariants.some(
                                        (productVariant) =>
                                            productVariant.properties.find(
                                                (property) =>
                                                    property.name === productVariantProperty.COLOR
                                            )?.value === selectedColor &&
                                            productVariant.properties.find(
                                                (property) =>
                                                    property.name === productVariantProperty.SIZE
                                            )?.value === size
                                    )
                                }
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
            <Spacer y={2} />
            <div className="flex gap-3">
                <Button
                    fullWidth
                    size="lg"
                    color="warning"
                    variant="ghost"
                    startContent={<CartIcon width={22} height={22} size={22} />}
                    isDisabled={!selectedColor || !selectedSize}
                >
                    Add to cart
                </Button>
                <Button
                    fullWidth
                    size="lg"
                    color="danger"
                    variant="ghost"
                    startContent={<HeartIcon width={24} height={24} size={24} />}
                    isDisabled={!selectedColor || !selectedSize}
                >
                    Add to wishlist
                </Button>
            </div>
            <div className="text-default-500 text-lg">{product.description}</div>
        </div>
    );
}

export default ProductDetails;
