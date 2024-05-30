import {createReducer} from "@reduxjs/toolkit";
import {
    bannerListRequest, isLoading
} from "../actions/banner";

const initialState = {
    banner: {},
    errors: {},
    loading: false,
    bannersList: [],
    status: "",
};

export const banner = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.banner.isLoading = action.payload.arg
        })
        .addCase(bannerListRequest.fulfilled, (state, action) => {
            const {banners} = action.payload;
            state.bannersList = banners;
        })
});