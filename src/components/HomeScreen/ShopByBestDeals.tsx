import { Card, CardBody, CardHeader, Image, Link } from "@nextui-org/react";

import React from "react";
import { getHomeScreenCardItems } from "utils/getHomeScreenCardItems";
import { motion } from "framer-motion";

function ShopByBestDeals() {
    const { productsWithBestDeals } = getHomeScreenCardItems();

    return (
        <div className="space-y-6">
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
                className="text-4xl uppercase bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text"
            >
                Todays Best Deals for you!
            </motion.div>
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 1 }}
                className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
                {productsWithBestDeals.map((product) => {
                    return (
                        <Link
                            key={product.key}
                            href={`/products/${product.slug}/${product.id}/buy`}
                        >
                            <Card isPressable>
                                <CardHeader className="text-2xl justify-center p-2.5">
                                    {product.name}
                                </CardHeader>
                                <CardBody className="p-4">
                                    <Image
                                        src={product.image}
                                        width={product["image-width"]}
                                        height={product["image-height"]}
                                    />
                                </CardBody>
                            </Card>
                        </Link>
                    );
                })}
            </motion.div>
        </div>
    );
}

export default ShopByBestDeals;
