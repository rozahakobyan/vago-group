import {createReducer} from "@reduxjs/toolkit";
import {addHomeInfoRequest, homeInfoListRequest} from "../actions/homeInfo";

const initialState = {
    info: {},
    errors: {},
    loading: false,
    infoList: [],
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
});