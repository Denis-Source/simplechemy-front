import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface InitialState {
    theme: string[];
}

export const BACKGROUND_COLORS = [
    ["#bdc3c7", "#2c3e50"],
    ["#e7e9bb", "#403b4a"],
    ["#dbd5a4", "#649173"],
    ["#f29492", "#65606b"],
    ["#ef8e38", "#108dc7"],
    ["#f8ad70", "#ef6b50"],
    ["#ec6ead", "#3494e6"],
    ["#59c173", "#5d26c1"],
];

const initialState: InitialState = {
    theme: BACKGROUND_COLORS[0],
};

export const generalSlice = createSlice({
    name: "general",
    initialState: initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<number>) => {
            state.theme = BACKGROUND_COLORS[action.payload];
        },
    },
});

export const {
    setTheme,
} = generalSlice.actions;
export default generalSlice.reducer;
