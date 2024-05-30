import {createReducer} from "@reduxjs/toolkit";
import {isLoading, partnersListRequest,} from "../actions/partners";

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
        .addCase(partnersListRequest.fulfilled, (state, action) => {
            const {partners} = action.payload;
            state.partnersList = partners;
        })
});