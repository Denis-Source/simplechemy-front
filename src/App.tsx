import React, {useEffect} from 'react';
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {useCookies} from "react-cookie";
import {useDispatch, useSelector} from "react-redux";
import {AppStates, setAppState, setAuthenticated, setTheme} from "./Reducers/General";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {setAuthenticationToken} from "./Reducers/Authentication";
import {APIRoutes, fetchAPI} from "./api";

function App() {
    // Use dispatch
    const dispatch = useDispatch();
    // Use cookies
    const [cookies] = useCookies(["theme", "authToken"]);
    const authenticated = useSelector((state: any) => state.general.authenticated)

    // Theme
    useEffect(() => {
        cookies.theme && dispatch(setTheme(parseInt(cookies.theme)));
        // Auth token
        if (cookies.authToken) {
            dispatch(setAuthenticationToken(cookies.authToken));
            const refreshToken = async () => {
                const response = await fetchAPI(APIRoutes.refresh, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${cookies.authToken}`
                    }
                })
                const token = response.token;
                dispatch(setAuthenticationToken(token));
                dispatch(setAuthenticated(true));
            }
            refreshToken().then();
        } else {
            dispatch(setAppState(AppStates.Nominal));
        }
    }, [authenticated]);

    useEffect(() => {
        authenticated && dispatch(setAppState(AppStates.Nominal))
    }, [authenticated])

    return <DndProvider backend={HTML5Backend}><RouterProvider router={router}/></DndProvider>;
}

export default App;
