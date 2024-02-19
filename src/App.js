import "./App.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { NicknameProvider } from "./Context/NicknameContext";
import AppRouter from "./Router";
import { SpeedProvider } from "./Context/Speedcontext";
import { TetrisProvider } from "./Context/TetrisContext";

function App() {
  return (
    <SpeedProvider>
      <TetrisProvider>
        <NicknameProvider>
          <RouterProvider router={AppRouter} />
        </NicknameProvider>
      </TetrisProvider>
    </SpeedProvider>
  );
}

export default App;
