import {createReducer} from "@reduxjs/toolkit";
import {
    historiesAddRequest,
    historiesDeleteRequest,
    historiesListRequest,
    historiesUpdateRequest,
    historiesPathDeleteRequest,
    isLoading
} from "../actions/histories";

const initialState = {
    history: {},
    errors: {},
    loading: false,
    historiesList: [],
    status: "",
};

export const histories = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.history.isLoading = action.payload.arg
        })
        .addCase(historiesListRequest.fulfilled, (state, action) => {
            const {histories} = action.payload;
            state.historiesList = histories;
        })
});