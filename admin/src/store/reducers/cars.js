import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    carsAddRequest,
    carsDeleteRequest,
    carsListRequest,
    carsUpdateRequest
} from "../actions/cars";

const initialState = {
    car: {},
    errors: {},
    loading: false,
    carsList: [],
    status: "",
    pages: 1
};

export const cars = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.car.isLoading = action.payload.arg
        })
        .addCase(carsAddRequest.fulfilled, (state, action) => {
            const {car} = action.payload;
            state.car = car;
            state.loading = false;
        })
        .addCase(carsAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(carsAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(carsListRequest.fulfilled, (state, action) => {
            const {cars, pages} = action.payload;
            state.carsList = cars;
            state.pages = pages;
        })
        .addCase(carsDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(carsDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(carsUpdateRequest.fulfilled, (state, action) => {
            const {car} = action.payload;
            state.car = car;
            state.loading = false;
        })
        .addCase(carsUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(carsUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});