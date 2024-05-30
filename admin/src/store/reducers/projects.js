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
        .addCase(projectsAddRequest.fulfilled, (state, action) => {
            const {project} = action.payload;
            state.project = project;
            state.loading = false;
        })
        .addCase(projectsAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(projectsAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(projectsListRequest.fulfilled, (state, action) => {
            const {projects, pages} = action.payload;
            state.projectsList = projects;
            state.pages = pages;
        })
        .addCase(projectsDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(projectsDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(projectsUpdateRequest.fulfilled, (state, action) => {
            const {project} = action.payload;
            state.project = project;
            state.loading = false;
        })
        .addCase(projectsUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(projectsUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});