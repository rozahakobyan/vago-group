import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    packagesListRequest,
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
        .addCase(packagesListRequest.fulfilled, (state, action) => {
            const {packages} = action.payload;
            state.packagesList = packages;
        })
});