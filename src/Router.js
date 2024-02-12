import { createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
import BreakOut from "./screens/BreakOut";
import HomePage from "./screens/HomePage";
import Tetris from "./screens/Tetris";
import SnakeGame from "./screens/SnakeGame";
import {SpeedProvider} from "./Context/Speedcontext";

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
            element: (
                <SpeedProvider >
                    <BreakOut />
                </ SpeedProvider >
            )
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
