import {createReducer} from "@reduxjs/toolkit";
import {isLoading, workGetByIdRequest, worksListRequest} from "../actions/works";

const initialState = {
    work: {},
    errors: {},
    loading: false,
    worksList: [],
    status: "",
    pages: 1
};

export const works = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.work.isLoading = action.payload.arg
        })
        .addCase(worksListRequest.fulfilled, (state, action) => {
            const {works, pages} = action.payload;
            state.worksList = works;
            state.pages = pages;
            state.loading = false;
        })
        .addCase(worksListRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(worksListRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(workGetByIdRequest.fulfilled, (state, action) => {
            const {work} = action.payload;
            state.work = work;
            state.loading = false;
        })
        .addCase(workGetByIdRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});