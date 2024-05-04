import {createReducer} from "@reduxjs/toolkit";
import {
    bannerAddRequest,
    bannerDeleteRequest,
    bannerListRequest,
    bannerUpdateRequest, isLoading
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
        .addCase(bannerAddRequest.fulfilled, (state, action) => {
            const {banner} = action.payload;
            state.banner = banner;
            state.loading = false;
        })
        .addCase(bannerAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(bannerAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(bannerListRequest.fulfilled, (state, action) => {
            const {banners} = action.payload;
            state.bannersList = banners;
        })
        .addCase(bannerDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(bannerDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(bannerUpdateRequest.fulfilled, (state, action) => {
            const {info} = action.payload;
            state.info = info;
            state.loading = false;
        })
        .addCase(bannerUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(bannerUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});