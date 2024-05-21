import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: { email: null, token: null },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateEmail: (state, action) => {
            state.value.email = action.payload;
        },
        setToken: (state, action) => {
            state.value.token = action.payload;
        },
        removeToken: (state, action) => {
            state.value.token = null;
        },
        clearUserState: (state) => {
            state.value.email = null;
            state.value.token = null;
        },
    },
});

export const { updateEmail, setToken, removeToken, clearUserState } = userSlice.actions;
export default userSlice.reducer;
