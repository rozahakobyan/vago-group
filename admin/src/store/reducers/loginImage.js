import {createReducer} from "@reduxjs/toolkit";
import {
    loginImageAddRequest,
    loginImageDeleteRequest,
    loginImageListRequest,
    loginImageUpdateRequest,
    isLoading
} from "../actions/loginImage";

const initialState = {
    loginImage: {},
    errors: {},
    loading: false,
    loginImagesList: [],
    status: "",
};

export const loginImage = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.loginImage.isLoading = action.payload.arg
        })
        .addCase(loginImageAddRequest.fulfilled, (state, action) => {
            const {loginImage} = action.payload;
            state.loginImage = loginImage;
            state.loading = false;
        })
        .addCase(loginImageAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginImageAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(loginImageListRequest.fulfilled, (state, action) => {
            const {loginImage} = action.payload;
            state.loginImagesList = loginImage;
        })
        .addCase(loginImageDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(loginImageDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(loginImageUpdateRequest.fulfilled, (state, action) => {
            const {loginImage} = action.payload;
            state.loginImage = loginImage;
            state.loading = false;
        })
        .addCase(loginImageUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(loginImageUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});