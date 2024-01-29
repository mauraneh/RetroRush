import { createBrowserRouter } from "react-router-dom";
import React from "react";

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
    ]
);
export default Router;