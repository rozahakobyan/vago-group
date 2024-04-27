import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    pricesAddRequest,
    pricesDeleteRequest,
    pricesListRequest,
    pricesUpdateRequest
} from "../actions/prices";

const initialState = {
    price: {},
    errors: {},
    loading: false,
    pricesList: [],
    status: "",
};
 
export const prices = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.price.isLoading = action.payload.arg
        })
        .addCase(pricesAddRequest.fulfilled, (state, action) => {
            const {price} = action.payload;
            state.price = price;
            state.loading = false;
        })
        .addCase(pricesAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(pricesAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(pricesListRequest.fulfilled, (state, action) => {
            const {prices} = action.payload;
            state.pricesList = prices;
        })
        .addCase(pricesDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(pricesDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(pricesUpdateRequest.fulfilled, (state, action) => {
            const {price} = action.payload;
            state.price = price;
            state.loading = false;
        })
        .addCase(pricesUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(pricesUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});