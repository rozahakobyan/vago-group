import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    pricesListRequest,
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
        .addCase(pricesListRequest.fulfilled, (state, action) => {
            const {prices} = action.payload;
            state.pricesList = prices;
        })
});