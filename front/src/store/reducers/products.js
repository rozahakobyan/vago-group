import {createReducer} from "@reduxjs/toolkit";
import {isLoading,productsListRequest} from "../actions/products";

const initialState = {
    product: {},
    errors: {},
    loading: false,
    productsList: [],
    status: "",
    pages: 1,
};

export const products = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.product.isLoading = action.payload.arg
        })
        .addCase(productsListRequest.fulfilled, (state, action) => {
            const {products, pages} = action.payload;
            state.productsList = products;
            state.pages = pages;
        })
});