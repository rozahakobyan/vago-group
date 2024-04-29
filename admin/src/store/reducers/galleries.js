import {createReducer} from "@reduxjs/toolkit";
import {
    galleriesAddRequest,
    galleriesDeleteRequest,
    galleriesListRequest,
    galleriesUpdateRequest,
    isLoading
} from "../actions/galleries";

const initialState = {
    galleries: {},
    errors: {},
    loading: false,
    galleriesList: [],
    status: "",
};

export const galleries = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.galleries.isLoading = action.payload.arg
        })
        .addCase(galleriesAddRequest.fulfilled, (state, action) => {
            const {galleries} = action.payload;
            state.galleries = galleries;
            state.loading = false;
        })
        .addCase(galleriesAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(galleriesAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(galleriesListRequest.fulfilled, (state, action) => {
            const {galleries} = action.payload;
            state.galleriesList = galleries;
        })
        .addCase(galleriesDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(galleriesDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(galleriesUpdateRequest.fulfilled, (state, action) => {
            const {galleries} = action.payload;
            state.galleries = galleries;
            state.loading = false;
        })
        .addCase(galleriesUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(galleriesUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});