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
        .addCase(historiesAddRequest.fulfilled, (state, action) => {
            const {history} = action.payload;
            state.history = history;
            state.loading = false;
        })
        .addCase(historiesAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(historiesAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(historiesListRequest.fulfilled, (state, action) => {
            const {histories} = action.payload;
            state.historiesList = histories;
        })
        .addCase(historiesDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(historiesDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(historiesPathDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(historiesPathDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(historiesUpdateRequest.fulfilled, (state, action) => {
            const {history} = action.payload;
            state.history = history;
            state.loading = false;
        })
        .addCase(historiesUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(historiesUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});