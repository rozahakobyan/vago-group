import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    packagesAddRequest,
    packagesDeleteRequest,
    packagesListRequest,
    packagesUpdateRequest
} from "../actions/packages";

const initialState = {
    packages: {},
    errors: {},
    loading: false,
    packagesList: [],
    status: "",
};
 
export const packages = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.packages.isLoading = action.payload.arg
        })
        .addCase(packagesAddRequest.fulfilled, (state, action) => {
            const {packages} = action.payload;
            state.package = packages;
            state.loading = false;
        })
        .addCase(packagesAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(packagesAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(packagesListRequest.fulfilled, (state, action) => {
            const {packages} = action.payload;
            state.packagesList = packages;
        })
        .addCase(packagesDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(packagesDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(packagesUpdateRequest.fulfilled, (state, action) => {
            const {packages} = action.payload;
            state.package = packages;
            state.loading = false;
        })
        .addCase(packagesUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(packagesUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});