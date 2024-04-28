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
        .addCase(servicesListRequest.fulfilled, (state, action) => {
            const {services} = action.payload;
            state.servicesList = services;
        })
});