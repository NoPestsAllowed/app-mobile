import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: { email: null, token: null, id: null, firstname: null, photo: [] },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateEmail: (state, action) => {
            state.value.email = action.payload;
        },
        // updateUser: (state, action) => {
        //     state.value.firstname = action.payload.firstname;
        //     state.value.email = action.payload.email;
        //     state.value.id = action.payload.id;
        // },
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
            console.log(action.payload, state.value);
            state.value.photo.push(action.payload);
        },
        deleteAccount: (state, action) => {
            if (state.value.id === action.payload) {
                state.value = { email: null, token: null, id: null };
            }
        }
    },
});

export const { updateEmail, setToken, removeToken, clearUserState, deleteAccount , updatePhoto } = userSlice.actions;
export default userSlice.reducer;
