import { createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
<<<<<<< HEAD
import SnakeGame from "./screens/SnakeGame";
import HomePage from "./screens/HomePage";
import TicTacToeGame from "./screens/TicTacToeGame";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/homepage",
    element: <HomePage />,
  },
  {
    path: "/snake",
    element: <SnakeGame />,
  },
  {
    path: "/tictactoe",
    element: <TicTacToeGame />,
  },
]);
=======
import BreakOut from "./screens/BreakOut/BreakOut";
import HomePage from "./screens/HomePage";
import Tetris from "./screens/Tetris/Tetris";
import SnakeGame from "./screens/SnakeGame";

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
>>>>>>> 6bd680b045cc7c4034ec56e52a1108921e03abaf
export default Router;
