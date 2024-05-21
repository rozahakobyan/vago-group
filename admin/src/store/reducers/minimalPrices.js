import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    minimalPricesAddRequest,
    minimalPricesDeleteRequest,
    minimalPricesListRequest,
    minimalPricesUpdateRequest
} from "../actions/minimalPrices";

const initialState = {
    price: {},
    errors: {},
    loading: false,
    pricesList: [],
    status: "",
};
 
export const minimalPrices = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.price.isLoading = action.payload.arg
        })
        .addCase(minimalPricesAddRequest.fulfilled, (state, action) => {
            const {price} = action.payload;
            state.price = price;
            state.loading = false;
        })
        .addCase(minimalPricesAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(minimalPricesAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(minimalPricesListRequest.fulfilled, (state, action) => {
            const {prices} = action.payload;
            state.pricesList = prices;
        })
        .addCase(minimalPricesDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(minimalPricesDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(minimalPricesUpdateRequest.fulfilled, (state, action) => {
            const {price} = action.payload;
            state.price = price;
            state.loading = false;
        })
        .addCase(minimalPricesUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(minimalPricesUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});