import {createReducer} from "@reduxjs/toolkit";
import {isLoading,worksListRequest} from "../actions/works";

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
        })
});