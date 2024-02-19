import { createBrowserRouter } from "react-router-dom";
import React from "react";
import BreakOut from "./screens/BreakOut";
import HomePage from "./screens/HomePage";
import Tetris from "./screens/Tetris";
import SnakeGame from "./screens/SnakeGame";
import TicTacToeGame from "./screens/TicTacToeGame";
import Motus from "./screens/Motus";
import EnterNickname from "./screens/EnterNickname";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <EnterNickname />,
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
  {
    path: "/motus",
    element: <Motus />,
  },
  {
    path: "/tictactoe",
    element: <TicTacToeGame />,
  },
]);

export default Router;
