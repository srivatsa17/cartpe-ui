import { ShippingAddress } from "utils/types";

export const getDefaultAddress = (addressList: Array<ShippingAddress>) => {
    const isDefaultAddressFound = addressList.find((address) => address.isDefault);
    const defaultAddress =
        isDefaultAddressFound || (addressList.length > 0 ? addressList[0] : null);
    return defaultAddress ? JSON.stringify(defaultAddress) : JSON.stringify("");
};

export const accordianStageKeys = {
    SHIPPING_ADDRESS: "1",
    ORDER_SUMMARY: "2",
    PAYMENT_OPTIONS: "3"
};
