import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    partnersAddRequest,
    partnersDeleteRequest,
    partnersListRequest,
    partnersUpdateRequest
} from "../actions/partners";

const initialState = {
    partner: {},
    errors: {},
    loading: false,
    partnersList: [],
    status: "",
};
 
export const partners = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.partner.isLoading = action.payload.arg
        })
        .addCase(partnersAddRequest.fulfilled, (state, action) => {
            const {partners} = action.payload;
            state.partner = partners;
            state.loading = false;
        })
        .addCase(partnersAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(partnersAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(partnersListRequest.fulfilled, (state, action) => {
            const {partners} = action.payload;
            state.partnersList = partners;
        })
        .addCase(partnersDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(partnersDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(partnersUpdateRequest.fulfilled, (state, action) => {
            const {partner} = action.payload;
            state.partner = partner;
            state.loading = false;
        })
        .addCase(partnersUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(partnersUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});