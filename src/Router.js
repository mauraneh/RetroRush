import { createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
import BreakOut from "./screens/BreakOut/BreakOut";
import HomePage from "./screens/HomePage";
import Tetris from "./screens/Tetris/Tetris";

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
        {
            path: "/tetris",
            element: <Tetris />,
        },
    ]
);
export default Router;
