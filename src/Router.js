import { createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
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
    path: "/tictactoe",
    element: <TicTacToeGame />,
  },
]);
export default Router;
