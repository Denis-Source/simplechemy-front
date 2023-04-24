import {ElementModel} from "../Models/Element.model";
import {UserModel} from "../Models/User.model";
import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

import airImage from "../Static/Images/test_element.png"


export const DraggableTypes = {
    PLACED: "placed",
    UNLOCKED: "unlocked"
}


export interface GameState {
    unlockedElements: ElementModel[],
    users: UserModel[],
    placedElements: {
        [uuid: string]: {
            top: number
            left: number
            element: ElementModel
        }
    },
    fieldWidth: number,
    fieldHeight: number
}

const initialGameState = {
    unlockedElements: Array<ElementModel>({
        name: "Air",
        url: airImage
    }),
    users: [],
    fieldWidth: 0,
    fieldHeight: 0,
    placedElements: {
        test493854: {
            x: 1,
            y: 1,
            element: {
                name: "Air",
                url: airImage
            }
        },
        test93854: {
            x: -1,
            y: -1,
            element: {
                name: "Air",
                url: airImage
            }
        }
    }
}

export const gameSlice = createSlice({
    name: "game",
    initialState: initialGameState,
    reducers: {
        setGameState: (state: Draft<GameState>, action: PayloadAction<GameState>) => {
            state = action.payload;
        },
        setGameFieldSize: (state: Draft<GameState>, action: PayloadAction<{ width: number, height: number }>) => {
            state.fieldWidth = action.payload.width;
            state.fieldHeight = action.payload.height;
        },
        addPlacedElement: (state: Draft<GameState>, action: PayloadAction<{ x: number, y: number, uuid: string, element: ElementModel }>) => {
            const newPlacedElement = {
                [action.payload.uuid]: {
                    x: action.payload.x,
                    y: action.payload.y,
                    element: action.payload.element
                }
            }
            const updatedPlacedElements = {
                ...state.placedElements,
                ...newPlacedElement
            }
            state.placedElements = updatedPlacedElements as typeof state.placedElements;

        },
        movePlacedElement: (state: Draft<GameState>, action: PayloadAction<{ x: number, y: number, uuid: string }>) => {
            const updatedPlacedElements = {
                ...state.placedElements,
                [action.payload.uuid]: {
                    ...state.placedElements[action.payload.uuid],
                    x: action.payload.x,
                    y: action.payload.y
                }
            };
            state.placedElements = updatedPlacedElements
        },

        clearPlacedElements: (state: Draft<GameState>) => {
            state.placedElements = {};
        }
    }
})

export const {
    setGameState,
    setGameFieldSize,
    addPlacedElement,
    movePlacedElement,
    clearPlacedElements
} = gameSlice.actions;
export default gameSlice.reducer;