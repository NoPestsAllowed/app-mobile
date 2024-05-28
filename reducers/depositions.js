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
            console.log(action.payload);
            state.value.newDeposition.visualProofs.push(action.payload);
        },
        clearVisualProofToNewDeposition: (state, action) => {
            state.value.newDeposition.visualProofs = [];
        },
        removeVisualProof: (state, action) => {
            console.log(action.payload);
            state.value.newDeposition.visualProofs = state.value.newDeposition.visualProofs.filter(
                (proof) => proof.uri !== action.payload.uri
            );
        },
        clearNewDeposition: (state) => {
            state.value.newDeposition.name = null;
            state.value.newDeposition.description = null;
            state.value.newDeposition.placeOwnerEmail = null;
            state.value.newDeposition.visualProofs = [];
            state.value.newDeposition.termsAccepted = false;
        },
    },
});

export const {
    setDepositions,
    clearDepositions,
    newDeposition,
    updateNewDeposition,
    addVisualProofToNewDeposition,
    clearNewDeposition,
    clearVisualProofToNewDeposition,
    removeVisualProof,
} = depositionsSlice.actions;
export default depositionsSlice.reducer;
