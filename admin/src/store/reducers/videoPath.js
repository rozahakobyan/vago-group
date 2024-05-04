import {createReducer} from "@reduxjs/toolkit";
import {
    videoPathsAddRequest,
    videoPathsDeleteRequest,
    videoPathsListRequest,
    videoPathsUpdateRequest,
    videoPathsPathDeleteRequest,
    isLoading
} from "../actions/videoPath";

const initialState = {
    videoPath: {},
    errors: {},
    loading: false,
    videoPathsList: [],
    status: "",
};

export const videoPath = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.videoPath.isLoading = action.payload.arg
        })
        .addCase(videoPathsAddRequest.fulfilled, (state, action) => {
            const {videoPath} = action.payload;
            state.videoPath = videoPath;
            state.loading = false;
        })
        .addCase(videoPathsAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(videoPathsAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(videoPathsListRequest.fulfilled, (state, action) => {
            const {videoPaths} = action.payload;
            state.videoPathsList = videoPaths;
        })
        .addCase(videoPathsDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(videoPathsDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(videoPathsPathDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(videoPathsPathDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(videoPathsUpdateRequest.fulfilled, (state, action) => {
            const {videoPath} = action.payload;
            state.videoPath = videoPath;
            state.loading = false;
        })
        .addCase(videoPathsUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(videoPathsUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});