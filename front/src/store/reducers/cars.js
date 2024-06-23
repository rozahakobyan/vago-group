import {createReducer} from "@reduxjs/toolkit";
import {isLoading, carsListRequest} from "../actions/cars";

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
        .addCase(carsListRequest.fulfilled, (state, action) => {
            const {cars, pages} = action.payload;
            state.carsList = cars;
            state.pages = pages;
        })
});