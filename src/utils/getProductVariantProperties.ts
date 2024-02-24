import { PLACEHOLDER_IMAGE } from "constants/images";
import { Product } from "./types";

type Color = {
    name: string;
    image: string;
};

export const productVariantProperty = {
    COLOR: "color",
    SIZE: "size"
};

const getAvailableColors = (product: Product) => {
    const availableColors: Array<Color> = [];

    product.productVariants.forEach((productVariant) => {
        productVariant.properties.forEach((property) => {
            if (
                property.name.toLowerCase() === productVariantProperty.COLOR &&
                !availableColors.some((color) => color.name === property.value)
            ) {
                availableColors.push({
                    name: property.value,
                    image: productVariant.images[0] ?? PLACEHOLDER_IMAGE
                });
            }
        });
    });

    return availableColors;
};

const getSizesOrdering = () => {
    const sizeOrder: { [key: string]: number } = {
        XXS: 1,
        XS: 2,
        S: 3,
        M: 4,
        L: 5,
        XL: 6,
        XXL: 7,
        "3XL": 8
    };

    return sizeOrder;
};

const getAvailableSizes = (product: Product) => {
    const sizeOrder = getSizesOrdering();

    const availableSizes = product.productVariants
        .reduce((sizeList: Array<string>, productVariant) => {
            productVariant.properties.forEach((property) => {
                if (
                    property.name.toLowerCase() === productVariantProperty.SIZE &&
                    !sizeList.includes(property.value.toString())
                ) {
                    sizeList.push(property.value.toString());
                }
            });
            return sizeList;
        }, [])
        .sort((a: string, b: string) => sizeOrder[a] - sizeOrder[b]);

    return availableSizes;
};

export const getProductVariantProperties = (product: Product) => {
    const availableColors = getAvailableColors(product);
    const availableSizes = getAvailableSizes(product);

    return {
        availableColors,
        availableSizes,
        productVariantProperty
    };
};
