import {createBrowserRouter} from "react-router-dom";

import React from "react";
import BaseLayout from "./Layouts/BaseLayout/BaseLayout";
import Game from "./Components/Game/Game";
import Login from "./Components/Authentication/Login/Login";
import Register from "./Components/Authentication/Registration/Register";

export enum RouterPaths {
    HomePage = "/",
    Rooms = "/room",
    Info = "/info",
}

export const router = createBrowserRouter([
    {
        path: "/",
        element:
            <BaseLayout>
                <Game/>
            </BaseLayout>,
        errorElement: (
            // <ErrorLayout
            //     message={Strings.NoPageFound}
            //     description={Strings.GoBack}
            // />
            <p>bbb</p>
        ),
    },
    {
        path: "/login",
        element:
            <BaseLayout>
                <Login/>
            </BaseLayout>,
        errorElement: (
            // <ErrorLayout
            //     message={Strings.NoPageFound}
            //     description={Strings.GoBack}
            // />
            <p>bbb</p>
        ),
    },

    {
        path: "/register",
        element:
            <BaseLayout>
                <Register/>
            </BaseLayout>,
        errorElement: (
            // <ErrorLayout
            //     message={Strings.NoPageFound}
            //     description={Strings.GoBack}
            // />
            <p>bbb</p>
        ),
    }
    // {
    //     path: "/room/:roomUuid",
    //     element: <RoomLayout/>,
    //     errorElement: (
    //         <ErrorLayout
    //             message={ErrorMessages.Unknown}
    //             description={Strings.GoBack}
    //         />
    //     ),
    // },
    // {
    //     path: "/info",
    //     element: <InfoLayout/>,
    //     errorElement: (
    //         <ErrorLayout
    //             message={ErrorMessages.Unknown}
    //             description={Strings.GoBack}
    //         />
    //     ),
    // },
]);
