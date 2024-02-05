import { createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
import BreakOut from "./screens/BreakOut";
import HomePage from "./screens/HomePage";

const Router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
        },
        {
            path: "/homepage",
            element: <HomePage />,
        },
        {
            path: "/breakout",
            element: <BreakOut />,
        },
        {
            path: "/snake",
            element: <SnakeGame />,
        },
    ]
);
export default Router;
