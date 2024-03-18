import {createReducer} from "@reduxjs/toolkit";
import {
    addHomeInfoRequest,
    deleteHomeInfoRequest,
    homeInfoListRequest,
    updateHomeInfoRequest
} from "../actions/homeInfo";

const initialState = {
    info: {},
    errors: {},
    loading: false,
    infoList: [],
    status: "",
};

export const homeInfo = createReducer(initialState, (builder) => {
    builder
        .addCase(addHomeInfoRequest.fulfilled, (state, action) => {
            const {info} = action.payload;
            state.info = info;
            state.loading = false;
        })
        .addCase(addHomeInfoRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(addHomeInfoRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(homeInfoListRequest.fulfilled, (state, action) => {
            const {info} = action.payload;
            state.infoList = info;
        })
        .addCase(deleteHomeInfoRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(deleteHomeInfoRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(updateHomeInfoRequest.fulfilled, (state, action) => {
            const {info} = action.payload;
            state.info = info;
            state.loading = false;
        })
        .addCase(updateHomeInfoRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(updateHomeInfoRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});