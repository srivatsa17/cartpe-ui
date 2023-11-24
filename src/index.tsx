import "./index.css";

import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <NextUIProvider>
        <App />
    </NextUIProvider>
);
