import { HOME_SCREEN_IMAGE } from "constants/images";
import NavBar from "components/NavBar/NavBar";
import React from "react";
import ShopByBestDeals from "components/HomeScreen/ShopByBestDeals";
import ShopByBrand from "components/HomeScreen/ShopByBrand";
import ShopByCategories from "components/HomeScreen/ShopByCategories";
import { Spacer } from "@nextui-org/react";
import { motion } from "framer-motion";

const container = (delay: number) => ({
    hidden: { x: 100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: delay }
    }
});

function HomeScreen() {
    return (
        <div>
            <NavBar />
            <div className="container mx-auto px-6 py-7 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                    <motion.img
                        src={HOME_SCREEN_IMAGE}
                        className="pointer-events-none"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                    />
                    <div>
                        <motion.div
                            variants={container(0.3)}
                            initial="hidden"
                            animate="visible"
                            className="text-8xl bg-gradient-to-r from-blue-600 to-indigo-300 text-transparent bg-clip-text"
                        >
                            Welcome to CartPe!
                        </motion.div>
                        <br />
                        <motion.div
                            variants={container(0.7)}
                            initial="hidden"
                            animate="visible"
                            className="text-3xl"
                        >
                            Shop the Best Deals, Latest Trends, and Must-Have Products - All in One
                            Place!
                        </motion.div>
                    </div>
                </div>
                <Spacer y={24} />
                <div>
                    <ShopByCategories />
                </div>
                <Spacer y={8} />
                <div>
                    <ShopByBestDeals />
                </div>
                <Spacer y={8} />
                <div>
                    <ShopByBrand />
                </div>
                <Spacer y={12} />
            </div>
        </div>
    );
}

export default HomeScreen;
