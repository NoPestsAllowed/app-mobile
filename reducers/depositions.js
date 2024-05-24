import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        depositions: [], // [{name:string, description: string, placeOwnerEmail: string, ownerInformedAt, userId: ObjectId, placeId: ObjectId, visualsProofs: string[], publishedAt: date }]
        newDeposition: {
            name: null,
            description: null,
            placeOwnerEmail: null,
            visualProofs: [],
            termsAccepted: false,
        },
    },
};

export const depositionsSlice = createSlice({
    name: "depositions",
    initialState,
    reducers: {
        setDepositions: (state, action) => {
            state.value.depositions = action.payload;
        },
        clearDepositions: (state) => {
            state.value.depositions = [];
        },
        newDeposition: (state, action) => {
            state.value.depositions = action.payload;
        },
        updateNewDeposition: (state, action) => {
            state.value.email = action.payload;
        },
        addVisualProofToNewDeposition: (state, action) => {
            state.value.newDeposition.visualProofs.push(action.payload);
        },
        clearNewDeposition: (state) => {
            state.value.token = null;
        },
    },
});

export const {} = depositionsSlice.actions;
export default depositionsSlice.reducer;
