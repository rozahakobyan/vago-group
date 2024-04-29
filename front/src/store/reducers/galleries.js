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
    pages: 1
};

export const galleries = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.galleries.isLoading = action.payload.arg
        })
        .addCase(galleriesListRequest.fulfilled, (state, action) => {
            const {galleries, pages} = action.payload;
            state.galleriesList = galleries;
            state.pages = pages;
        })
});