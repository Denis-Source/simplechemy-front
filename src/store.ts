import {configureStore} from "@reduxjs/toolkit";
import generalReducer from "./Reducers/General";
import gameReducer from "./Reducers/Game";

export default configureStore({
    reducer: {
        general: generalReducer,
        game: gameReducer
    },
});
