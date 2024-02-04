import { createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
import SnakeGame from "./screens/SnakeGame"; 

const Router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
        },
        {
            path: "/homepage",
            element: <Homepage />,
        },
        {
            path: "/snake",
            element: <SnakeGame />,
        },
    ]
);
export default Router;