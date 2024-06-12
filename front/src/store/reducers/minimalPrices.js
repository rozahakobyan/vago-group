import {createReducer} from "@reduxjs/toolkit";
import {isLoading, minimalPricesListRequest} from "../actions/minimalPrices";

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
        .addCase(minimalPricesListRequest.fulfilled, (state, action) => {
            const {prices} = action.payload;
            state.pricesList = prices;
        })
});