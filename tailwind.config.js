import { nextui } from "@nextui-org/react";

module.exports = {
    content: [
        "./src/**/*.{html,js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {}
    },
    darkMode: "class",
    plugins: [nextui()]
};
