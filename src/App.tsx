import React, {useEffect} from 'react';
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {useCookies} from "react-cookie";
import {useDispatch} from "react-redux";
import {setTheme} from "./Reducers/General";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

function App() {
    // Use dispatch
    const dispatch = useDispatch();
    // Use cookies to properly render theme
    const [cookies] = useCookies(["theme"]);
    useEffect(() => {
        cookies.theme && dispatch(setTheme(parseInt(cookies.theme)));
    });


    return <DndProvider backend={HTML5Backend}><RouterProvider router={router}/></DndProvider>;
}

export default App;
