import { Card, CardBody, CardHeader, Image, Link } from "@nextui-org/react";

import React from "react";
import { getHomeScreenCardItems } from "utils/getHomeScreenCardItems";
import { motion } from "framer-motion";

function ShopByCategories() {
    const { categoriesToShop } = getHomeScreenCardItems();

    return (
        <div className="space-y-6">
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
                className="text-4xl uppercase bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text"
            >
                Shop by categories
            </motion.div>
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 1 }}
                className="grid grid-cols-3 gap-6"
            >
                {categoriesToShop.map((category) => {
                    return (
                        <Link
                            key={category.key}
                            href={`/categories/${category.slug}?rawQuery=${category.name}`}
                        >
                            <Card isPressable>
                                <CardHeader className="text-2xl justify-center p-2.5">
                                    {category.name}
                                </CardHeader>
                                <CardBody className="p-4">
                                    <Image src={category.image} />
                                </CardBody>
                            </Card>
                        </Link>
                    );
                })}
            </motion.div>
        </div>
    );
}

export default ShopByCategories;
