import secureLocalStorage from "react-secure-storage";

export const getItemFromStorage = (storageItemKey: string) => {
    const storageItemDetails = secureLocalStorage.getItem(storageItemKey);
    if (storageItemDetails && typeof storageItemDetails === "string") {
        return JSON.parse(storageItemDetails);
    }
    return null;
};

export const saveItemInStorage = (storageItemKey: string, storageItemValue: object) => {
    secureLocalStorage.setItem(storageItemKey, JSON.stringify(storageItemValue));
};

export const updateItemInStorage = (
    storageItemKey: string,
    storageItemFields: { [key: string]: string | number | boolean | object }
) => {
    const storageItem = getItemFromStorage(storageItemKey);

    if (storageItem) {
        const updatedStorageItem = { ...storageItem };

        Object.keys(storageItemFields).forEach((fieldName: string) => {
            if (Object.prototype.hasOwnProperty.call(storageItem, fieldName)) {
                updatedStorageItem[fieldName] = storageItemFields[fieldName];
            }
        });

        saveItemInStorage(storageItemKey, updatedStorageItem);
    }
};

export const removeItemFromStorage = (storageItemKey: string) => {
    const storageItem = getItemFromStorage(storageItemKey);
    if (storageItem) {
        secureLocalStorage.removeItem(storageItemKey);
    }
};

export const clearStorage = () => {
    secureLocalStorage.clear();
};
