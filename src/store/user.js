import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    uid: null
}

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        signIn: (state, action) => ({
            email: action.payload.email,
            uid: action.payload.uid
        }),
        logOut: (state, action) => ({
            email: action.payload.email,
            uid: action.payload.uid
        })
    }
})

export const {
    signIn,
    logOut
} = user.actions;

export default user.reducer;