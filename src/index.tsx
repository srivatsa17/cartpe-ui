import "./index.css";

import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import store from "redux/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <NextUIProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </NextUIProvider>
);
