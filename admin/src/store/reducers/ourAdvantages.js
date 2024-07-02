import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    ourAdvantagesAddRequest,
    ourAdvantagesDeleteRequest,
    ourAdvantagesListRequest,
    ourAdvantagesUpdateRequest
} from "../actions/ourAdvantages";

const initialState = {
    ourAdvantage: {},
    errors: {},
    loading: false,
    ourAdvantagesList: [],
    status: "",
    pages: 1
};

export const ourAdvantages = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.ourAdvantage.isLoading = action.payload.arg
        })
        .addCase(ourAdvantagesAddRequest.fulfilled, (state, action) => {
            const {ourAdvantage} = action.payload;
            state.ourAdvantage = ourAdvantage;
            state.loading = false;
        })
        .addCase(ourAdvantagesAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(ourAdvantagesAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(ourAdvantagesListRequest.fulfilled, (state, action) => {
            const {ourAdvantages, pages} = action.payload;
            state.ourAdvantagesList = ourAdvantages;
            state.pages = pages;
        })
        .addCase(ourAdvantagesDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(ourAdvantagesDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(ourAdvantagesUpdateRequest.fulfilled, (state, action) => {
            const {ourAdvantage} = action.payload;
            state.ourAdvantage = ourAdvantage;
            state.loading = false;
        })
        .addCase(ourAdvantagesUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(ourAdvantagesUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});