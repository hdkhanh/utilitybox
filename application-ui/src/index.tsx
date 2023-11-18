import React from "react";
import { createRoot } from "react-dom/client";

import "./styles/app.scss";
import App from "./App";

const renderApplication = () => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(<App />);
    } else {
        throw new Error("Could not find root element");
    }
};

renderApplication();
