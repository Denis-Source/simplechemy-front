import {createBrowserRouter} from "react-router-dom";

import React from "react";
import RegisterLayout from "./Layouts/RegisterLayout/RegisterLayout";
import GameLayout from "./Layouts/GameLayout/GameLayout";
import LoginLayout from "./Layouts/LoginLayout/LoginLayout";
import GameListLayout from "./Layouts/GameListLayout/GameListLayout";

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
        path: "/list",
        element:
            <GameListLayout/>
    },
    {
        path: "/login",
        element:
            <LoginLayout/>
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
