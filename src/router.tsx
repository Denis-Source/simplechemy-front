import {createBrowserRouter} from "react-router-dom";

import React from "react";
import LoadingLayout from "./Layouts/LoadingLayout/LoadingLayout";
import RegisterLayout from "./Layouts/RegisterLayout/RegisterLayout";
import GameLayout from "./Layouts/GameLayout/GameLayout";

export enum RouterPaths {
    HomePage = "/",
    Rooms = "/room",
    Info = "/info",
}

export const router = createBrowserRouter([
    {
        path: "/",
        element:
            <GameLayout/>
    },

    {
        path: "/login",
        element:
            <LoadingLayout/>
    },

    {
        path: "/register",
        element:
            <RegisterLayout/>
    },
    {
        path: "/list",

    }
]);
