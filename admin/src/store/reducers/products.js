import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    productsAddRequest,
    productsDeleteRequest,
    productsListRequest,
    productsUpdateRequest
} from "../actions/products";

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
        .addCase(productsAddRequest.fulfilled, (state, action) => {
            const {product} = action.payload;
            state.product = product;
            state.loading = false;
        })
        .addCase(productsAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(productsAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(productsListRequest.fulfilled, (state, action) => {
            const {products, pages} = action.payload;
            state.productsList = products;
            state.pages = pages;
        })
        .addCase(productsDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(productsDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(productsUpdateRequest.fulfilled, (state, action) => {
            const {product} = action.payload;
            state.product = product;
            state.loading = false;
        })
        .addCase(productsUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(productsUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});