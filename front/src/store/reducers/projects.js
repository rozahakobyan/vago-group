import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    projectsAddRequest,
    projectsDeleteRequest,
    projectsListRequest, projectsListToEndedRequest, projectsListToPendingRequest,
    projectsUpdateRequest
} from "../actions/projects";

const initialState = {
    project: {},
    errors: {},
    loading: false,
    projectsList: [],
    projectsListToEnded: [],
    projectsListToPending: [],
    status: "",
    pages: 1,
    pagesToEnded: 1,
    pagesToPending: 1,
};

export const projects = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.project.isLoading = action.payload.arg
        })
        .addCase(projectsListRequest.fulfilled, (state, action) => {
            const {projects, pages} = action.payload;
            state.projectsList = projects;
            state.pages = pages
        })
        .addCase(projectsListToEndedRequest.fulfilled, (state, action) => {
            const {projects, pages} = action.payload;
            state.projectsListToEnded = projects;
            state.pagesToEnded = pages
        })
        .addCase(projectsListToPendingRequest.fulfilled, (state, action) => {
            const {projects, pages} = action.payload;
            state.projectsListToPending = projects;
            state.pagesToPending = pages
        })
});