import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    massagerAddRequest,
    massagerDeleteRequest,
    massagerListRequest,
    massagerUpdateRequest
} from "../actions/massagers";

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
        .addCase(massagerAddRequest.fulfilled, (state, action) => {
            const {massager} = action.payload;
            state.massager = massager;
            state.loading = false;
        })
        .addCase(massagerAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(massagerAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(massagerListRequest.fulfilled, (state, action) => {
            const {massagers} = action.payload;
            state.massagersList = massagers;
        })
        .addCase(massagerDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(massagerDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(massagerUpdateRequest.fulfilled, (state, action) => {
            const {massager} = action.payload;
            state.massager = massager;
            state.loading = false;
        })
        .addCase(massagerUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(massagerUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});