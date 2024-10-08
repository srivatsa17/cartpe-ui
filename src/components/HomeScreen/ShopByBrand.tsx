import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

import React from "react";
import { getHomeScreenCardItems } from "utils/getHomeScreenCardItems";
import { motion } from "framer-motion";

function ShopByBrand() {
    const { shopByBrands } = getHomeScreenCardItems();

    return (
        <div className="space-y-6">
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
                className="text-4xl uppercase bg-gradient-to-r from-blue-600 to-indigo-300 text-transparent bg-clip-text"
            >
                Explore top Brands
            </motion.div>
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 1 }}
                className="grid xs:grid-cols-2 md:grid-cols-4 gap-6"
            >
                {shopByBrands.map((product) => {
                    return (
                        <Card key={product.key}>
                            <CardHeader className="text-2xl justify-center p-2.5">
                                {product.name}
                            </CardHeader>
                            <CardBody className="p-4">
                                <Image src={product.image} width={280} height={180} />
                            </CardBody>
                        </Card>
                    );
                })}
            </motion.div>
        </div>
    );
}

export default ShopByBrand;
