import {createReducer} from "@reduxjs/toolkit";
import {
    worksAddRequest,
    worksDeleteRequest,
    worksListRequest,
    worksUpdateRequest
} from "../actions/works";
import {isLoading} from "../actions/massagers";

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
        .addCase(worksAddRequest.fulfilled, (state, action) => {
            const {work} = action.payload;
            state.work = work;
            state.loading = false;
        })
        .addCase(worksAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(worksAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(worksListRequest.fulfilled, (state, action) => {
            const {works, pages} = action.payload;
            state.worksList = works;
            state.pages = pages;
        })
        .addCase(worksDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(worksDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(worksUpdateRequest.fulfilled, (state, action) => {
            const {work} = action.payload;
            state.work = work;
            state.loading = false;
        })
        .addCase(worksUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(worksUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});