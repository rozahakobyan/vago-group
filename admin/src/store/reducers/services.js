import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    servicesAddRequest,
    servicesDeleteRequest,
    servicesListRequest,
    servicesUpdateRequest
} from "../actions/services";

const initialState = {
    service: {},
    errors: {},
    loading: false,
    servicesList: [],
    status: "",
};
 
export const services = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.service.isLoading = action.payload.arg
        })
        .addCase(servicesAddRequest.fulfilled, (state, action) => {
            const {services} = action.payload;
            state.service = services;
            state.loading = false;
        })
        .addCase(servicesAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(servicesAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(servicesListRequest.fulfilled, (state, action) => {
            const {services} = action.payload;
            state.servicesList = services;
        })
        .addCase(servicesDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(servicesDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(servicesUpdateRequest.fulfilled, (state, action) => {
            const {service} = action.payload;
            state.service = service;
            state.loading = false;
        })
        .addCase(servicesUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(servicesUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});