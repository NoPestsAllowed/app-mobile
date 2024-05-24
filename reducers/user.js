import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: { email: null, token: null, id: null, firstname: null, photo: [], lastname: null },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateEmail: (state, action) => {
            state.value.email = action.payload;
        },
        updateUser: (state, action) => {
            state.value.firstname = action.payload.firstname,
            state.value.lastname = action.payload.lastname,
            state.value.id = action.payload.id
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
            state.value.id = null;
        },
        updatePhoto: (state, action ) => {
            state.value.photo.push(action.payload);
        },
        deleteAccount: (state, action) => {
            if (state.value.id === action.payload) {
                state.value = { token: null, id: null, firstname: null, lastname: null, photo: []};
            }
        }
    },
});

export const { updateEmail, setToken, removeToken, clearUserState, deleteAccount , updatePhoto, updateUser } = userSlice.actions;
export default userSlice.reducer;
