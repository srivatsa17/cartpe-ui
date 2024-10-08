const categoriesToShop = [
    {
        key: "men-topwear",
        name: "Men Topwear",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+categories/shop_by_men_topwear.jpg",
        slug: "men-topwear"
    },
    {
        key: "men-bottomwear",
        name: "Men Bottomwear",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+categories/shop_by_men_bottomwear.jpg",
        slug: "men-bottomwear"
    },
    {
        key: "men-footwear",
        name: "Men Footwear",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+categories/shop_by_men_footwear.jpg",
        slug: "men-footwear"
    },
    {
        key: "women-topwear",
        name: "Women Topwear",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+categories/shop_by_women_topwear.jpg",
        slug: "women-topwear"
    },
    {
        key: "women-bottomwear",
        name: "Women Bottomwear",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+categories/shop_by_women_bottomwear.jpg",
        slug: "women-bottomwear"
    },
    {
        key: "women-footwear",
        name: "Women Footwear",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+categories/shop_by_women_footwear.jpg",
        slug: "women-footwear"
    },
    {
        key: "electronics-cameras-and-accessories",
        name: "Cameras",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+categories/shop_by_camera.jpg",
        slug: "electronics-cameras"
    },
    {
        key: "electronics-phones",
        name: "Phones",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+categories/shop_by_phones.jpg",
        slug: "electronics-phones"
    },
    {
        key: "electronics-laptops",
        name: "Laptops",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+categories/shop_by_laptops.jpg",
        slug: "electronics-laptops"
    }
];

const shopByBrands = [
    {
        key: 1,
        name: "Apple",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+brands/apple_logo.webp"
    },
    {
        key: 2,
        name: "Adidas",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+brands/adidas_logo.jpg"
    },
    {
        key: 3,
        name: "Puma",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+brands/puma_logo.avif"
    },
    {
        key: 4,
        name: "Cannon",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+brands/cannon_logo.jpg"
    }
];

const productsWithBestDeals = [
    {
        key: 1,
        id: 12,
        name: "Google Pixel 9",
        slug: "pixel-9",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+deals/google-pixel-9.png",
        "image-width": 350,
        "image-height": 250
    },
    {
        key: 2,
        id: 11,
        name: "Nike Air Jordans",
        slug: "air-jordan-4-rm",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+deals/nike-air-jordans.jpg",
        "image-width": 350,
        "image-height": 300
    },
    {
        key: 3,
        id: 10,
        name: "Apple Iphone 16 Pro",
        slug: "apple-iphone-16-pro",
        image: "https://cartpe.s3.ap-south-1.amazonaws.com/Home+Screen/Shop+by+deals/apple-iphone-16-pro.jpg",
        "image-width": 350,
        "image-height": 250
    }
];

export function getHomeScreenCardItems() {
    return {
        categoriesToShop,
        shopByBrands,
        productsWithBestDeals
    };
}
