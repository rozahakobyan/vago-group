import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    projectsAddRequest,
    projectsDeleteRequest,
    projectsListRequest,
    projectsUpdateRequest
} from "../actions/projects";

const initialState = {
    project: {},
    errors: {},
    loading: false,
    projectsList: [],
    status: "",
    pages: 1
};

export const projects = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.project.isLoading = action.payload.arg
        })
        .addCase(projectsListRequest.fulfilled, (state, action) => {
            const {projects,pages} = action.payload;
            state.projectsList = projects;
            state.pages = pages
        })
});