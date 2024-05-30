import {createReducer} from "@reduxjs/toolkit";
import {isLoading,massagerListRequest} from "../actions/massagers";

const initialState = {
    massager: {},
    errors: {},
    loading: false,
    massagersList: [],
    status: "",
};

export const massagers = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.massager.isLoading = action.payload.arg
        })
        .addCase(massagerListRequest.fulfilled, (state, action) => {
            const {massagers} = action.payload;
            state.massagersList = massagers;
        })
});