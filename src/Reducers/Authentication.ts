import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

export interface AuthenticationState {
    jwtToken?: string,
    userUUID?: string,
}

const initialAuthenticationState = {

}

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: initialAuthenticationState,
    reducers: {
        setAuthenticationToken: (state: Draft<AuthenticationState>, action: PayloadAction<string>) => {
               state.jwtToken = action.payload;
        },
        setUserUUID: (state: Draft<AuthenticationState>, action: PayloadAction<string>) => {
          state.userUUID = action.payload;
        }
    }
})

export const {
    setAuthenticationToken,
    setUserUUID
} = authenticationSlice.actions;
export default authenticationSlice.reducer;