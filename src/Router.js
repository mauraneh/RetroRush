import { createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
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
export default Router;
