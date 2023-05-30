import React, {useEffect} from 'react';
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {useCookies} from "react-cookie";
import {useDispatch} from "react-redux";
import {AppStates, setAppState, setAuthenticated, setTheme} from "./Reducers/General";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {setAuthenticationToken} from "./Reducers/Authentication";
import {APIRoutes, fetchAPI, getAPIWSUrl, getWSAuthMessage} from "./api";
import useWebSocket from "react-use-websocket";

function App() {
    // Use dispatch
    const dispatch = useDispatch();
    // Use cookies
    const [cookies] = useCookies(["theme", "authToken"]);

    // Configure websocket, specify callbacks
    // To handle incoming data
    // TODO: make token refresh before ws connection
    const {sendJsonMessage} = useWebSocket(getAPIWSUrl(), {
        onOpen: () => {
            console.log("Opened WS connection");
        },
        onMessage: () => {
        },
        onClose: () => {
            console.log("Closed WS connection: ")
        },
        share: true
    });

    useEffect(() => {
        // Theme
        cookies.theme && dispatch(setTheme(parseInt(cookies.theme)));
        // Auth token
        dispatch(setAuthenticationToken(cookies.authToken));
        const authenticate = async () => {
            const response = await fetchAPI(APIRoutes.refresh, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${cookies.authToken}`
                }
            })

            if (!response.ok) {
                dispatch(setAuthenticated(false));
            } else {
                const message = await response.json();
                const token = message.token;

                dispatch(setAuthenticationToken(token));
                dispatch(setAuthenticated(true));

                await sendJsonMessage(getWSAuthMessage(token));
            }
        }
        authenticate().then(() => {
                dispatch(setAppState(AppStates.Nominal));
            }
        );

    }, [cookies, dispatch, sendJsonMessage]);

    return <DndProvider backend={HTML5Backend}><RouterProvider router={router}/></DndProvider>;
}

export default App;
