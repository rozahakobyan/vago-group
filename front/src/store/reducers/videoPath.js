import {createReducer} from "@reduxjs/toolkit";
import {
    videoPathsListRequest,
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
        .addCase(videoPathsListRequest.fulfilled, (state, action) => {
            const {videoPaths} = action.payload;
            state.videoPathsList = videoPaths;
        })
});