import {createReducer} from "@reduxjs/toolkit";
import {
    ourAdvantagesTaxiAddRequest,
    ourAdvantagesTaxiDeleteRequest, ourAdvantagesTaxiListRequest,isLoading,
    ourAdvantagesTaxiUpdateRequest
} from "../actions/ourAdvantagesTaxi";

const initialState = {
    ourAdvantageTaxi: {},
    errors: {},
    loading: false,
    ourAdvantagesTaxiList: [],
    status: "",
    pages: 1
};

export const ourAdvantagesTaxi = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.ourAdvantageTaxi.isLoading = action.payload.arg
        })
        .addCase(ourAdvantagesTaxiAddRequest.fulfilled, (state, action) => {
            const {ourAdvantageTaxi} = action.payload;
            state.ourAdvantageTaxi = ourAdvantageTaxi;
            state.loading = false;
        })
        .addCase(ourAdvantagesTaxiAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(ourAdvantagesTaxiAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(ourAdvantagesTaxiListRequest.fulfilled, (state, action) => {
            const {ourAdvantagesTaxi, pages} = action.payload;
            state.ourAdvantagesTaxiList = ourAdvantagesTaxi;
            state.pages = pages;
        })
        .addCase(ourAdvantagesTaxiDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(ourAdvantagesTaxiDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(ourAdvantagesTaxiUpdateRequest.fulfilled, (state, action) => {
            const {ourAdvantageTaxi} = action.payload;
            state.ourAdvantageTaxi = ourAdvantageTaxi;
            state.loading = false;
        })
        .addCase(ourAdvantagesTaxiUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(ourAdvantagesTaxiUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});